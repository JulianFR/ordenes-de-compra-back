import { Producto } from "../producto/producto.model";
import { validarNumero } from "../validators/validar-numero.validator";
import { validarPalabra } from "../validators/validar-palabra.validator";

export class OrdenDeCompra {
  static ordenesDeCompra: OrdenDeCompra[] = [];

  readonly id: number = OrdenDeCompra.ordenesDeCompra.length;

  private readonly productos: OrdenProducto[] = [];

  constructor(public nombre: string, productos?: number[]) {
    validarPalabra("nombre", nombre);

    productos?.forEach(producto => this.productos.push(new OrdenProducto(Producto.obtener(producto).id)));
  }

  obtenerProductoPorId(id: number) {
    let productoBuscado = this.productos.find(p => p.producto === id);

    if (!productoBuscado) { throw { estado: 404, mensaje: 'No se encuentra el producto en la orden' }; }

    return productoBuscado;
  }

  obtenerProductoPorIndice(indice: number) {
    if (indice > this.productos.length - 1) { throw { estado: 404, mensaje: 'No se encuentra el producto en la orden' }; }

    return this.productos[indice];
  }

  obtenerProductos() {
    return this.productos.filter(producto => !producto.baja);
  }

  agregarProducto(producto: number) {
    try {
      this.obtenerProductoPorId(producto).agregar();
    } catch (error) {
      if (error.estado === 404) { this.productos.push(new OrdenProducto(producto)); }
    }
  }

  agregarPedidoAlProductoPorIndice(productoIndice: number, usuario: number, cantidad: number = 1) {
    this.obtenerProductoPorIndice(productoIndice).agregarPedido(usuario, cantidad);
  }

  agregarPedidoAlProductoPorId(usuario: number, id: number, cantidad: number = 1) {
    this.obtenerProductoPorId(id).agregarPedido(usuario, cantidad);
  }

  quitarProductoPorId(producto: number) {
    this.obtenerProductoPorId(producto).quitar();
  }

  static agregar(nombre: string, productos?: number[]) {
    OrdenDeCompra.ordenesDeCompra.push(new OrdenDeCompra(nombre, productos));
  }

  static obtener(id: number) {
    validarNumero("orden", id);
    if (id > OrdenDeCompra.ordenesDeCompra.length - 1) { throw { estado: 400, mensaje: 'No se encuentra la orden' }; }

    return OrdenDeCompra.ordenesDeCompra[id];
  }
}

class OrdenProducto {
  producto: number;
  baja?: Date;
  pedidos: { usuario: number, cantidad: number }[] = []

  constructor(producto: number) {
    this.producto = producto;
  }

  agregarPedido(usuario: number, cantidad: number) {
    if (this.pedidos.find(pedido => pedido.usuario === usuario)) { throw { estado: 400, mensaje: 'Ya existe un pedido para este usuario' }; }

    this.pedidos.push({ usuario, cantidad });
  }

  agregar() {
    if (!this.baja) throw { estado: 400, mensaje: 'El producto ya se encuentra en la orden' };

    delete this.baja;
  }

  quitar() {
    if (this.baja) { throw { estado: 400, mensaje: 'El producto ya se encuentra dado de baja' }; }

    this.baja = new Date();
  }
}

export interface Resumen {
  pedidos: {
    usuario: string;
    productos: {
      producto: string,
      precio: number,
      cantidad: number,
      total: number
    }[],
    total: number
  }[],
  total: number
}
