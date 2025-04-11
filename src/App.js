
import React, { useState } from 'react';
import stepsData from './steps.json';
import logo from '../public/icons/icon-192.png';

export default function App() {
  const steps = stepsData.steps;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visibleHint, setVisibleHint] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

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
          question: q.question,
          answer: answers[key]?.[qIndex] || "-"
        }))
      };
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial', maxWidth: 900, margin: 'auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <img src={logo} alt="logo" width="48" height="48" />
        <h2 style={{ margin: 0, color: '#003300' }}>GOZ Checker</h2>
      </header>

      <h3>{step.title}</h3>

      {stepIndex === 3 && (
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setShowHelp(!showHelp)} style={{
            padding: '8px 12px',
            backgroundColor: '#004d26',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}>
            📄 Справка по затратному методу
          </button>
          {showHelp && (
            <div style={{ backgroundColor: '#f4f4f4', border: '1px solid #ccc', padding: 15, marginTop: 10 }}>
              <b>Что должно быть в калькуляции:</b>
              <ul>
                <li>🔹 Материалы, з/п, ОХР, прибыль</li>
                <li>🔹 Подтверждающие документы: накладные, табели, акты</li>
                <li>🔹 Где смотреть в 1С: счета 20, 25, 26</li>
                <li>🔹 Основание: ПП №1465, п. 15–19</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <form>
        {step.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <p>
              <b>{i + 1}. {q.question}</b>
              {q.hint && (
                <button type="button" onClick={() => setVisibleHint(visibleHint === i ? null : i)}
                  style={{ marginLeft: 10, background: '#004d26', color: 'white', border: 'none', borderRadius: 4, padding: '2px 8px' }}>
                  ℹ️
                </button>
              )}
            </p>
            {visibleHint === i && (
              <div style={{
                backgroundColor: '#e9f5ed',
                padding: 10,
                borderRadius: 4,
                fontSize: '0.95rem',
                marginBottom: 10,
                border: '1px solid #004d26'
              }}>
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
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <button type="button" onClick={() => setStepIndex(stepIndex - 1)} disabled={stepIndex === 0}>Назад</button>
          <button type="button" onClick={() => setStepIndex(stepIndex + 1)} disabled={stepIndex === steps.length - 1}>Далее</button>
        </div>
      </form>

      {stepIndex === steps.length - 1 && (
        <div style={{ marginTop: 40, background: '#f0fff4', padding: 20, borderRadius: 8 }}>
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
