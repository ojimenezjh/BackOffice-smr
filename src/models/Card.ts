import { Title } from '@angular/platform-browser';

export interface Card {
    id_carta: number;
    nombre: string;
    descripcion?: string;
    hora_inicio?: string;
    hora_fin?: string;
    imagen?: string;
    posicion: number;

}