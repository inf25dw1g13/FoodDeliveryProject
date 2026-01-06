import {Entity, model, property, hasMany} from '@loopback/repository';
import {Clientes} from './Clientes.model';
import {Restaurantes} from './Restaurantes.model';
import {Entregadores} from './Entregadores.model';

@model({
  settings: {
    mysql: {
      table: 'codpostal'
    }
  }
})
export class Codpostal extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  codpostal: string;

  @property({
    type: 'string',
    required: true,
  })
  localidade: string;

  @property({
    type: 'string',
    required: true,
  })
  cidade: string;

  @hasMany(() => Clientes, {keyTo: 'codpostal'})
  clientes: Clientes[];

  @hasMany(() => Restaurantes, {keyTo: 'codpostal'})
  restaurantes: Restaurantes[];

  @hasMany(() => Entregadores, {keyTo: 'codpostal'})
  entregadores: Entregadores[];

  constructor(data?: Partial<Codpostal>) {
    super(data);
  }
}

export interface CodpostalRelations {
  clientes?: Clientes[];
  restaurantes?: Restaurantes[];
  entregadores?: Entregadores[];
}

export type CodpostalWithRelations = Codpostal & CodpostalRelations;
