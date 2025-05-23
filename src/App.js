
import React, { useState } from 'react';
import steps from './steps.json';
import logo from './assets/goz-logo.png';

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visibleHint, setVisibleHint] = useState(null);

  const step = steps[stepIndex];

  const handleChange = (qIndex, value) => {
    const key = `step-${stepIndex}`;
    const current = answers[key] || {};
    current[qIndex] = value;
    setAnswers({ ...answers, [key]: current });
  };

  const isVisible = (q, qIndex) => {
    if (!q.visibleIf) return true;
    const [targetKey, expected] = Object.entries(q.visibleIf)[0];
    const targetIndex = parseInt(targetKey.replace("q", ""));
    return answers[`step-${stepIndex}`]?.[targetIndex] === expected;
  };

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setVisibleHint(null);
    }
  };

  const back = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setVisibleHint(null);
    }
  };

  const getFinalReport = () => {
    return steps.map((step, sIndex) => {
      const key = `step-${sIndex}`;
      return {
        title: step.title,
        answers: step.questions.map((q, qIndex) => ({
          question: q.text,
          answer: answers[key]?.[qIndex] || "-"
        }))
      };
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={logo} alt="logo" width="50" />
        <h2 style={{ color: '#003300' }}>GOZ Checker</h2>
      </div>
      <h3>{step.title}</h3>
      <form>
        {step.questions.map((q, qIndex) =>
          isVisible(q, qIndex) ? (
            <div key={qIndex} style={{
              marginBottom: 20,
              background: '#ffffff',
              padding: 15,
              borderRadius: 6,
              border: '1px solid #ccc'
            }}>
              <p style={{ marginBottom: 6 }}>
                <b>{qIndex + 1}. {q.text}</b>
                {q.hint && (
                  <button
                    type="button"
                    onClick={() => setVisibleHint(visibleHint === qIndex ? null : qIndex)}
                    style={{
                      marginLeft: 10,
                      background: '#004d26',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '2px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    ℹ️ Подсказка
                  </button>
                )}
              </p>
              {visibleHint === qIndex && (
                <div style={{
                  background: '#f0f8f5',
                  border: '1px solid #004d26',
                  padding: 10,
                  borderRadius: 4,
                  marginBottom: 10,
                  color: '#002211'
                }}>
                  {q.hint}
                </div>
              )}
              {q.options.map((opt, idx) => (
                <label key={idx} style={{ display: 'block', marginLeft: 12 }}>
                  <input
                    type="radio"
                    name={`q-${stepIndex}-${qIndex}`}
                    value={opt}
                    checked={answers[`step-${stepIndex}`]?.[qIndex] === opt}
                    onChange={(e) => handleChange(qIndex, e.target.value)}
                  /> {opt}
                </label>
              ))}
              {q.file && (
                <div style={{ marginTop: 8, marginLeft: 12 }}>
                  <input type="file" />
                </div>
              )}
            </div>
          ) : null
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          {stepIndex > 0 && (
            <button type="button" onClick={back} style={{
              background: '#888',
              color: '#fff',
              padding: '10px 18px',
              border: 'none',
              borderRadius: 6,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Назад</button>
          )}
          <button type="button" onClick={next} style={{
            background: '#004d26',
            color: '#fff',
            padding: '10px 18px',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}>Далее</button>
        </div>
      </form>

      {stepIndex === steps.length - 1 && (
        <div style={{ marginTop: 40, padding: 20, background: '#e7f5e1', borderRadius: 8 }}>
          <h3>📄 Финальный отчёт:</h3>
          {getFinalReport().map((s, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h4>{s.title}</h4>
              <ul>
                {s.answers.map((a, j) => (
                  <li key={j}><b>{a.question}</b><br />Ответ: {a.answer}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
