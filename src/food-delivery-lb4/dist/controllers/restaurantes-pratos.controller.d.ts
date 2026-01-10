import { Count, Filter, Where } from '@loopback/repository';
import { Restaurantes, Pratos } from '../models';
import { RestaurantesRepository } from '../repositories';
export declare class RestaurantesPratosController {
    protected restaurantesRepository: RestaurantesRepository;
    constructor(restaurantesRepository: RestaurantesRepository);
    find(id: number, filter?: Filter<Pratos>): Promise<Pratos[]>;
    create(id: typeof Restaurantes.prototype.id, pratos: Omit<Pratos, 'id'>): Promise<Pratos>;
    patch(id: number, pratos: Partial<Pratos>, where?: Where<Pratos>): Promise<Count>;
    delete(id: number, where?: Where<Pratos>): Promise<Count>;
}
