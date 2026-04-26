/**
 * Auto-setup de Google Form para "Drizzt Design — Contacto"
 *
 * Cómo usar:
 *   1. Pega TODO este archivo en https://script.google.com (New project)
 *   2. Click en "Run" (selecciona setupForm)
 *   3. Autoriza los permisos cuando Google los pida
 *   4. En el "Execution log" (View → Logs) verás un JSON. Cópialo entero.
 *   5. Pégalo de vuelta en Claude Code.
 */

function setupForm() {
  const FORM_TITLE       = "Drizzt Design — Contacto";
  const FORM_DESCRIPTION = "Formulario de contacto desde drizzt-design.vercel.app";
  const NOTIFY_EMAIL     = "oficiall.drizzt@gmail.com";

  const FIELDS = [
    { key: "NOMBRE",      title: "Nombre",                 type: "text",      required: true  },
    { key: "EMPRESA",     title: "Empresa o estudio",      type: "text",      required: false },
    { key: "EMAIL",       title: "Email",                  type: "text",      required: true  },
    { key: "TIPO",        title: "¿Qué necesitas?",        type: "list",      required: false,
      choices: ["Web nueva desde cero", "Rebuild de web existente", "Mantenimiento mensual", "Solo SEO técnico", "Otro / consulta"] },
    { key: "PRESUPUESTO", title: "Presupuesto orientativo", type: "list",     required: false,
      choices: ["< 1.000 €", "1.000 - 3.000 €", "3.000 - 6.000 €", "6.000 - 10.000 €", "> 10.000 €", "Aún no lo sé"] },
    { key: "MENSAJE",     title: "Mensaje",                type: "paragraph", required: true  }
  ];

  // ---- Crear el form ----
  const form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION);
  form.setCollectEmail(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage("¡Gracias! Te respondo en menos de 24 horas.");

  // ---- Añadir los campos en orden ----
  const items = [];
  FIELDS.forEach(function (field) {
    let item;
    switch (field.type) {
      case "text":
        item = form.addTextItem();
        break;
      case "paragraph":
        item = form.addParagraphTextItem();
        break;
      case "list":
        item = form.addListItem();
        item.setChoices(field.choices.map(function (c) { return item.createChoice(c); }));
        break;
      default:
        throw new Error("Tipo de campo no soportado: " + field.type);
    }
    item.setTitle(field.title);
    if (field.required) item.setRequired(true);
    items.push({ key: field.key, item: item });
  });

  // ---- Trigger automático para enviar email cuando alguien responde ----
  ScriptApp.newTrigger("onFormSubmitNotify")
    .forForm(form)
    .onFormSubmit()
    .create();
  PropertiesService.getScriptProperties().setProperty("NOTIFY_EMAIL", NOTIFY_EMAIL);

  // ---- Sacar entry IDs vía URL pre-rellenada ----
  const fakeResponse = form.createResponse();
  items.forEach(function (entry) {
    const item = entry.item;
    let itemResponse;
    if (item.getType() === FormApp.ItemType.TEXT) {
      itemResponse = item.asTextItem().createResponse("ENTRY_" + entry.key);
    } else if (item.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
      itemResponse = item.asParagraphTextItem().createResponse("ENTRY_" + entry.key);
    } else if (item.getType() === FormApp.ItemType.LIST) {
      const choices = item.asListItem().getChoices();
      itemResponse = item.asListItem().createResponse(choices[0].getValue());
    }
    fakeResponse.withItemResponse(itemResponse);
  });
  const prefilledUrl = fakeResponse.toPrefilledUrl();

  const entryMap = {};
  items.forEach(function (entry) {
    if (entry.item.getType() === FormApp.ItemType.LIST) {
      // Para listas el valor en URL es la opción seleccionada, busco por título del item
      // Truco: regex genérico que captura el entry.NUMBER seguido del valor de la primera choice
      const firstChoice = entry.item.asListItem().getChoices()[0].getValue();
      const re = new RegExp("entry\\.(\\d+)=" + encodeURIComponent(firstChoice).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      const match = prefilledUrl.match(re);
      if (match) entryMap[entry.key] = match[1];
    } else {
      const re = new RegExp("entry\\.(\\d+)=ENTRY_" + entry.key);
      const match = prefilledUrl.match(re);
      if (match) entryMap[entry.key] = match[1];
    }
  });

  // ---- Salida ----
  const result = {
    form_id:        form.getId(),
    edit_url:       form.getEditUrl(),
    published_url:  form.getPublishedUrl(),
    notify_email:   NOTIFY_EMAIL,
    entries:        entryMap
  };

  console.log("");
  console.log("══════════════════════════════════════════════════════════");
  console.log("  COPIA ESTE JSON Y PÉGALO EN CLAUDE CODE:");
  console.log("══════════════════════════════════════════════════════════");
  console.log(JSON.stringify(result, null, 2));
  console.log("══════════════════════════════════════════════════════════");

  return result;
}

/**
 * Trigger: envía email al recibir respuesta del form. NO BORRAR.
 */
function onFormSubmitNotify(e) {
  const notifyEmail = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL");
  if (!notifyEmail) return;

  const items = e.response.getItemResponses();
  let body = "Nuevo mensaje desde el formulario de drizzt-design.vercel.app:\n\n";
  items.forEach(function (it) {
    body += "• " + it.getItem().getTitle() + ":\n  " + it.getResponse() + "\n\n";
  });
  body += "—\nVer todas las respuestas: " + e.source.getEditUrl().replace("/edit", "/responses");

  MailApp.sendEmail({
    to: notifyEmail,
    subject: "📩 Nuevo mensaje en Drizzt Design — " + (e.response.getItemResponses()[0] ? e.response.getItemResponses()[0].getResponse() : "Anónimo"),
    body: body
  });
}
