/**
 * Ejecuta esta función UNA vez para autorizar MailApp.
 * Google te pedirá permiso para enviar emails desde tu cuenta.
 * Después, el trigger del form ya podrá enviarlos automáticamente.
 */
function testEmail() {
  const TO = "oficiall.drizzt@gmail.com";
  MailApp.sendEmail({
    to: TO,
    subject: "✓ Test del form de Drizzt Design — funciona",
    body: "Si recibes este email, el trigger ya tiene permiso para enviar.\n\n" +
          "A partir de ahora, cada respuesta del form de drizzt-design.vercel.app\n" +
          "te llegará automáticamente a esta dirección.\n\n" +
          "Puedes borrar este script de Apps Script si quieres."
  });
  console.log("Email enviado a " + TO + ". Revisa la bandeja (y spam).");
}
