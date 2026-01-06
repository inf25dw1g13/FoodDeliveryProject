import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Pratos, PratosRelations, Ingredientes, PratosIngredientes} from '../models';
import {PratosIngredientesRepository} from './PratosIngredientes.repository';
import {IngredientesRepository} from './Ingredientes.repository';

export class PratosRepository extends DefaultCrudRepository<
  Pratos,
  typeof Pratos.prototype.id,
  PratosRelations
> {

  public readonly ingredientes: HasManyThroughRepositoryFactory<Ingredientes, typeof Ingredientes.prototype.id,
          PratosIngredientes,
          typeof Pratos.prototype.id
        >;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('PratosIngredientesRepository') protected PratosIngredientesRepositoryGetter: Getter<PratosIngredientesRepository>, @repository.getter('IngredientesRepository') protected IngredientesRepositoryGetter: Getter<IngredientesRepository>,
  ) {
    super(Pratos, dataSource);
    this.ingredientes = this.createHasManyThroughRepositoryFactoryFor('ingredientes', IngredientesRepositoryGetter, PratosIngredientesRepositoryGetter,);
    this.registerInclusionResolver('ingredientes', this.ingredientes.inclusionResolver);
  }
}
