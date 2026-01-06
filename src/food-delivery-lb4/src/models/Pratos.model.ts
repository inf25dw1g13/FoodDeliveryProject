import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ingredientes} from './Ingredientes.model';
import {PratosIngredientes} from './PratosIngredientes.model';

@model({
  settings: {
    mysql: {
      table: 'pratos'
    }
  }
})
export class Pratos extends Entity {
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
    type: 'number',
    required: true,
  })
  preco: number;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  disponivel?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  vegetariano?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  vegan?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  sem_gluten?: boolean;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'restaurante_id'
    }
  })
  restaurante_id: number;

  @property({
    type: 'number',
    mysql: {
      columnName: 'categoria_id'
    }
  })
  categoria_id?: number;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'created_at'
    }
  })
  created_at?: string;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'updated_at'
    }
  })
  updated_at?: string;

  @hasMany(() => Ingredientes, {through: {model: () => PratosIngredientes}})
  ingredientes: Ingredientes[];

  constructor(data?: Partial<Pratos>) {
    super(data);
  }
}

export interface PratosRelations {
  ingredientes?: Ingredientes[];
}

export type PratosWithRelations = Pratos & PratosRelations;
