export function validarPalabra(campo: string, valor: string) {
  let mensaje = "";

  if (!valor || valor.trim().length === 0) { throw { estado: 400, mensaje: `Se espera "${campo}"` }; }

  if (mensaje) { throw { estado: 400, mensaje }; }
}