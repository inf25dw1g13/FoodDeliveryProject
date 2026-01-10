import { Entity } from '@loopback/repository';
export declare class Ingredientes extends Entity {
    id?: number;
    nome: string;
    tipo: string;
    alergeno?: boolean;
    pratosId?: number;
    constructor(data?: Partial<Ingredientes>);
}
export interface IngredientesRelations {
}
export type IngredientesWithRelations = Ingredientes & IngredientesRelations;
