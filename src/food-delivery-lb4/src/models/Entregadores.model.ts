import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Entregas} from './Entregas.model';
import {Codpostal} from './Codpostal.model';

@model({
  settings: {
    mysql: {
      table: 'entregadores'
    }
  }
})
export class Entregadores extends Entity {
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

  @belongsTo(() => Codpostal, {name: 'codpostalRel'})
  codpostal?: string;

  @property({
    type: 'string',
    default: 'disponivel',
  })
  estado?: string;

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

  @hasMany(() => Entregas, {keyTo: 'entregador_id'})
  entregas: Entregas[];

  constructor(data?: Partial<Entregadores>) {
    super(data);
  }
}

export interface EntregadoresRelations {
  entregas?: Entregas[];
  codpostalRel?: Codpostal;
}

export type EntregadoresWithRelations = Entregadores & EntregadoresRelations;