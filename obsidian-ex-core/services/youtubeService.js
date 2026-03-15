const axios = require('axios');

async function searchVideos(query) {
  // Placeholder for future YouTube Data API integration.
  // Returning normalized structure for dashboard/bot compatibility.
  await Promise.resolve();
  return {
    query,
    items: [],
    source: 'youtube',
    note: 'YouTube API integration not configured yet.'
  };
}

module.exports = {
  searchVideos
};
