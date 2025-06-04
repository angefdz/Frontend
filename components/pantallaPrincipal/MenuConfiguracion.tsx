import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

type Props = {
  modoAgrupado: boolean;
  setModoAgrupado: (valor: boolean) => void;
  resetearCategoria: () => void;
  setItemsPerPage: (num: number) => void;
  itemsPerPage: number;
};

export default function MenuConfiguracion({
  modoAgrupado,
  setModoAgrupado,
  resetearCategoria,
  setItemsPerPage,
  itemsPerPage,
}: Props) {
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
          <Feather
            name={menuVisible ? 'x' : 'settings'}
            size={24}
            color="#aaa"
          />
        </MenuTrigger>

        {mostrarMenuPrincipal && (
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={toggleAgrupado}>
              <Text style={styles.menuOptionText}>
                {modoAgrupado
                  ? 'Desagrupar pictogramas'
                  : 'Agrupar por categorías'}
              </Text>
            </MenuOption>
            <MenuOption onSelect={handleReajustarPictogramas}>
              <Text style={styles.menuOptionText}>
                Reajustar número de pictogramas
              </Text>
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
                <Text
                  style={[
                    styles.menuOptionText,
                    itemsPerPage === cantidad && styles.selectedOption,
                  ]}
                >
                  {cantidad} pictogramas
                </Text>
              </MenuOption>
            ))}
            <MenuOption onSelect={handleVolver}>
              <Text style={[styles.menuOptionText, { fontWeight: 'bold' }]}>
                ← Volver
              </Text>
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
