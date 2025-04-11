
import React, { useEffect, useState } from 'react';
import stepsData from './steps.json';

function App() {
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log("✅ Загружаем steps.json:", stepsData);
      setSteps(stepsData.steps);
    } catch (err) {
      console.error("❌ Ошибка при загрузке steps.json:", err);
      setError("Не удалось загрузить данные.");
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>GOZ Checker</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {steps.length > 0 ? (
        <ul>
          {steps.map((step, index) => (
            <li key={index}><strong>Шаг {index + 1}:</strong> {step.title}</li>
          ))}
        </ul>
      ) : !error ? (
        <p>Загрузка шагов...</p>
      ) : null}
    </div>
  );
}

export default App;
