import Constants from 'expo-constants';

const API_PORT = 5000;

function resolveHost(): string {
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];
  if (host) {
    return `http://${host}:${API_PORT}`;
  }
  return `http://localhost:${API_PORT}`;
}

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? resolveHost();