import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Licenses from './pages/Licenses';
import Sessions from './pages/Sessions';
import Logs from './pages/Logs';

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 lg:flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
