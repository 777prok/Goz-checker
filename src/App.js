import React, { useState } from 'react';

const steps = [
  {
    title: "Шаг 1 из 2: Проверка сроков",
    questions: [
      {
        text: "Указаны ли сроки в контракте?",
        options: ["Да", "Нет"],
        hint: "Контракт, раздел 3 — проверьте даты поставки"
      }
    ]
  },
  {
    title: "Шаг 2 из 2: Качество продукции",
    questions: [
      {
        text: "Продукция принята без замечаний?",
        options: ["Да", "Нет"],
        hint: "Смотрите подписи и формулировки в акте"
      }
    ]
  }
];

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

  return (
    <div style={{ padding: 20, fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h2>{step.title}</h2>
      {step.questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p><b>{i + 1}. {q.text}</b>
            {q.hint && (
              <button onClick={() => setVisibleHint(i === visibleHint ? null : i)}
                style={{ marginLeft: 8, background: '#004d26', color: 'white', border: 'none', borderRadius: 4, padding: '2px 8px' }}>
                ℹ️
              </button>
            )}
          </p>
          {visibleHint === i && <div style={{ background: '#e9f5ed', padding: 10 }}>{q.hint}</div>}
          {q.options.map(opt => (
            <label key={opt} style={{ display: 'block', marginLeft: 20 }}>
              <input type="radio" name={`q-${i}`} value={opt} checked={answers[`step-${stepIndex}`]?.[i] === opt}
                onChange={() => handleChange(i, opt)} /> {opt}
            </label>
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button onClick={() => setStepIndex(stepIndex - 1)} disabled={stepIndex === 0}>Назад</button>
        <button onClick={() => setStepIndex(stepIndex + 1)} disabled={stepIndex === steps.length - 1}>Далее</button>
      </div>
    </div>
  );
}
