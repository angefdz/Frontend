export const predecirSiguientePictograma = (frase: string[]): string | null => {
    const ultima = frase[frase.length - 1];
  
    switch (ultima) {
      case 'Hola':
        return 'Me';
      case 'Me':
        return 'Gusta';
      case 'Gusta':
        return 'Comer';
      case 'Comer':
        return 'Pizza';
      default:
        return null;
    }
  };
  