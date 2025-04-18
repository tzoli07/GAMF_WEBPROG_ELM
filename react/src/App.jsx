import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App1 from './apps/App1/App1.jsx';
import App2 from './apps/App2/App2.jsx';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Szorzótábla</Link>
          <Link to="/dice">Dobókocka</Link>
        </nav>

        <Routes>
          <Route path="/" element={<App1 />} />
          <Route path="/dice" element={<App2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
