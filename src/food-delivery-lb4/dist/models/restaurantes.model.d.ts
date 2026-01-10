import { Entity } from '@loopback/repository';
import { Pratos } from './pratos.model';
import { Pedidos } from './pedidos.model';
import { Entregas } from './entregas.model';
export declare class Restaurantes extends Entity {
    id?: number;
    nome: string;
    morada?: string;
    email?: string;
    telefone?: string;
    hora_abertura?: string;
    hora_fecho?: string;
    estado: string;
    descricao?: string;
    taxa_entrega?: number;
    pedido_minimo?: string;
    tempo_medio_preparacao?: string;
    ativo: boolean;
    pratos: Pratos[];
    pedidos: Pedidos[];
    entregases: Entregas[];
    constructor(data?: Partial<Restaurantes>);
}
export interface RestaurantesRelations {
}
export type RestaurantesWithRelations = Restaurantes & RestaurantesRelations;
