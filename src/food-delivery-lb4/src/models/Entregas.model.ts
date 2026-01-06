import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedidos} from './Pedidos.model';

@model({
  settings: {
    mysql: {
      table: 'entregas'
    }
  }
})
export class Entregas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 30,
  })
  tempo_estimado_min?: number;

  @property({
    type: 'number',
    default: 25,
  })
  tempo_real_min?: number;

  @property({
    type: 'string',
  })
  hora_entrega?: string;

  @property({
    type: 'string',
    default: 'pendente',
  })
  estado?: string;

  @belongsTo(
    () => Pedidos,
    {name: 'pedido'},
    { mysql: { columnName: 'pedido_id' } },
  )
  pedido_id: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'entregador_id'
    }
  })
  entregador_id: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'restaurante_id'
    }
  })
  restaurante_id: number;

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

  constructor(data?: Partial<Entregas>) {
    super(data);
  }
}

export interface EntregasRelations {
  pedido?: Pedidos;
}

export type EntregasWithRelations = Entregas & EntregasRelations;
