import { Entity } from '@loopback/repository';
export declare class PedidosPratosThrough extends Entity {
    id?: number;
    quantidade?: number;
    pedidosId?: number;
    pratosId?: number;
    constructor(data?: Partial<PedidosPratosThrough>);
}
export interface PedidosPratosThroughRelations {
}
export type PedidosPratosThroughWithRelations = PedidosPratosThrough & PedidosPratosThroughRelations;
