import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Entregas, EntregasRelations, Pedidos} from '../models';
import {PedidosRepository} from './Pedidos.repository';

export class EntregasRepository extends DefaultCrudRepository<
  Entregas,
  typeof Entregas.prototype.id,
  EntregasRelations
> {
  public readonly pedido: BelongsToAccessor<Pedidos, typeof Entregas.prototype.id>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource,
    @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Entregas, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidosRepositoryGetter);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
