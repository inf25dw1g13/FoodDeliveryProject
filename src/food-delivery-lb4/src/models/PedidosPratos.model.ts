import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Pedidos } from './Pedidos.model';
import { Pratos } from './Pratos.model';

@model({
  settings: {
    mysql: {
      table: 'pedidos_pratos'
    }
  }
})
export class PedidosPratos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 1,
  })
  quantidade?: number;


  @belongsTo(
    () => Pedidos,
    {},
    { mysql: { columnName: 'pedido_id' } },
  )
  pedidosId: number;


  @belongsTo(
    () => Pratos,
    {},
    { mysql: { columnName: 'prato_id' } },
  )
  pratosId: number;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'created_at'
    }
  })
  created_at?: string;

  constructor(data?: Partial<PedidosPratos>) {
    super(data);
  }
}

export interface PedidosPratosRelations {
}

export type PedidosPratosWithRelations = PedidosPratos & PedidosPratosRelations;