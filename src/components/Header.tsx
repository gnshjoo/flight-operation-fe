import React from 'react';

interface Props {
  wsConnected: boolean;
}

export default function Header({ wsConnected }: Props) {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">
          KOREAN AIR Flight Operations
        </h1>
        <div className="header-sub">Operations Control Dashboard</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: wsConnected ? '#34d399' : '#f87171',
          display: 'inline-block'
        }} />
        <span>{wsConnected ? 'Live' : 'Disconnected'}</span>
        <span style={{ background: '#0072CE', padding: '2px 8px', borderRadius: 10, fontSize: 11 }}>DEMO</span>
      </div>
    </header>
  );
}
