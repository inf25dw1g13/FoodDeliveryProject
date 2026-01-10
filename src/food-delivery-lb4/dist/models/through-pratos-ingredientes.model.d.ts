import { Entity } from '@loopback/repository';
export declare class ThroughPratosIngredientes extends Entity {
    id?: number;
    quantidade?: string;
    obrigatorio?: boolean;
    pratosId?: number;
    ingredientesId?: number;
    constructor(data?: Partial<ThroughPratosIngredientes>);
}
export interface ThroughPratosIngredientesRelations {
}
export type ThroughPratosIngredientesWithRelations = ThroughPratosIngredientes & ThroughPratosIngredientesRelations;
