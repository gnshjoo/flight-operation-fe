import React from 'react';
import Header from './components/Header';
import ConnectionBanner from './components/ConnectionBanner';
import StatsBar from './components/StatsBar';
import FlightBoard from './components/FlightBoard';
import AlertPanel from './components/AlertPanel';
import StatsCharts from './components/StatsCharts';
import FlightMap from './components/FlightMap';
import { useAlerts } from './hooks/useAlerts';

function App() {
  const { alerts, connected, acknowledge } = useAlerts();

  return (
    <div className="app-root">
      <Header wsConnected={connected} />
      <ConnectionBanner connected={connected} />
      <StatsBar />
      <div className="main-row">
        <FlightBoard />
        <AlertPanel alerts={alerts} onAcknowledge={acknowledge} />
      </div>
      <FlightMap />
      <StatsCharts />
    </div>
  );
}

export default App;
