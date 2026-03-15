import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import client from '../api/client';

const emptyForm = {
  key: '',
  expires: '',
};

export default function Licenses() {
  const [licenses, setLicenses] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const loadLicenses = () => {
    client.get('/licenses').then((response) => setLicenses(response.data)).catch(() => undefined);
  };

  useEffect(() => {
    loadLicenses();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await client.post('/licenses', form);
    setForm(emptyForm);
    loadLicenses();
  };

  const disableLicense = async (id) => {
    await client.patch(`/licenses/${id}/disable`);
    loadLicenses();
  };

  const columns = [
    { key: 'key', label: 'Key' },
    { key: 'expires', label: 'Expires' },
    { key: 'active', label: 'Active', render: (row) => (row.active ? 'Yes' : 'No') },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <button className="btn-danger" onClick={() => disableLicense(row.id)} disabled={!row.active}>
          Disable
        </button>
      ),
    },
  ];

  return (
    <div>
      <Header title="License Manager" subtitle="Create, expire, and disable license keys." />
      <form className="card mb-6 grid gap-3 md:grid-cols-3" onSubmit={submit}>
        <input
          className="input"
          placeholder="EX-92X1-AZ"
          value={form.key}
          onChange={(event) => setForm((current) => ({ ...current, key: event.target.value }))}
          required
        />
        <input
          className="input"
          type="date"
          value={form.expires}
          onChange={(event) => setForm((current) => ({ ...current, expires: event.target.value }))}
          required
        />
        <button className="btn-primary" type="submit">
          Create License
        </button>
      </form>
      <Table columns={columns} rows={licenses} emptyText="No licenses available." />
    </div>
  );
}
