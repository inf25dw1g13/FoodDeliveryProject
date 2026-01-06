import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { Pratos, PratosRelations, Ingredientes, ThroughPratosIngredientes } from '../models';
import { ThroughPratosIngredientesRepository } from './through-pratos-ingredientes.repository';
import { IngredientesRepository } from './ingredientes.repository';
export declare class PratosRepository extends DefaultCrudRepository<Pratos, typeof Pratos.prototype.id, PratosRelations> {
    protected throughPratosIngredientesRepositoryGetter: Getter<ThroughPratosIngredientesRepository>;
    protected ingredientesRepositoryGetter: Getter<IngredientesRepository>;
    readonly ingredientes: HasManyThroughRepositoryFactory<Ingredientes, typeof Ingredientes.prototype.id, ThroughPratosIngredientes, typeof Pratos.prototype.id>;
    constructor(dataSource: FooddbDataSource, throughPratosIngredientesRepositoryGetter: Getter<ThroughPratosIngredientesRepository>, ingredientesRepositoryGetter: Getter<IngredientesRepository>);
}
