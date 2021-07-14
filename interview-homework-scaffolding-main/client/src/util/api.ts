
export const API_HOST = 'http://localhost:9043';

export const request = async (uri: string, method: string, opts: RequestInit): Promise<Response> => {
  const options = opts || {};

  const headers = Object.assign(
    options.headers || {},
    {
      Accept: '*/*',
      ...(method === 'POST') ? {
        'Content-Type': 'application/json',
      } : {},
    },
  );
  
  const requestOptions: RequestInit = {
    headers,
    method,
    ...options,
  };

  return fetch(`${API_HOST}/api${uri}`, requestOptions);
};

export class Api {
  static get = (uri: string, opts: RequestInit = {}): Promise<Response> => request(uri, 'GET', opts);

  static post = (uri: string, opts: RequestInit = {}): Promise<Response> => request(uri, 'POST', opts);

  static put = (uri: string, opts: RequestInit = {}): Promise<Response> => request(uri, 'PUT', opts);

  static del = (uri: string, opts: RequestInit = {}): Promise<Response> => request(uri, 'DELETE', opts);
}

