// Set the session in the local storage
export const setSession = (token, expiry) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

// Clear the session from the local storage
export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

// Checks if the session is valid (locally) according to the expiration time
export const isSessionValid = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

// Creates the authorization header using the bearer token
export const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

export const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'content-type': 'multipart/form-data'
});