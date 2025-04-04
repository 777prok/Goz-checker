
import React, { useState } from 'react';
import logo from './assets/goz-logo.png';

const steps = [
  {
    title: 'Шаг 1 из 4: Проверка сроков исполнения контракта',
    questions: [
      {
        text: 'Указаны ли сроки в контракте и приложениях?',
        options: ['Да', 'Нет'],
        hint: 'Сроки ищите в контракте (раздел 3)',
      },
      {
        text: 'Имеется ли акт приёмки с датой поставки?',
        options: ['Да', 'Нет'],
        hint: 'Дата — в акте приёмки',
      },
      {
        text: 'Соответствуют ли даты поставки условиям контракта?',
        options: ['Да', 'Нет', 'Частично'],
        hint: 'Сравните акт и условия контракта',
      },
      {
        text: 'Есть ли уведомления о переносе сроков?',
        options: ['Да', 'Нет'],
        hint: 'Письма/телеграммы об изменении сроков',
        file: true,
      },
    ],
  },
  {
    title: 'Шаг 2 из 4: Проверка качества поставленной продукции',
    questions: [
      {
        text: 'Имеется ли акт приёмки с отметкой об отсутствии дефектов?',
        options: ['Да', 'Нет'],
        hint: 'Проверьте акт КС-2, КС-3 или по ГОСТ Р 15.201',
      },
      {
        text: 'Указаны ли конкретные характеристики продукции в акте приёмки?',
        options: ['Да', 'Нет'],
        hint: 'Сравните с техническим заданием',
      },
      {
        text: 'Есть ли результаты лабораторных/входных испытаний?',
        options: ['Да', 'Нет', 'Не требуется'],
        hint: 'Если предусмотрено ТЗ – прилагаются испытания',
      },
      {
        text: 'Продукция принята без замечаний по качеству?',
        options: ['Да', 'Нет', 'Частично'],
        hint: 'Ищите подписи и отметки в акте',
      },
      {
        text: 'Присутствуют ли технические условия (ТУ), КД, ТЗ, описывающие требования к качеству?',
        options: ['Да', 'Нет'],
        hint: 'Технические условия, чертежи, спецификации — обязательны для оценки соответствия продукции ТЗ',
      },
      {
        text: 'Зафиксировано ли соответствие продукции условиям контракта (ГОСТ, ТУ и т.д.)?',
        options: ['Да', 'Нет'],
        hint: 'Сравните фактические показатели из акта/испытаний с требованиями КД',
      },
    ],
  }
];

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const step = steps[stepIndex];

  const handleChange = (qIndex, value) => {
    const stepKey = `step-${stepIndex}`;
    const stepAnswers = answers[stepKey] || {};
    stepAnswers[qIndex] = value;
    setAnswers({ ...answers, [stepKey]: stepAnswers });
  };

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      alert('Проверка завершена!');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <img src={logo} alt="logo" width="80" />
      <h2>{step.title}</h2>
      <form>
        {step.questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <p><b>{i + 1}. {q.text}</b> {q.hint && <span style={{ color: 'gray' }} title={q.hint}> ℹ️</span>}</p>
            {q.options.map(opt => (
              <label key={opt} style={{ display: 'block', marginLeft: 20 }}>
                <input
                  type="radio"
                  name={`q-${stepIndex}-${i}`}
                  value={opt}
                  checked={answers[`step-${stepIndex}`]?.[i] === opt}
                  onChange={(e) => handleChange(i, e.target.value)}
                />{' '}
                {opt}
              </label>
            ))}
            {q.file && (
              <div style={{ marginLeft: 20, marginTop: 4 }}>
                <input type="file" />
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={next}>Далее</button>
      </form>
    </div>
  );
}
