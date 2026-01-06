import { Count, Filter, Where } from '@loopback/repository';
import { Restaurantes, Entregas } from '../models';
import { RestaurantesRepository } from '../repositories';
export declare class RestaurantesEntregasController {
    protected restaurantesRepository: RestaurantesRepository;
    constructor(restaurantesRepository: RestaurantesRepository);
    find(id: number, filter?: Filter<Entregas>): Promise<Entregas[]>;
    create(id: typeof Restaurantes.prototype.id, entregas: Omit<Entregas, 'id'>): Promise<Entregas>;
    patch(id: number, entregas: Partial<Entregas>, where?: Where<Entregas>): Promise<Count>;
    delete(id: number, where?: Where<Entregas>): Promise<Count>;
}
