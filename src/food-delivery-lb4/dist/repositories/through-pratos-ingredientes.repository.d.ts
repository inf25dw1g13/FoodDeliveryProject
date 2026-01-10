import { DefaultCrudRepository } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { ThroughPratosIngredientes, ThroughPratosIngredientesRelations } from '../models';
export declare class ThroughPratosIngredientesRepository extends DefaultCrudRepository<ThroughPratosIngredientes, typeof ThroughPratosIngredientes.prototype.id, ThroughPratosIngredientesRelations> {
    constructor(dataSource: FooddbDataSource);
}
