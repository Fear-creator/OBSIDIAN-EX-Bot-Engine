import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import client from '../api/client';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  const loadSessions = () => {
    client.get('/sessions').then((response) => setSessions(response.data)).catch(() => undefined);
  };

  const restart = async (id) => {
    await client.patch(`/sessions/${id}/restart`);
    loadSessions();
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const columns = [
    { key: 'userId', label: 'User ID' },
    { key: 'region', label: 'Region' },
    { key: 'startedAt', label: 'Started At' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button className="btn-primary" onClick={() => restart(row.id)}>
          Restart Session
        </button>
      ),
    },
  ];

  return (
    <div>
      <Header title="Session Manager" subtitle="Inspect and control connected user sessions." />
      <Table columns={columns} rows={sessions} emptyText="No active sessions." />
    </div>
  );
}
