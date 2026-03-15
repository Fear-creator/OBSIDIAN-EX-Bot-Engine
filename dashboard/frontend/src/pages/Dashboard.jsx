import { useEffect, useState } from 'react';
import Header from '../components/Header';
import client from '../api/client';

const metricCards = [
  { key: 'activeUsers', label: 'Active Users' },
  { key: 'activeLicenses', label: 'Active Licenses' },
  { key: 'runningSessions', label: 'Running Sessions' },
  { key: 'todayCommands', label: 'Commands Today' },
];

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    activeLicenses: 0,
    runningSessions: 0,
    todayCommands: 0,
    botStatus: 'offline',
  });

  useEffect(() => {
    client.get('/stats').then((response) => setMetrics(response.data)).catch(() => undefined);
  }, []);

  return (
    <div>
      <Header title="Bot Status" subtitle="Real-time health and usage overview." />
      <div className="mb-6 card">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Engine status</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
              metrics.botStatus === 'online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}
          >
            {metrics.botStatus}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <div key={card.key} className="card">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{metrics[card.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
