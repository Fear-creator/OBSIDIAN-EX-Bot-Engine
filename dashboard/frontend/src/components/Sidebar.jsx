import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Bot Status', path: '/' },
  { name: 'Active Users', path: '/users' },
  { name: 'License Manager', path: '/licenses' },
  { name: 'Session Manager', path: '/sessions' },
  { name: 'Command Logs', path: '/logs' },
];

export default function Sidebar() {
  return (
    <aside className="w-full max-w-60 border-r border-slate-800 bg-obsidian-900 p-5">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Obsidian EX</h1>
        <p className="text-xs text-slate-400">Admin Dashboard</p>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
