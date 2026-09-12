import { useCallback, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { useFocusEffect } from 'expo-router/react-navigation';
import axios, { isAxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mergeVisible } from '@/utils/pictogramOrder';

const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/orden-pictogramas`;
export function useOrdenPictogramas() {
  const { token } = useAuth();
  const { language } = useLanguage();
  const en = language === 'en';
  const [ids, setIds] = useState<number[]>([]);
  const [base, setBase] = useState<number[]>([]);
  const [editing, setEditing] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const authorization = useRef('');
  const baseRef = useRef<number[]>([]);
  const epoch = useRef(0);
  const headers = { Authorization: `Bearer ${token}` };
  const cancel = useCallback(() => {
    epoch.current++;
    authorization.current = '';
    setEditing(false); setDialog(false); setPassword(''); setBusy(false);
  }, []);
  const load = useCallback(async () => {
    const generation = ++epoch.current;
    setReady(false); setError('');
    try {
      const response = await axios.get<number[]>(url, { headers: { Authorization: `Bearer ${token}` } });
      if (generation !== epoch.current) return;
      setIds(response.data); setBase(response.data); baseRef.current = response.data; setReady(true);
    } catch {
      if (generation === epoch.current) setError(en ? 'Could not load the saved layout. Retry.' : 'No se pudo cargar el orden guardado. Reintentar.');
    }
  }, [token, en]);
  useFocusEffect(useCallback(() => {
    cancel(); void load();
    const subscription = AppState.addEventListener('change', state => {
      if (state !== 'active') { cancel(); setIds(baseRef.current); }
      else void load();
    });
    return () => { subscription.remove(); cancel(); };
  }, [cancel, load]));
  async function authenticate() {
    if (busy || !password) return;
    const generation = epoch.current;
    setBusy(true); setError('');
    try {
      const response = await axios.post(url + '/autorizar', { contrasena: password }, { headers });
      if (generation !== epoch.current) return;
      authorization.current = response.data.autorizacion;
      setPassword(''); setDialog(false); setEditing(true);
    } catch {
      if (generation === epoch.current) setError(en ? 'Authentication failed. Check your password and connection.' : 'No se pudo autorizar. Comprueba la contraseña y la conexión.');
    } finally { if (generation === epoch.current) setBusy(false); }
  }
  async function done() {
    if (busy || !editing) return;
    const generation = epoch.current;
    setBusy(true); setError('');
    try {
      const response = await axios.put<number[]>(url, { autorizacion: authorization.current, base, ids, reset: false }, { headers });
      if (generation !== epoch.current) return;
      setIds(response.data); setBase(response.data); baseRef.current = response.data; cancel();
    } catch (err) {
      if (generation !== epoch.current) return;
      if (isAxiosError(err) && err.response?.status === 403) {
        setEditing(false); setIds(base); authorization.current = ''; setDialog(true);
      }
      setError(en ? 'Order was not saved. Retry; if it changed on another device, leave and reopen this screen.' : 'No se guardó el orden. Reintenta; si cambió en otro dispositivo, sal y vuelve a esta pantalla.');
    } finally { if (generation === epoch.current) setBusy(false); }
  }
  function reset() {
    if (!editing || busy) return;
    Alert.alert(en ? 'Reset pictogram order' : 'Restablecer orden de pictogramas',
      en ? 'Are you sure you want to restore the default pictogram order?' : '¿Seguro que quieres restablecer el orden predeterminado de los pictogramas?', [
        { text: en ? 'Cancel' : 'Cancelar', style: 'cancel' },
        { text: en ? 'Reset' : 'Restablecer', style: 'destructive', onPress: () => setIds(current => [...current].sort((a, b) => a - b)) },
      ]);
  }
  return { ids, editing, dialog, password, setPassword, busy, ready, error, en, authenticate, done, reset, load,
    open: () => { if (ready && !busy) { setError(''); setDialog(true); } },
    cancelDialog: () => { cancel(); setIds(base); setError(''); },
    reorder: (visible: number[]) => { if (editing && !busy) setIds(current => mergeVisible(current, visible)); },
  };
}
