const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  window.location.href = '/';
};

export default handleLogout;
