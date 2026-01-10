import { Count, Filter, Where } from '@loopback/repository';
import { Restaurantes, Pedidos } from '../models';
import { RestaurantesRepository } from '../repositories';
export declare class RestaurantesPedidosController {
    protected restaurantesRepository: RestaurantesRepository;
    constructor(restaurantesRepository: RestaurantesRepository);
    find(id: number, filter?: Filter<Pedidos>): Promise<Pedidos[]>;
    create(id: typeof Restaurantes.prototype.id, pedidos: Omit<Pedidos, 'id'>): Promise<Pedidos>;
    patch(id: number, pedidos: Partial<Pedidos>, where?: Where<Pedidos>): Promise<Count>;
    delete(id: number, where?: Where<Pedidos>): Promise<Count>;
}
