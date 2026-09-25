const configuredApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api' : undefined);
const baseUrl = configuredApiUrl?.replace(/\/+$/, '');

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  if (!baseUrl) throw new ApiError('The application API is not configured. Set VITE_API_URL for this deployment.', 0);
  const requestPath = path.startsWith('/') ? path : `/${path}`;
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${requestPath}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  } catch {
    throw new ApiError('Unable to reach the application API. Check VITE_API_URL and the API deployment.', 0);
  }
  if (response.status === 204) return undefined as T;
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string'
      ? body.message
      : `Request failed (HTTP ${response.status}).`;
    throw new ApiError(message, response.status);
  }
  return body as T;
}

export const participantId = () => localStorage.getItem('negosyo-participant-id');
export const saveParticipantId = (id: string) => localStorage.setItem('negosyo-participant-id', id);