import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Pratos } from '../models';
import { PratosRepository } from '../repositories';
export declare class PratosController {
    pratosRepository: PratosRepository;
    constructor(pratosRepository: PratosRepository);
    create(pratos: Omit<Pratos, 'id'>): Promise<Pratos>;
    count(where?: Where<Pratos>): Promise<Count>;
    find(filter?: Filter<Pratos>): Promise<Pratos[]>;
    updateAll(pratos: Pratos, where?: Where<Pratos>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Pratos>): Promise<Pratos>;
    updateById(id: number, pratos: Pratos): Promise<void>;
    replaceById(id: number, pratos: Pratos): Promise<void>;
    deleteById(id: number): Promise<void>;
}
