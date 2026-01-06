import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pratos} from './Pratos.model';
import {PedidosPratos} from './PedidosPratos.model';

@model({
  settings: {
    mysql: {
      table: 'pedidos'
    }
  }
})
export class Pedidos extends Entity {
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
  metodo_pagamento: string;

  @property({
    type: 'date',
  })
  hora_pedido?: string;

  @property({
    type: 'number',
    default: 10.00,
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'cliente_id'
    }
  })
  cliente_id: number;

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

  @hasMany(() => Pratos, {through: {model: () => PedidosPratos}})
  pratos: Pratos[];

  constructor(data?: Partial<Pedidos>) {
    super(data);
  }
}

export interface PedidosRelations {
  pratos?: Pratos[];
}

export type PedidosWithRelations = Pedidos & PedidosRelations;
