import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'ingredientes'
    }
  }
})
export class Ingredientes extends Entity {
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
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'boolean',
    default: false,
    required: true,
  })
  alergeno: boolean;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'created_at'
    }
  })
  created_at?: string;

  constructor(data?: Partial<Ingredientes>) {
    super(data);
  }
}

export interface IngredientesRelations {
}

export type IngredientesWithRelations = Ingredientes & IngredientesRelations;
