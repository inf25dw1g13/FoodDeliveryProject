import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Pratos, PedidosPratos} from '../models';
import {PedidosPratosRepository} from './PedidosPratos.repository';
import {PratosRepository} from './Pratos.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.id,
  PedidosRelations
> {

  public readonly pratos: HasManyThroughRepositoryFactory<Pratos, typeof Pratos.prototype.id,
          PedidosPratos,
          typeof Pedidos.prototype.id
        >;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('PedidosPratosRepository') protected pedidosPratosRepositoryGetter: Getter<PedidosPratosRepository>, @repository.getter('PratosRepository') protected pratosRepositoryGetter: Getter<PratosRepository>,
  ) {
    super(Pedidos, dataSource);
    this.pratos = this.createHasManyThroughRepositoryFactoryFor('pratos', pratosRepositoryGetter, pedidosPratosRepositoryGetter,);
    this.registerInclusionResolver('pratos', this.pratos.inclusionResolver);
  }
}
