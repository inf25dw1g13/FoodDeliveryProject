import { Count, Filter, Where } from '@loopback/repository';
import { Pedidos, Pratos } from '../models';
import { PedidosRepository } from '../repositories';
export declare class PedidosPratosController {
    protected pedidosRepository: PedidosRepository;
    constructor(pedidosRepository: PedidosRepository);
    find(id: number, filter?: Filter<Pratos>): Promise<Pratos[]>;
    create(id: typeof Pedidos.prototype.id, pratos: Omit<Pratos, 'id'>): Promise<Pratos>;
    patch(id: number, pratos: Partial<Pratos>, where?: Where<Pratos>): Promise<Count>;
    delete(id: number, where?: Where<Pratos>): Promise<Count>;
}
