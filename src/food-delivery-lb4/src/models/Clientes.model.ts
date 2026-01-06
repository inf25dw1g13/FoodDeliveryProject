import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedidos} from './Pedidos.model';

@model({
  settings: {
    mysql: {
      table: 'clientes'
    }
  }
})
export class Clientes extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefone: string;

  @property({
    type: 'string',
    required: true,
  })
  morada: string;

  @property({
    type: 'string',
  })
  codpostal?: string;

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

  @hasMany(() => Pedidos, {keyTo: 'cliente_id'})
  pedidos: Pedidos[];

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  pedidos?: Pedidos[];
}

export type ClientesWithRelations = Clientes & ClientesRelations;
