
import React, { useState } from 'react';
import steps from './steps.json';

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
      <h2 style={{ color: '#003300' }}>{step.title}</h2>
      <form>
        {step.questions.map((q, i) => {
          const show = !q.visibleIf || Object.entries(q.visibleIf).every(([k, v]) => {
            const depIndex = parseInt(k.replace('q', ''));
            return answers[`step-${stepIndex}`]?.[depIndex] === v;
          });
          if (!show) return null;

          return (
            <div key={i} style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 'bold' }}>
                {i + 1}. {q.text}
                {q.hint && (
                  <button type="button" onClick={() => setVisibleHint(visibleHint === i ? null : i)}
                    style={{ marginLeft: 10, background: '#004d26', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 6px' }}>
                    ℹ️
                  </button>
                )}
              </p>
              {visibleHint === i && (
                <div style={{ background: '#e9f5ed', padding: 10, border: '1px solid #004d26', borderRadius: 4 }}>
                  {q.hint}
                </div>
              )}
              {q.options.map((opt, idx) => (
                <label key={idx} style={{ display: 'block', marginLeft: 16 }}>
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    checked={answers[`step-${stepIndex}`]?.[i] === opt}
                    onChange={() => handleChange(i, opt)}
                  /> {opt}
                </label>
              ))}
              {q.file && (
                <div style={{ marginLeft: 16, marginTop: 6 }}>
                  <input type="file" />
                </div>
              )}
            </div>
          );
        })}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button type="button" onClick={() => setStepIndex(stepIndex - 1)} disabled={stepIndex === 0}>Назад</button>
          <button type="button" onClick={() => setStepIndex(stepIndex + 1)} disabled={stepIndex === steps.length - 1}>Далее</button>
        </div>
      </form>

      {stepIndex === steps.length - 1 && (
        <div style={{ marginTop: 40, background: '#e7f5e1', padding: 20, borderRadius: 6 }}>
          <h3>📄 Финальный отчёт:</h3>
          {getFinalReport().map((s, i) => (
            <div key={i}>
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
