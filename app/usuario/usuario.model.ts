import { validarNumero } from "../validators/validar-numero.validator";
import { validarPalabra } from "../validators/validar-palabra.validator";

export class Usuario {
  static readonly usuarios: Usuario[] = [];

  readonly id: number = Usuario.usuarios.length;

  constructor(public readonly nombre: string, public readonly contraseña: string) {
    validarPalabra("nombre", nombre);
    validarPalabra("contraseña", contraseña);
  }

  static agregar(nombre: string, contraseña: string) {
    validarPalabra("nombre", nombre);
    validarPalabra("contraseña", contraseña);

    Usuario.usuarios.push(new Usuario(nombre, contraseña));
  }

  static obtener(id: number) {
    validarNumero("usuario", id);
    if (id > Usuario.usuarios.length - 1) { throw { estado: 404, mensaje: 'No se encuentra el usuario' }; }

    return Usuario.usuarios[id];
  }

}