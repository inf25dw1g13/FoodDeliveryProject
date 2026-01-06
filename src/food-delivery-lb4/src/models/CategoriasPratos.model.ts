import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pratos} from './Pratos.model';
import {Restaurantes} from './Restaurantes.model';

@model({
  settings: {
    mysql: {
      table: 'categorias_pratos'
    }
  }
})
export class CategoriasPratos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'created_at'
    }
  })
  created_at?: string;

  @hasMany(() => Pratos, {keyTo: 'categoria_id'})
  pratos: Pratos[];

  @hasMany(() => Restaurantes, {keyTo: 'especialidade_id'})
  restaurantes: Restaurantes[];

  constructor(data?: Partial<CategoriasPratos>) {
    super(data);
  }
}

export interface CategoriasPratosRelations {
  pratos?: Pratos[];
  restaurantes?: Restaurantes[];
}

export type CategoriasPratosWithRelations = CategoriasPratos & CategoriasPratosRelations;
