import { validarNumero } from "../validators/validar-numero.validator";
import { validarPalabra } from "../validators/validar-palabra.validator";

export class Producto {
  static productos: Producto[] = [];

  readonly id: number = Producto.productos.length;

  constructor(public readonly nombre: string, public readonly precio: number) {
    validarPalabra("nombre", nombre);
    validarNumero("precio", precio);
  }

  static obtener(id: number) {
    validarNumero("producto", id);
    if (id > Producto.productos.length - 1) { throw { estado: 404, mensaje: 'No se encuentra el producto' }; }

    return Producto.productos[id];
  }

  static agregar(nombre: string, precio: number) {
    Producto.productos.push(new Producto(nombre, precio));
  }
}