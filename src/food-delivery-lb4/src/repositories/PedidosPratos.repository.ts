import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {PedidosPratos, PedidosPratosRelations} from '../models';

export class PedidosPratosRepository extends DefaultCrudRepository<
  PedidosPratos,
  typeof PedidosPratos.prototype.id,
  PedidosPratosRelations
> {
  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource,
  ) {
    super(PedidosPratos, dataSource);
  }
}
