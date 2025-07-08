import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

type Props = {
  readonly modoAgrupado: boolean;
  readonly setModoAgrupado: (valor: boolean) => void;
  readonly resetearCategoria: () => void;
  readonly setItemsPerPage: (num: number) => void;
  readonly itemsPerPage: number;
};

export default function MenuConfiguracion({
  modoAgrupado,
  setModoAgrupado,
  resetearCategoria,
  setItemsPerPage,
  itemsPerPage,
}: Props) {
  const { width } = Dimensions.get('window');
const iconSize = width * 0.045; 

  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);
  const [mostrarMenuPrincipal, setMostrarMenuPrincipal] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleAgrupado = () => {
    const nuevoValor = !modoAgrupado;
    setModoAgrupado(nuevoValor);
    resetearCategoria();
  };

  const handleReajustarPictogramas = () => {
    setMostrarMenuPrincipal(false);
    setMostrarSubmenu(true);
  };

  const handleVolver = () => {
    setMostrarSubmenu(false);
    setMostrarMenuPrincipal(true);
  };

  const cerrarMenu = () => {
    setMenuVisible(false);
    setMostrarMenuPrincipal(true);
    setMostrarSubmenu(false);
  };

  return (
    <View style={styles.container}>
      <Menu opened={menuVisible} onBackdropPress={cerrarMenu}>
        <MenuTrigger
          customStyles={triggerStyles}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <View
            accessible
            accessibilityRole="button"
            accessibilityLabel={
              menuVisible
                ? 'Cerrar menú de configuración'
                : 'Abrir menú de configuración'
            }
          >
            <Feather
              name={menuVisible ? 'x' : 'settings'}
              size={iconSize}
              color="#aaa"
            />
          </View>
        </MenuTrigger>

        {mostrarMenuPrincipal && (
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={toggleAgrupado}>
              <View
                accessible
                accessibilityRole="button"
                accessibilityLabel={
                  modoAgrupado
                    ? 'Desagrupar pictogramas en el teclado'
                    : 'Agrupar pictogramas por categorías en el teclado'
                }
              >
                <Text style={styles.menuOptionText}>
                  {modoAgrupado
                    ? 'Desagrupar pictogramas'
                    : 'Agrupar por categorías'}
                </Text>
              </View>
            </MenuOption>

            <MenuOption onSelect={handleReajustarPictogramas}>
              <View
                accessible
                accessibilityRole="button"
                accessibilityLabel="Cambiar el número de pictogramas visibles en el teclado"
              >
                <Text style={styles.menuOptionText}>
                  Reajustar número de pictogramas
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        )}

        {mostrarSubmenu && (
          <MenuOptions customStyles={optionsStyles}>
            {[4, 9, 16, 25].map((cantidad) => (
              <MenuOption
                key={cantidad}
                onSelect={() => {
                  setItemsPerPage(cantidad);
                  cerrarMenu();
                }}
              >
                <View
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`Mostrar ${cantidad} pictogramas por página`}
                >
                  <Text
                    style={[
                      styles.menuOptionText,
                      itemsPerPage === cantidad && styles.selectedOption,
                    ]}
                  >
                    {cantidad} pictogramas
                  </Text>
                </View>
              </MenuOption>
            ))}

            <MenuOption onSelect={handleVolver}>
              <View
                accessible
                accessibilityRole="button"
                accessibilityLabel="Volver al menú anterior"
              >
                <Text style={[styles.menuOptionText, { fontWeight: 'bold' }]}>
                  ← Volver
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        )}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  menuOptionText: {
    padding: 10,
    fontSize: 16,
  },
  selectedOption: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

const triggerStyles = {
  triggerWrapper: {},
};

const optionsStyles = {
  optionsContainer: {
    width: 250,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 35,
    marginRight: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
};
