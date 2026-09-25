function resolveApiBase() {
  const configuredApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api' : undefined);
  if (!configuredApiUrl) return { error: 'The application API is not configured. Set VITE_API_URL for this deployment.' };
  try {
    const url = new URL(configuredApiUrl);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';
    if (pathname !== '/api') return { error: 'VITE_API_URL must be an absolute API base ending in /api.' };
    if (import.meta.env.PROD && (url.protocol !== 'https:' || url.origin === window.location.origin)) {
      return { error: 'VITE_API_URL must point to the HTTPS Railway API origin, not this Vercel site.' };
    }
    url.pathname = '/api';
    url.search = '';
    url.hash = '';
    return { baseUrl: url.toString().replace(/\/$/, '') };
  } catch {
    return { error: 'VITE_API_URL must be an absolute URL ending in /api.' };
  }
}

const apiConfiguration = resolveApiBase();

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  if (!apiConfiguration.baseUrl) throw new ApiError(apiConfiguration.error!, 0);
  const requestPath = path.startsWith('/') ? path : `/${path}`;
  let response: Response;
  try {
    response = await fetch(`${apiConfiguration.baseUrl}${requestPath}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
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