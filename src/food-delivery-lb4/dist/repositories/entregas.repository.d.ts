import { DefaultCrudRepository } from '@loopback/repository';
import { FooddbDataSource } from '../datasources';
import { Entregas, EntregasRelations } from '../models';
export declare class EntregasRepository extends DefaultCrudRepository<Entregas, typeof Entregas.prototype.id, EntregasRelations> {
    constructor(dataSource: FooddbDataSource);
}
