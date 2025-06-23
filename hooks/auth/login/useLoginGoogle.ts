import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

// 🚫 Sin useProxy porque ya no es necesario en tu versión
const redirectUri = AuthSession.makeRedirectUri();
console.log('🔁 Redirect URI generado:', redirectUri);

export const useLoginGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
    redirectUri, // ✅ usa el URI generado automáticamente
  });

  const [resultado, setResultado] = useState<{
    token: string;
    usuarioId: number;
  } | null>(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const login = async () => {
        try {
          const userInfo = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
              Authorization: `Bearer ${response.authentication?.accessToken}`,
            },
          });

          const email = userInfo.data.email;

          const res = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/google`, {
            email,
          });

          setResultado({
            token: res.data.token,
            usuarioId: res.data.usuarioId,
          });
        } catch (err) {
          console.error('❌ Error en login con Google:', err);
        }
      };

      login();
    }
  }, [response]);

  return {
    promptAsync,
    request,
    resultado,
  };
};
