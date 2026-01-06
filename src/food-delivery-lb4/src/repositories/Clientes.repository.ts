import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Clientes, ClientesRelations, Pedidos} from '../models';
import {PedidosRepository} from './Pedidos.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id,
  ClientesRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Clientes.prototype.id>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Clientes, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
