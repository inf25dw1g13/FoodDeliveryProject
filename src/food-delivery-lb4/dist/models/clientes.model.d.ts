import { Entity } from '@loopback/repository';
import { Pedidos } from './pedidos.model';
export declare class Clientes extends Entity {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    morada: string;
    pedidos: Pedidos[];
    constructor(data?: Partial<Clientes>);
}
export interface ClientesRelations {
}
export type ClientesWithRelations = Clientes & ClientesRelations;
