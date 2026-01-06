import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Ingredientes } from './Ingredientes.model';
import { Pratos } from './Pratos.model';

@model({
  settings: {
    mysql: {
      table: 'pratos_ingredientes'
    }
  }
})
export class PratosIngredientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default: '0',
  })
  quantidade?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  obrigatorio?: boolean;

  @property({
    type: 'string',
    default: 'g',
  })
  unidade?: string;

  @belongsTo(
    () => Pratos,
    {},
    {
      mysql: { columnName: 'prato_id' },
    },
  )
  pratosId: number;

  @belongsTo(
    () => Ingredientes,
    {},
    {
      mysql: { columnName: 'ingrediente_id' },
    },
  )
  ingredientesId: number;

  constructor(data?: Partial<PratosIngredientes>) {
    super(data);
  }
}

export interface PratosIngredientesRelations {
}

export type PratosIngredientesWithRelations = PratosIngredientes & PratosIngredientesRelations;