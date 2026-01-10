import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Clientes } from '../models';
import { ClientesRepository } from '../repositories';
export declare class ClientesController {
    clientesRepository: ClientesRepository;
    constructor(clientesRepository: ClientesRepository);
    create(clientes: Omit<Clientes, 'id'>): Promise<Clientes>;
    count(where?: Where<Clientes>): Promise<Count>;
    find(filter?: Filter<Clientes>): Promise<Clientes[]>;
    updateAll(clientes: Clientes, where?: Where<Clientes>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Clientes>): Promise<Clientes>;
    updateById(id: number, clientes: Clientes): Promise<void>;
    replaceById(id: number, clientes: Clientes): Promise<void>;
    deleteById(id: number): Promise<void>;
}
