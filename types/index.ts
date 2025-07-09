

export type Pictograma = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  usuario?: any;
  categorias: [ ];

};

export type Categoria = {
  id: number;
  nombre: string;
  imagen: string;
  usuario?: any;
  pictogramas: PictogramaSimple[]; 
};

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
  usuarioId?: number | null;

};

export type PictogramaConCategorias = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  categorias: CategoriaSimple[];
  usuarioId?: any ;
};
export interface Configuracion {
  id: number;
  botonesPorPantalla: number;
  mostrarPorCategoria: boolean;
  tipoVoz: 'masculina' | 'femenina';
}


export type ConfiguracionPayload  = {
  id: number;
  botonesPorPantalla: number;
  mostrarPorCategoria: boolean;
  tipoVoz: string; 
}

export interface CategoriaConPictogramas {
  id: number;
  nombre: string;
  imagen: string;
  pictogramas: PictogramaSimple[];
  usuarioId: number | null; 
}


export interface UsuarioSimple{
  id: number;
  correo: string;
  nombre: string;
}



