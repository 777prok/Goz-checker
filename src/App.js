import React, { useState, useEffect } from 'react';
import './index.css';

const steps = [
  {
    title: 'Шаг 1 из 4: Проверка сроков исполнения контракта',
    questions: [
      {
        text: '1. Указаны ли сроки в контракте и приложениях?',
        options: ['Да', 'Нет'],
        hint: 'Сроки ищите в контракте (раздел 3)'
      },
      {
        text: '2. Имеется ли акт приёмки с датой поставки?',
        options: ['Да', 'Нет'],
        hint: 'Дата — в акте приёмки'
      },
      {
        text: '3. Соответствуют ли даты поставки условиям контракта?',
        options: ['Да', 'Нет', 'Частично'],
        hint: 'Сравните акт и условия'
      },
      {
        text: '4. Есть ли уведомления о переносе сроков?',
        options: ['Да', 'Нет'],
        hint: 'Письма/телеграммы об изменении сроков'
      }
    ]
  },
  {
    title: 'Шаг 2 из 4: Проверка качества поставленной продукции',
    questions: [
      {
        text: '1. Имеется ли акт приёмки с отметкой об отсутствии дефектов?',
        options: ['Да', 'Нет'],
        hint: 'Проверьте акт КС-2, КС-3 или по ГОСТ Р 15.201'
      },
      {
        text: '2. Указаны ли конкретные характеристики продукции в акте приёмки?',
        options: ['Да', 'Нет'],
        hint: 'Сравните с техническим заданием'
      },
      {
        text: '3. Есть ли результаты лабораторных/входных испытаний?',
        options: ['Да', 'Нет', 'Не требуется'],
        hint: 'Если предусмотрено ТЗ – прилагаются испытания'
      },
      {
        text: '4. Продукция принята без замечаний по качеству?',
        options: ['Да', 'Нет', 'Частично'],
        hint: 'Ищите подписи и отметки в акте'
      }
    ]
  }
];

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("answers");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const step = steps[stepIndex];

  const handleAnswer = (stepIdx, qIdx, value) => {
    const key = `step${stepIdx}-q${qIdx}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      alert('Проверка завершена. Отчёт сформирован ниже.');
    }
  };

  const renderReport = () => (
    <div className="report">
      <h2>🧾 Отчёт по проверке</h2>
      {steps.map((s, si) => (
        <div key={si}>
          <h3>{s.title}</h3>
          <ul>
            {s.questions.map((q, qi) => {
              const key = `step${si}-q${qi}`;
              return (
                <li key={qi}>
                  <b>{q.text}</b><br />
                  Ответ: {answers[key] || "—"}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <button onClick={() => {
        navigator.clipboard.writeText(
          Object.entries(answers).map(([k,v]) => `${k}: ${v}`).join('\n')
        );
        alert("Скопировано в буфер обмена");
      }}>Скопировать отчёт</button>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        <h2>GOZ Checker</h2>
      </div>
      <h1>{step.title}</h1>
      <form>
        {step.questions.map((q, i) => {
          const name = `step${stepIndex}-q${i}`;
          return (
            <div key={i} className="question">
              <p>{q.text}</p>
              <div className="options">
                {q.options.map((opt, j) => (
                  <label key={j}>
                    <input
                      type="radio"
                      name={name}
                      checked={answers[name] === opt}
                      onChange={() => handleAnswer(stepIndex, i, opt)}
                    /> <span>{opt}</span>
                  </label>
                ))}
              </div>
              <div className="hint">{q.hint}</div>
            </div>
          );
        })}
        <button type="button" className="btn-next" onClick={next}>Далее</button>
      </form>
      {stepIndex === steps.length - 1 && renderReport()}
      <footer>Разработано для надзора по ГОЗ • 2025</footer>
    </div>
  );
}

export default App;
