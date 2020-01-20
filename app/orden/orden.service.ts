import { Producto } from "../producto/producto.model";
import { Usuario } from "../usuario/usuario.model";
import { OrdenDeCompra, Resumen } from "./orden.model";

export class OrdenDeCompraService {
  generarResumen(orden: number): Resumen {
    const pedidos: {
      usuario: string;
      productos: {
        producto: string,
        precio: number,
        cantidad: number,
        total: number
      }[],
      total: number
    }[] = [];

    OrdenDeCompra
      .obtener(orden)
      .obtenerProductos()
      .forEach(p => {
        p.pedidos.forEach(pedido => {
          const precio = Producto.obtener(p.producto).precio;
          const cantidad = pedido.cantidad;
          const pedidoNuevo = {
            producto: Producto.obtener(p.producto).nombre,
            precio,
            cantidad,
            total: precio * cantidad
          }

          if (!pedidos[pedido.usuario]) {
            pedidos[pedido.usuario] = {
              usuario: Usuario.obtener(pedido.usuario).nombre,
              productos: [pedidoNuevo],
              total: 0
            };
          } else {
            pedidos[pedido.usuario].productos.push(pedidoNuevo);
          }
        })
      });

    pedidos.forEach(usuario => usuario.total = usuario.productos.reduce((anterior, actual) => anterior + actual.total, 0));

    return {
      pedidos,
      total: pedidos.reduce((anterior, actual) => anterior + actual.total, 0)
    }
  }
}