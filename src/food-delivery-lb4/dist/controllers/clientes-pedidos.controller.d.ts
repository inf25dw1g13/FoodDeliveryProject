import { Count, Filter, Where } from '@loopback/repository';
import { Clientes, Pedidos } from '../models';
import { ClientesRepository } from '../repositories';
export declare class ClientesPedidosController {
    protected clientesRepository: ClientesRepository;
    constructor(clientesRepository: ClientesRepository);
    find(id: number, filter?: Filter<Pedidos>): Promise<Pedidos[]>;
    create(id: typeof Clientes.prototype.id, pedidos: Omit<Pedidos, 'id'>): Promise<Pedidos>;
    patch(id: number, pedidos: Partial<Pedidos>, where?: Where<Pedidos>): Promise<Count>;
    delete(id: number, where?: Where<Pedidos>): Promise<Count>;
}
