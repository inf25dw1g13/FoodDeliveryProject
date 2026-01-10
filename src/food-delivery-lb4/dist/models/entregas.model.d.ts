import { Entity } from '@loopback/repository';
export declare class Entregas extends Entity {
    id?: number;
    tempo_estimado_min?: number;
    tempo_real_min?: number;
    hora_entrega?: string;
    estado?: string;
    restaurantesId?: string;
    constructor(data?: Partial<Entregas>);
}
export interface EntregasRelations {
}
export type EntregasWithRelations = Entregas & EntregasRelations;
