import { styles } from '@/styles/PerfilScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditarPerfilScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const correo = 'usuario@ejemplo.com';

  const [voz, setVoz] = useState('femenina');
  const [open, setOpen] = useState(false);
  const [opciones, setOpciones] = useState([
    { label: 'Femenina', value: 'femenina' },
    { label: 'Masculina', value: 'masculina' },
    { label: 'Robot', value: 'robot' },
    { label: 'Infantil', value: 'infantil' },
  ]);

  useEffect(() => {
    const cargarDatos = async () => {
      const vozGuardada = await AsyncStorage.getItem('voz');
      if (vozGuardada) setVoz(vozGuardada);
    };
    cargarDatos();
  }, []);

  const guardarCambios = async () => {
    await AsyncStorage.setItem('voz', voz);
    Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente');
    router.back(); // Vuelve a la pantalla anterior
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.avatar} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del usuario"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} value={correo} editable={false} />

      <Text style={styles.label}>Voz</Text>
      <DropDownPicker
        open={open}
        value={voz}
        items={opciones}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(voz); // obtiene el nuevo valor del combo
          setVoz(newValue);
          AsyncStorage.setItem('voz', newValue);
        }}
        setItems={setOpciones}
        placeholder="Selecciona un tipo de voz"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      />

      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
