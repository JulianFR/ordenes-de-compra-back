export function validarNumero(campo: string, valor: number) {
  let mensaje = "";

  if (valor === null || valor === undefined) { mensaje = `Se espera "${campo}"`; }
  if (isNaN(valor)) { mensaje = `Se espera un número en "${campo}"`; }

  if (mensaje) { throw { estado: 400, mensaje }; }
}
