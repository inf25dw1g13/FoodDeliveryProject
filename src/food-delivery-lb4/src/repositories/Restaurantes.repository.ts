import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Restaurantes, RestaurantesRelations, Pratos, Pedidos, Entregas} from '../models';
import {PratosRepository} from './Pratos.repository';
import {PedidosRepository} from './Pedidos.repository';
import {EntregasRepository} from './Entregas.repository';

export class RestaurantesRepository extends DefaultCrudRepository<
  Restaurantes,
  typeof Restaurantes.prototype.id,
  RestaurantesRelations
> {

  public readonly pratos: HasManyRepositoryFactory<Pratos, typeof Restaurantes.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Restaurantes.prototype.id>;

  public readonly entregases: HasManyRepositoryFactory<Entregas, typeof Restaurantes.prototype.id>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('PratosRepository') protected pratosRepositoryGetter: Getter<PratosRepository>, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>, @repository.getter('EntregasRepository') protected entregasRepositoryGetter: Getter<EntregasRepository>,
  ) {
    super(Restaurantes, dataSource);
    this.entregases = this.createHasManyRepositoryFactoryFor('entregas', entregasRepositoryGetter,);
    this.registerInclusionResolver('entregas', this.entregases.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.pratos = this.createHasManyRepositoryFactoryFor('pratos', pratosRepositoryGetter,);
    this.registerInclusionResolver('pratos', this.pratos.inclusionResolver);
  }
}
