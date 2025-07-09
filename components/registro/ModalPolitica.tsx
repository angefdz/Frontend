

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalPoliticaPrivacidad({ visible, onClose }: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={modalStyles.modal}
    >
      <View style={modalStyles.modalContent} accessibilityViewIsModal accessibilityLabel="Política de privacidad">
        <TouchableOpacity onPress={onClose} accessibilityRole="button" accessibilityLabel="Cerrar política" style={modalStyles.botonCerrar}>
          <Text style={modalStyles.textoCerrar}>Cerrar</Text>
        </TouchableOpacity>

        <Text style={modalStyles.titulo}>Política de Privacidad</Text>

        <ScrollView contentContainerStyle={{ paddingHorizontal: width * 0.04 }}>
          <Text style={modalStyles.texto}>
            Esta aplicación ha sido desarrollada como parte de un Trabajo de Fin de Grado. Su objetivo es ayudar a niños con dificultades en el habla a comunicarse mediante pictogramas. Cumple con el Reglamento General de Protección de Datos (RGPD).
          </Text>

          <Text style={modalStyles.subtitulo}>¿Qué datos recogemos?</Text>
          <Text style={modalStyles.texto}>
            Correo electrónico, nombre, frases generadas, preferencias de configuración, pictogramas personalizados y categorías personalizadas.
          </Text>

          <Text style={modalStyles.subtitulo}>¿Para qué usamos los datos?</Text>
          <Text style={modalStyles.texto}>
            Para ofrecerte una experiencia personalizada, guardar tu progreso y mejorar la aplicación. No compartimos tus datos con terceros.
          </Text>

          <Text style={modalStyles.subtitulo}>Menores de edad</Text>
          <Text style={modalStyles.texto}>
            Si el usuario es menor, la cuenta debe ser creada y gestionada por un adulto responsable.
          </Text>

          <Text style={modalStyles.subtitulo}>Tus derechos</Text>
          <Text style={modalStyles.texto}>
            Puedes acceder, modificar o eliminar tus datos desde la app en cualquier momento.
          </Text>

          <Text style={modalStyles.subtitulo}>Contacto</Text>
          <Text style={modalStyles.texto}>
            Para cualquier duda, puedes escribir a: uo289346@uniovi.es
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: width * 0.06,
    paddingBottom: width * 0.05,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  titulo: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginLeft: width * 0.04,
    marginBottom: width * 0.025,
  },
  subtitulo: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  texto: {
    fontSize: width * 0.03,
    color: '#333',
    marginBottom: 10,
  },
  botonCerrar: {
    alignSelf: 'flex-end',
    marginRight: width * 0.04,
    marginBottom: width * 0.02,
    padding: width * 0.015,
  },
  textoCerrar: {
    fontSize: width * 0.04,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
