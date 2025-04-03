import React, { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const next = () => setStep(step + 1);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Шаг 1: Проверка сроков исполнения контракта</h1>
      <form>
        <p>1. Указаны ли сроки в контракте и приложениях?</p>
        <label><input type="radio" name="q1" /> Да</label>
        <label><input type="radio" name="q1" /> Нет</label>
        <p><i>Подсказка: Сроки ищите в контракте (раздел 3)</i></p>

        <p>2. Имеется ли акт приёмки с датой поставки?</p>
        <label><input type="radio" name="q2" /> Да</label>
        <label><input type="radio" name="q2" /> Нет</label>
        <p><i>Подсказка: Дата — в акте приёмки</i></p>

        <p>3. Соответствуют ли даты поставки условиям контракта?</p>
        <label><input type="radio" name="q3" /> Да</label>
        <label><input type="radio" name="q3" /> Нет</label>
        <label><input type="radio" name="q3" /> Частично</label>
        <p><i>Подсказка: Сравните акт и условия</i></p>

        <p>4. Есть ли уведомления о переносе сроков?</p>
        <input type="file" />
        <p><i>Подсказка: Письма/телеграммы об изменении сроков</i></p>

        <button type="button" onClick={next}>Далее</button>
      </form>
    </div>
  );
}

export default App;