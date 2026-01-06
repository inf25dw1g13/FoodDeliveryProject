import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Ingredientes } from '../models';
import { IngredientesRepository } from '../repositories';
export declare class IngredientesController {
    ingredientesRepository: IngredientesRepository;
    constructor(ingredientesRepository: IngredientesRepository);
    create(ingredientes: Omit<Ingredientes, 'id'>): Promise<Ingredientes>;
    count(where?: Where<Ingredientes>): Promise<Count>;
    find(filter?: Filter<Ingredientes>): Promise<Ingredientes[]>;
    updateAll(ingredientes: Ingredientes, where?: Where<Ingredientes>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Ingredientes>): Promise<Ingredientes>;
    updateById(id: number, ingredientes: Ingredientes): Promise<void>;
    replaceById(id: number, ingredientes: Ingredientes): Promise<void>;
    deleteById(id: number): Promise<void>;
}
