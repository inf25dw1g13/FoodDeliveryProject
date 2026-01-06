import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Pedidos } from '../models';
import { PedidosRepository } from '../repositories';
export declare class PedidosController {
    pedidosRepository: PedidosRepository;
    constructor(pedidosRepository: PedidosRepository);
    create(pedidos: Omit<Pedidos, 'id'>): Promise<Pedidos>;
    count(where?: Where<Pedidos>): Promise<Count>;
    find(filter?: Filter<Pedidos>): Promise<Pedidos[]>;
    updateAll(pedidos: Pedidos, where?: Where<Pedidos>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Pedidos>): Promise<Pedidos>;
    updateById(id: number, pedidos: Pedidos): Promise<void>;
    replaceById(id: number, pedidos: Pedidos): Promise<void>;
    deleteById(id: number): Promise<void>;
}
