import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App2() {
  const [dice, setDice] = useState(1);

  const rollDice = () => {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setDice(rolled);
  };

  const renderDice = (number) => {
    // Kocka stílus
    const diceStyle = {
      width: '100px',
      height: '100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: '5px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      border: '2px solid #000',
      borderRadius: '10px',
      margin: '0 auto', // Kocka középre igazítása
    };

    // A dobókocka pöttyeinek elhelyezése
    const diceDots = [
      [],
      [4], // 1 pont
      [1, 7], // 2 pont
      [1, 4, 7], // 3 pont
      [0, 2, 6, 8], // 4 pont
      [0, 2, 6, 8, 4], // 5 pont
      [0, 1, 2, 6, 7, 8], // 6 pont
    ];

    return (
      <div style={diceStyle}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`dot ${diceDots[number].includes(index) ? 'active' : ''}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#000',
              borderRadius: '50%',
              justifySelf: 'center',
              alignSelf: 'center',
              display: diceDots[number].includes(index) ? 'block' : 'none',
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow p-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="card-title mb-4">🎲 Dobókocka játék</h2>

        <button 
          className="btn btn-primary btn-lg mb-3"
          onClick={rollDice}
        >
          Dobás
        </button>

        <p className="fs-4">Dobott szám: <strong>{dice}</strong></p>

        {/* Csak a dobókockát helyezzük középre */}
        <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
          {renderDice(dice)}
        </div>
      </div>
    </div>
  );
}

export default App2;
