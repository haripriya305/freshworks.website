/* ===========================================================
   FreshWorks — API helper (talks to backend REST API)
=========================================================== */
// Same-origin '/api' on Vercel or when served by the backend (npm start).
// If the HTML is opened from another local port (e.g. VS Code Live Server :5500) or file://, call the backend on :5000.
const API_BASE = (() => {
  const { protocol, hostname, port } = window.location;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  if (protocol === 'file:' || (isLocal && port && port !== '5000')) return 'http://localhost:5000/api';
  return '/api';
})();

async function apiRequest(path, { method = 'GET', body = null, auth = false } = {}){
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('fw_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch (e) {
    throw new Error('Cannot reach the server. Check your internet connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

const Api = {
  // Auth
  register: (payload) => apiRequest('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => apiRequest('/auth/login', { method: 'POST', body: payload }),
  me: () => apiRequest('/auth/me', { auth: true }),

  // Contact
  sendContact: (payload) => apiRequest('/contact', { method: 'POST', body: payload }),

  // Blog
  getPosts: () => apiRequest('/blog'),
  getPost: (slug) => apiRequest(`/blog/${slug}`),

  // Dashboard / analytics
  getAnalyticsSummary: () => apiRequest('/analytics/summary', { auth: true }),
  getTickets: () => apiRequest('/tickets', { auth: true }),

  // Admin
  getUsers: () => apiRequest('/admin/users', { auth: true }),
  updateUserRole: (id, role) => apiRequest(`/admin/users/${id}`, { method: 'PATCH', body: { role }, auth: true }),
  deleteUser: (id) => apiRequest(`/admin/users/${id}`, { method: 'DELETE', auth: true }),
  getContactMessages: () => apiRequest('/admin/messages', { auth: true })
};
