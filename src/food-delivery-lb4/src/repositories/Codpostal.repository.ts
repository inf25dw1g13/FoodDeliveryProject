import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Codpostal, CodpostalRelations, Clientes, Restaurantes, Entregadores} from '../models';
import {ClientesRepository} from './Clientes.repository';
import {RestaurantesRepository} from './Restaurantes.repository';
import {EntregadoresRepository} from './Entregadores.repository';

export class CodpostalRepository extends DefaultCrudRepository<
  Codpostal,
  typeof Codpostal.prototype.codpostal,
  CodpostalRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Clientes, typeof Codpostal.prototype.codpostal>;

  public readonly restaurantes: HasManyRepositoryFactory<Restaurantes, typeof Codpostal.prototype.codpostal>;

  public readonly entregadores: HasManyRepositoryFactory<Entregadores, typeof Codpostal.prototype.codpostal>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('RestaurantesRepository') protected restaurantesRepositoryGetter: Getter<RestaurantesRepository>, @repository.getter('EntregadoresRepository') protected entregadoresRepositoryGetter: Getter<EntregadoresRepository>,
  ) {
    super(Codpostal, dataSource);
    this.entregadores = this.createHasManyRepositoryFactoryFor('entregadores', entregadoresRepositoryGetter,);
    this.registerInclusionResolver('entregadores', this.entregadores.inclusionResolver);
    this.restaurantes = this.createHasManyRepositoryFactoryFor('restaurantes', restaurantesRepositoryGetter,);
    this.registerInclusionResolver('restaurantes', this.restaurantes.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
