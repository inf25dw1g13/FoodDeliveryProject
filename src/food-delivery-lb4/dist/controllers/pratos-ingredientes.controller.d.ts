import { Count, Filter, Where } from '@loopback/repository';
import { Pratos, Ingredientes } from '../models';
import { PratosRepository } from '../repositories';
export declare class PratosIngredientesController {
    protected pratosRepository: PratosRepository;
    constructor(pratosRepository: PratosRepository);
    find(id: number, filter?: Filter<Ingredientes>): Promise<Ingredientes[]>;
    create(id: typeof Pratos.prototype.id, ingredientes: Omit<Ingredientes, 'id'>): Promise<Ingredientes>;
    patch(id: number, ingredientes: Partial<Ingredientes>, where?: Where<Ingredientes>): Promise<Count>;
    delete(id: number, where?: Where<Ingredientes>): Promise<Count>;
}
