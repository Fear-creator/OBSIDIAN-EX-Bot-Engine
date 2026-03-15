export default function Table({ columns, rows, emptyText = 'No data available.' }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-obsidian-800">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-obsidian-900">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-slate-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-slate-800/40">
                {columns.map((column) => (
                  <td key={`${column.key}-${row.id || index}`} className="px-4 py-3 text-sm text-slate-200">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
