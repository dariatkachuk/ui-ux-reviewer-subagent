import React, { useState } from 'react';
import ButtonPage from './pages/ButtonPage';
import InputTextPage from './pages/InputTextPage';
import ModalPage from './pages/ModalPage';

type ActiveDemo = 'button' | 'inputtext' | 'modal' | null;

export default function App() {
  const [activeDemo, setActiveDemo] = useState<ActiveDemo>(null);

  const navBtnStyle = (demo: ActiveDemo): React.CSSProperties => ({
    color: activeDemo === demo ? '#90cdf4' : '#fff',
    fontSize: 13,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: '0 8px',
    fontWeight: activeDemo === demo ? 700 : 400,
  });

  return (
    <>
      {/* Fixed nav in top-right corner */}
      <div style={{
        position: 'fixed', top: 0, right: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '6px 12px', background: '#1e293b', borderBottomLeftRadius: 8,
      }}>
        {activeDemo !== null && (
          <button onClick={() => setActiveDemo(null)} style={navBtnStyle(null)}>
            ← App
          </button>
        )}
        {activeDemo !== null && (
          <span style={{ color: '#475569', fontSize: 13 }}>|</span>
        )}
        <button onClick={() => setActiveDemo('button')} style={navBtnStyle('button')}>
          Button
        </button>
        <span style={{ color: '#475569', fontSize: 13 }}>|</span>
        <button onClick={() => setActiveDemo('inputtext')} style={navBtnStyle('inputtext')}>
          InputText
        </button>
        <span style={{ color: '#475569', fontSize: 13 }}>|</span>
        <button onClick={() => setActiveDemo('modal')} style={navBtnStyle('modal')}>
          Modal
        </button>
      </div>

      {activeDemo === null && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#718096' }}>
          <p>Your app content goes here.</p>
        </div>
      )}
      {activeDemo === 'button'    && <ButtonPage />}
      {activeDemo === 'inputtext' && <InputTextPage />}
      {activeDemo === 'modal'     && <ModalPage />}
    </>
  );
}
