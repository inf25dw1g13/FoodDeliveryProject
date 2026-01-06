import { DefaultCrudRepository } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { PedidosPratosThrough, PedidosPratosThroughRelations } from '../models';
export declare class PedidosPratosThroughRepository extends DefaultCrudRepository<PedidosPratosThrough, typeof PedidosPratosThrough.prototype.id, PedidosPratosThroughRelations> {
    constructor(dataSource: FooddbDataSource);
}
