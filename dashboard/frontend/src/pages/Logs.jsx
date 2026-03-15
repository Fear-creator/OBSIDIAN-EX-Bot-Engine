import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import client from '../api/client';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    client.get('/logs').then((response) => setLogs(response.data)).catch(() => undefined);
  }, []);

  const columns = [
    { key: 'command', label: 'Command' },
    { key: 'userId', label: 'User ID' },
    { key: 'result', label: 'Result' },
    { key: 'createdAt', label: 'Timestamp' },
  ];

  return (
    <div>
      <Header title="Command Logs" subtitle="Audit recent bot activity and execution history." />
      <Table columns={columns} rows={logs} emptyText="No logs yet." />
    </div>
  );
}
