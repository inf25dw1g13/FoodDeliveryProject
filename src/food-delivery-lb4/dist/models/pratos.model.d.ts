import { Entity } from '@loopback/repository';
import { Ingredientes } from './ingredientes.model';
export declare class Pratos extends Entity {
    id?: number;
    nome: string;
    preco: number;
    descricao?: string;
    disponivel?: boolean;
    vegetariano?: boolean;
    vegan?: boolean;
    sem_gluten?: boolean;
    restaurantesId?: number;
    pedidosId?: number;
    ingredientes: Ingredientes[];
    constructor(data?: Partial<Pratos>);
}
export interface PratosRelations {
}
export type PratosWithRelations = Pratos & PratosRelations;
