import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { Clientes, ClientesRelations, Pedidos } from '../models';
import { PedidosRepository } from './pedidos.repository';
export declare class ClientesRepository extends DefaultCrudRepository<Clientes, typeof Clientes.prototype.id, ClientesRelations> {
    protected pedidosRepositoryGetter: Getter<PedidosRepository>;
    readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Clientes.prototype.id>;
    constructor(dataSource: FooddbDataSource, pedidosRepositoryGetter: Getter<PedidosRepository>);
}
