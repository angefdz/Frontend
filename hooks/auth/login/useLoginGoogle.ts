// hooks/useLoginGoogle.ts
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;
const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!;

export function useLoginGoogle() {
  const [resultado, setResultado] = useState<null | { token: string; usuarioId: number }>(null);

  const redirectUri = makeRedirectUri({ useProxy: true } as any);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['openid', 'email', 'profile'],
    redirectUri,
  });

  useEffect(() => {
    const manejarRespuesta = async () => {
      if (response?.type === 'success') {
        const idToken = response.authentication?.idToken;
        if (!idToken) return;

        try {
          const res = await fetch(`${API_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });

          if (!res.ok) {
            throw new Error('Inicio de sesión fallido');
          }

          const data = await res.json();
          setResultado({ token: data.token, usuarioId: data.usuarioId });
        } catch (error) {
          console.error('Error en login con Google:', error);
        }
      }
    };

    manejarRespuesta();
  }, [response]);

  return {
    promptAsync,
    resultado,
  };
}
