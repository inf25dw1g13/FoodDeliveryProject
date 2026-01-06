import { Entity } from '@loopback/repository';
import { Pratos } from './pratos.model';
export declare class Pedidos extends Entity {
    id?: number;
    metodo_pagamento: string;
    estado?: string;
    hora_pedido?: string;
    total?: number;
    restaurantesId?: string;
    clientesId?: number;
    pratos: Pratos[];
    constructor(data?: Partial<Pedidos>);
}
export interface PedidosRelations {
}
export type PedidosWithRelations = Pedidos & PedidosRelations;
