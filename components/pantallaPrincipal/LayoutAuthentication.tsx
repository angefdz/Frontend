import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { palette } from '@/constants/Theme';
import { useOrdenPictogramas } from '@/hooks/pantallaPrincipal/useOrdenPictogramas';

type Props = { editor: ReturnType<typeof useOrdenPictogramas> };
export default function LayoutAuthentication({ editor: e }: Props) {
  return <Modal visible={e.dialog} transparent animationType="fade" onRequestClose={e.cancelDialog}>
    <View style={styles.backdrop}><View style={styles.card} accessibilityViewIsModal>
      <Text style={styles.title}>{e.en ? 'Authorize layout editing' : 'Autorizar edición del teclado'}</Text>
      <Text>{e.en ? 'Enter this account’s administrator password.' : 'Introduce la contraseña de administración de esta cuenta.'}</Text>
      <TextInput value={e.password} onChangeText={e.setPassword} secureTextEntry autoCapitalize="none"
        autoCorrect={false} autoFocus accessibilityLabel={e.en ? 'Password' : 'Contraseña'}
        style={styles.input} editable={!e.busy} onSubmitEditing={e.authenticate} />
      {!!e.error && <Text accessibilityRole="alert" style={{ color: palette.error }}>{e.error}</Text>}
      <View style={styles.actions}>
        <Pressable onPress={e.cancelDialog} accessibilityRole="button" style={styles.button}><Text>{e.en ? 'Cancel' : 'Cancelar'}</Text></Pressable>
        <Pressable onPress={e.authenticate} disabled={e.busy || !e.password} accessibilityRole="button" style={styles.button}><Text>{e.busy ? '…' : e.en ? 'Authorize' : 'Autorizar'}</Text></Pressable>
      </View>
    </View></View>
  </Modal>;
}
const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#0008' },
  card: { padding: 24, borderRadius: 16, backgroundColor: palette.surface, gap: 16 },
  title: { fontSize: 20, fontWeight: '700', color: palette.text },
  input: { borderWidth: 1, borderColor: palette.border, borderRadius: 8, padding: 12, color: palette.text },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16 },
  button: { minHeight: 44, padding: 12, justifyContent: 'center' },
});
