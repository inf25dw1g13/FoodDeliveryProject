import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Ingredientes, IngredientesRelations} from '../models';

export class IngredientesRepository extends DefaultCrudRepository<
  Ingredientes,
  typeof Ingredientes.prototype.id,
  IngredientesRelations
> {
  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource,
  ) {
    super(Ingredientes, dataSource);
  }
}
