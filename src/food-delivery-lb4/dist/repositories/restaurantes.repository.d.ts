import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { Restaurantes, RestaurantesRelations, Pratos, Pedidos, Entregas } from '../models';
import { PratosRepository } from './pratos.repository';
import { PedidosRepository } from './pedidos.repository';
import { EntregasRepository } from './entregas.repository';
export declare class RestaurantesRepository extends DefaultCrudRepository<Restaurantes, typeof Restaurantes.prototype.id, RestaurantesRelations> {
    protected pratosRepositoryGetter: Getter<PratosRepository>;
    protected pedidosRepositoryGetter: Getter<PedidosRepository>;
    protected entregasRepositoryGetter: Getter<EntregasRepository>;
    readonly pratos: HasManyRepositoryFactory<Pratos, typeof Restaurantes.prototype.id>;
    readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Restaurantes.prototype.id>;
    readonly entregases: HasManyRepositoryFactory<Entregas, typeof Restaurantes.prototype.id>;
    constructor(dataSource: FooddbDataSource, pratosRepositoryGetter: Getter<PratosRepository>, pedidosRepositoryGetter: Getter<PedidosRepository>, entregasRepositoryGetter: Getter<EntregasRepository>);
}
