

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
  traducciones?: Partial<Record<'es' | 'en', string>>;
};

export type CategoriaSimple = {
  id: number;
  nombre: string;
  imagen: string;
  usuarioId: number | null;
  traducciones?: Partial<Record<'es' | 'en', string>>;
};


export type PictogramaSimple = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  usuarioId?: number | null;
  traducciones?: Partial<Record<'es' | 'en', string>>;

};

export type PalabraFrase = {
  pictogramaId: number;
  lema: string;
  texto: string;
};

export type PictogramaConCategorias = {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  categorias: CategoriaSimple[];
  usuarioId?: any ;
  traducciones?: Partial<Record<'es' | 'en', string>>;
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
  traducciones?: Partial<Record<'es' | 'en', string>>;
}


export interface UsuarioSimple{
  id: number;
  correo: string;
  nombre: string;
}
