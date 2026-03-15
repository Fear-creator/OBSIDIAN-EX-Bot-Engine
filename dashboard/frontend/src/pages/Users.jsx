import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import client from '../api/client';

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    client.get('/users').then((response) => setUsers(response.data)).catch(() => undefined);
  };

  const banUser = async (id) => {
    await client.patch(`/users/${id}/ban`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    { key: 'username', label: 'User' },
    { key: 'email', label: 'Email' },
    { key: 'licenseKey', label: 'License Key' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button className="btn-danger" onClick={() => banUser(row.id)} disabled={row.banned}>
          {row.banned ? 'Banned' : 'Ban User'}
        </button>
      ),
    },
  ];

  return (
    <div>
      <Header title="Active Users" subtitle="Manage registered users and moderation actions." />
      <Table columns={columns} rows={users} emptyText="No users found." />
    </div>
  );
}
