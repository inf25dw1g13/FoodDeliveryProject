import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { Pedidos, PedidosRelations, Pratos, PedidosPratosThrough } from '../models';
import { PedidosPratosThroughRepository } from './pedidos-pratos-through.repository';
import { PratosRepository } from './pratos.repository';
export declare class PedidosRepository extends DefaultCrudRepository<Pedidos, typeof Pedidos.prototype.id, PedidosRelations> {
    protected pedidosPratosThroughRepositoryGetter: Getter<PedidosPratosThroughRepository>;
    protected pratosRepositoryGetter: Getter<PratosRepository>;
    readonly pratos: HasManyThroughRepositoryFactory<Pratos, typeof Pratos.prototype.id, PedidosPratosThrough, typeof Pedidos.prototype.id>;
    constructor(dataSource: FooddbDataSource, pedidosPratosThroughRepositoryGetter: Getter<PedidosPratosThroughRepository>, pratosRepositoryGetter: Getter<PratosRepository>);
}
