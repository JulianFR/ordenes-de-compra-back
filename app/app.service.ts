import { default as express, Request, Response } from 'express';
import corsMiddleware from './middleware/cors.middleware';
import { imprimirPeticionesMiddleware } from './middleware/imprimir-peticiones.middleware';
import { manejarErroresMiddleware } from './middleware/manejar-errores.middleware';
import { requerirJsonMiddleware } from './middleware/requerir-json.middleware';
import { OrdenDeCompraController } from './orden/orden.controller';
import { OrdenDeCompra } from './orden/orden.model';
import { Producto } from './producto/producto.model';
import { Usuario } from './usuario/usuario.model';

function crearPedido(orden: number, producto: number, usuario: number, cantidad?: number) {
  OrdenDeCompra.obtener(orden).agregarPedidoAlProductoPorIndice(producto, Usuario.obtener(usuario).id, cantidad);
}

const configurarRutas = () => (
  express
    .Router()
    .get("/usuarios", (request: Request, response: Response) => response.json(Usuario.usuarios))
    .get("/productos", (request: Request, response: Response) => response.json(Producto.productos))
    .get("/productos/:producto", (request: Request, response: Response) => response.json(request.params.producto.split(", ").map(id => Producto.obtener(+id))))
    .post("/usuarios", (request: Request, response: Response) => response.send(Usuario.agregar(request.body.nombre, request.body.contraseña)))
    .post("/productos", (request: Request, response: Response) => response.send(Producto.agregar(request.body.nombre, request.body.precio)))
    .post("/pedidos", (request: Request, response: Response) => response.send(crearPedido(request.body.orden, request.body.producto, request.body.usuario, request.body.cantidad)))
    .post("/ingresos", requerirJsonMiddleware, (request: Request, response: Response) => {
      const nombre = request.body.nombre;
      const contraseña = request.body.contraseña;

      const usuario = Usuario.usuarios.find(usuario => usuario.nombre === nombre);

      if (!usuario) { throw { estado: 404, mensaje: "Usuario no encontrado" }; }
      if (usuario.contraseña !== contraseña) { throw { estado: 400, mensaje: "Contraseña incorrecta" }; }

      response.sendStatus(200);
    })
);

express()
  .use(corsMiddleware)
  .use(express.json())
  .use(imprimirPeticionesMiddleware)
  .use(new OrdenDeCompraController().enrutador)
  .use(configurarRutas())
  .use(manejarErroresMiddleware)
  .listen(3000);

console.log(`Escuchando en 3000`);