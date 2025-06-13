// types/index.ts

export type Pictograma = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  usuario?: any;// nueva relación opcional
  categorias: [ ];

};

export type Categoria = {
  id: number;
  nombre: string;
  imagen: string;
  usuario?: any;
  pictogramas: PictogramaSimple[]; // nueva relación opcional
};

// Tipos simplificados para evitar recursividad infinita
export type CategoriaSimple = {
  id: number;
  nombre: string;
  imagen: string;
  usuarioId: number | null;
};


export type PictogramaSimple = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;

};

export type PictogramaConCategorias = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  categorias: CategoriaSimple[];
  usuarioId?: any ;
};


export type ConfiguracionPayload  = {
  id: number;
  botonesPorPantalla: number;
  mostrarPorCategoria: boolean;
  tipoVoz: string; // permitir cualquier valor que venga del backend
}

export interface CategoriaConPictogramas {
  id: number;
  nombre: string;
  imagen: string;
  pictogramas: PictogramaSimple[];
  usuarioId?: number | null;
}

export interface UsuarioSimple{
  id: number;
  correo: string;
  nombre: string;
}



