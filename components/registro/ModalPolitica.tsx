

import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useLanguage } from '@/context/LanguageContext';

const { width } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalPoliticaPrivacidad({ visible, onClose }: Props) {
  const { language, tr } = useLanguage();
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
          <Text style={modalStyles.textoCerrar}>{tr('Cerrar')}</Text>
        </TouchableOpacity>

        <Text style={modalStyles.titulo}>{language === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}</Text>

        <ScrollView contentContainerStyle={{ paddingHorizontal: width * 0.04 }}>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'This application was developed as a Final Degree Project. Its purpose is to help children with speech difficulties communicate through pictograms. It complies with the General Data Protection Regulation (GDPR).' : 'Esta aplicación ha sido desarrollada como parte de un Trabajo de Fin de Grado. Su objetivo es ayudar a niños con dificultades en el habla a comunicarse mediante pictogramas. Cumple con el Reglamento General de Protección de Datos (RGPD).'}
          </Text>

          <Text style={modalStyles.subtitulo}>{language === 'en' ? 'What data do we collect?' : '¿Qué datos recogemos?'}</Text>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'Email address, name, generated sentences, settings, custom pictograms and custom categories.' : 'Correo electrónico, nombre, frases generadas, preferencias de configuración, pictogramas personalizados y categorías personalizadas.'}
          </Text>

          <Text style={modalStyles.subtitulo}>{language === 'en' ? 'How do we use the data?' : '¿Para qué usamos los datos?'}</Text>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'To provide a personalised experience, save your progress and improve the application. We do not share your data with third parties.' : 'Para ofrecerte una experiencia personalizada, guardar tu progreso y mejorar la aplicación. No compartimos tus datos con terceros.'}
          </Text>

          <Text style={modalStyles.subtitulo}>{language === 'en' ? 'Children' : 'Menores de edad'}</Text>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'If the user is under age, the account must be created and managed by a responsible adult.' : 'Si el usuario es menor, la cuenta debe ser creada y gestionada por un adulto responsable.'}
          </Text>

          <Text style={modalStyles.subtitulo}>{language === 'en' ? 'Your rights' : 'Tus derechos'}</Text>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'You can access, change or delete your data from the app at any time.' : 'Puedes acceder, modificar o eliminar tus datos desde la app en cualquier momento.'}
          </Text>

          <Text style={modalStyles.subtitulo}>{language === 'en' ? 'Contact' : 'Contacto'}</Text>
          <Text style={modalStyles.texto}>
            {language === 'en' ? 'If you have any questions, contact: uo289346@uniovi.es' : 'Para cualquier duda, puedes escribir a: uo289346@uniovi.es'}
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
    color: '#3157A4',
    fontWeight: 'bold',
  },
});
