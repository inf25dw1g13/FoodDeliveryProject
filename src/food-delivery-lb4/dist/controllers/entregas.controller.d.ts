import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Entregas } from '../models';
import { EntregasRepository } from '../repositories';
export declare class EntregasController {
    entregasRepository: EntregasRepository;
    constructor(entregasRepository: EntregasRepository);
    create(entregas: Omit<Entregas, 'id'>): Promise<Entregas>;
    count(where?: Where<Entregas>): Promise<Count>;
    find(filter?: Filter<Entregas>): Promise<Entregas[]>;
    updateAll(entregas: Entregas, where?: Where<Entregas>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Entregas>): Promise<Entregas>;
    updateById(id: number, entregas: Entregas): Promise<void>;
    replaceById(id: number, entregas: Entregas): Promise<void>;
    deleteById(id: number): Promise<void>;
}
