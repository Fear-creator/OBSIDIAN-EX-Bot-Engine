const renderSessions = (sessions) => {
  const container = document.getElementById('sessionsContainer');
  if (!container) return;

  if (!Array.isArray(sessions) || sessions.length === 0) {
    container.innerHTML = '<p class="text-gray-500">No active sessions found.</p>';
    return;
  }

  container.innerHTML = sessions
    .map(
      (session) => `
      <div class="rounded-lg border border-gray-800 bg-black/30 p-3">
        <p class="text-xs uppercase text-gray-500">Session</p>
        <p class="font-medium break-all">${session.sessionId || 'Unknown'}</p>
        <p class="text-xs mt-2 text-gray-400">Status: <span class="text-gray-200">${session.status || 'Unknown'}</span></p>
      </div>
    `
    )
    .join('');
};

const fetchActiveSessions = async () => {
  const container = document.getElementById('sessionsContainer');
  if (!container) return;

  try {
    const res = await fetch('/api/sessions/active');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Could not load active sessions.');
    }

    renderSessions(data.sessions || data);
  } catch (error) {
    container.innerHTML = `<p class="text-red-400">${error.message}</p>`;
  }
};

const refreshPairStatus = async () => {
  const statusText = document.getElementById('statusText');
  const statusDot = document.getElementById('statusDot');

  if (!statusText || !window.sessionMeta?.sessionId) {
    return;
  }

  try {
    const res = await fetch(`/api/pair/status/${window.sessionMeta.sessionId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Unable to fetch status.');
    }

    const status = data.status || 'UNKNOWN';
    statusText.textContent = status;

    if (statusDot) {
      statusDot.className = 'h-2.5 w-2.5 rounded-full';
      if (status === 'CONNECTED') {
        statusDot.classList.add('bg-green-400');
      } else if (status === 'FAILED' || status === 'DISCONNECTED') {
        statusDot.classList.add('bg-red-400');
      } else {
        statusDot.classList.add('bg-yellow-400');
      }
    }
  } catch (error) {
    statusText.textContent = `Error: ${error.message}`;
    if (statusDot) {
      statusDot.className = 'h-2.5 w-2.5 rounded-full bg-red-400';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refreshSessions');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchActiveSessions);
    fetchActiveSessions();
  }

  if (window.sessionMeta?.sessionId) {
    refreshPairStatus();
    setInterval(refreshPairStatus, 5000);
  }
});
