import { Title } from '@angular/platform-browser';

export interface Product {
    id_producto: number;
    imagen?: string;
    producto?: string;
    familia?: string;
    tipoveg: number;
    gluten: boolean;
    descripcion: string;
    posicion: number;
    precio?: number;
}

export interface CartaProducto{
    id_carta: number;
    id_producto: string;
}