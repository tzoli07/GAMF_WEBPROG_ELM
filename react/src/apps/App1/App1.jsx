import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App1() {
  const [number, setNumber] = useState(1);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setNumber(value);
    } else {
      setNumber(1); // Ha 0 vagy negatív számot próbálnak beírni, akkor visszaállítjuk 1-re.
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="card-title text-center mb-4">🔢 <br /> Szorzótábla generátor</h2>

        <div className="form-group">
          <label htmlFor="numberInput" className="form-label">Válassz egy számot:</label>
          <input
            id="numberInput"
            type="number"
            className="form-control"
            value={number}
            onChange={handleInputChange}
            min="1" // Csak 1 és annál nagyobb számokat enged
          />
        </div>

        <ul className="list-group mt-4">
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} className="list-group-item">
              {number} × {i + 1} = {number * (i + 1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App1;
