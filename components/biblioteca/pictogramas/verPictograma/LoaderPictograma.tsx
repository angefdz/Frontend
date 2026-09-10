
import { styles } from '@/styles/BibliotecaScreen.styles';
import { ActivityIndicator, Text, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function LoaderPictograma() {
  const { language } = useLanguage();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>{language === 'en' ? 'Loading pictogram…' : 'Cargando pictograma...'}</Text>
    </View>
  );
}
