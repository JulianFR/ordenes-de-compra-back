import express, { Router } from "express";
import { requerirJsonMiddleware } from "../middleware/requerir-json.middleware";
import { Producto } from "../producto/producto.model";
import { OrdenDeCompra } from "./orden.model";
import { OrdenDeCompraService } from "./orden.service";

export class OrdenDeCompraController {
  readonly enrutador: Router = express.Router();
  readonly servicio: OrdenDeCompraService;

  constructor(ruta: string = "ordenes") {
    this.servicio = new OrdenDeCompraService();

    this.enrutador
      .get(`/${ruta}`, (req, res) => res.json(OrdenDeCompra.ordenesDeCompra))
      .get(`/${ruta}/:orden/resumen`, (req, res) => res.send(this.servicio.generarResumen(+req.params.orden)))
      .post(`/${ruta}`, requerirJsonMiddleware, (req, res) => res.send(OrdenDeCompra.agregar(req.body.nombre, req.body.productos)))
      .post(`/${ruta}/:orden/producto/:producto`, ({ params }, res) => res.send(OrdenDeCompra.obtener(+params.orden).agregarProducto(Producto.obtener(+params.producto).id)))
      .delete(`/${ruta}/:orden/producto/:producto`, ({ params }, res) => res.send(OrdenDeCompra.obtener(+params.orden).quitarProductoPorId(Producto.obtener(+params.producto).id)))
  }
}