import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {CategoriasPratos, CategoriasPratosRelations, Pratos, Restaurantes} from '../models';
import {PratosRepository} from './Pratos.repository';
import {RestaurantesRepository} from './Restaurantes.repository';

export class CategoriasPratosRepository extends DefaultCrudRepository<
  CategoriasPratos,
  typeof CategoriasPratos.prototype.id,
  CategoriasPratosRelations
> {

  public readonly pratos: HasManyRepositoryFactory<Pratos, typeof CategoriasPratos.prototype.id>;

  public readonly restaurantes: HasManyRepositoryFactory<Restaurantes, typeof CategoriasPratos.prototype.id>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('PratosRepository') protected pratosRepositoryGetter: Getter<PratosRepository>, @repository.getter('RestaurantesRepository') protected restaurantesRepositoryGetter: Getter<RestaurantesRepository>,
  ) {
    super(CategoriasPratos, dataSource);
    this.restaurantes = this.createHasManyRepositoryFactoryFor('restaurantes', restaurantesRepositoryGetter,);
    this.registerInclusionResolver('restaurantes', this.restaurantes.inclusionResolver);
    this.pratos = this.createHasManyRepositoryFactoryFor('pratos', pratosRepositoryGetter,);
    this.registerInclusionResolver('pratos', this.pratos.inclusionResolver);
  }
}
