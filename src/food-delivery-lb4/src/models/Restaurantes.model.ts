import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pratos} from './Pratos.model';
import {Pedidos} from './Pedidos.model';
import {Entregas} from './Entregas.model';

@model({
  settings: {
    mysql: {
      table: 'restaurantes'
    }
  }
})
export class Restaurantes extends Entity {
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
  morada: string;

  @property({
    type: 'string',
    required: true,
  })
  codpostal: string;

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
    type: 'number',
    required: true,
    mysql: {
      columnName: 'especialidade_id'
    }
  })
  especialidade_id: number;

  @property({
    type: 'string',
  })
  hora_abertura?: string;

  @property({
    type: 'string',
  })
  hora_fecho?: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'number',
  })
  taxa_entrega?: number;

  @property({
    type: 'date',
    default: '$now',
    mysql: {
      columnName: 'created_at'
    }
  })
  created_at?: string;



  @hasMany(() => Pratos, {keyTo: 'restaurante_id'})
  pratos: Pratos[];

  @hasMany(() => Pedidos, {keyTo: 'restaurante_id'})
  pedidos: Pedidos[];

  @hasMany(() => Entregas, {keyTo: 'restaurante_id'})
  entregas: Entregas[];

  constructor(data?: Partial<Restaurantes>) {
    super(data);
  }
}

export interface RestaurantesRelations {
  pratos?: Pratos[];
  pedidos?: Pedidos[];
  entregas?: Entregas[];
}

export type RestaurantesWithRelations = Restaurantes & RestaurantesRelations;
