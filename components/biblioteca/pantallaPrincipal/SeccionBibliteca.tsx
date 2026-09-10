import CabeceraSeccion from '@/components/biblioteca/pantallaPrincipal/CabeceraSeccion';
import ListaScrollHorizontal from '@/components/biblioteca/pantallaPrincipal/ListaScrollHorizontal';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

interface Props<T> {
  readonly titulo: string;
  readonly onAddPress: () => void;
  readonly onVerMasPress: () => void;
  readonly datos: T[];
  readonly renderItem: (item: T) => React.ReactNode;
  readonly textoVerMas?: string;
  readonly mensajeVacio?: string;
}

export default function SeccionBiblioteca<T>({
  titulo,
  onAddPress,
  onVerMasPress,
  datos,
  renderItem,
  textoVerMas = `Ver más ${titulo.toLowerCase()}`,
  mensajeVacio = `No hay ${titulo.toLowerCase()} disponibles.`,
}: Props<T>) {
  const { language } = useLanguage();
  const verMas = textoVerMas === `Ver más ${titulo.toLowerCase()}` && language === 'en' ? `See more ${titulo.toLowerCase()}` : textoVerMas;
  const vacio = mensajeVacio === `No hay ${titulo.toLowerCase()} disponibles.` && language === 'en' ? `No ${titulo.toLowerCase()} available.` : mensajeVacio;
  return (
    <View>
      <CabeceraSeccion
        titulo={titulo}
        onAddPress={onAddPress}
        tituloStyle={styles.sectionTitle}
      />

      {datos.length === 0 ? (
        <Text
          style={{ marginHorizontal: 16, fontStyle: 'italic' }}
          allowFontScaling={true}
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
        >
          {vacio}
        </Text>
      ) : (
        <View>
          <ListaScrollHorizontal datos={datos} renderItem={renderItem} />

          <TouchableOpacity
            onPress={onVerMasPress}
            style={styles.verMasButton}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Ver más ${titulo.toLowerCase()}`}
            accessibilityHint={`Presiona para explorar más ${titulo.toLowerCase()}`}
          >
            <Text
              style={styles.verMasText}
              allowFontScaling={true}
              adjustsFontSizeToFit={false}
            >
              {verMas}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
