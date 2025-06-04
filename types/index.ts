// types/index.ts

export type Pictograma = {
  id: number;
  nombre: string;
  imagen: string; // URL (ya no es un emoji)
  tipo: string;
  usuario?: any;
};

  
  export type Categoria = {
    id: number;
    nombre: string;
    imagen: string; // emoji o representación visual
  };
  