(function () {
  const whatsappPhone = "237693943164";
  const form = document.querySelector("[data-whatsapp-contact]");

  if (!form) {
    return;
  }

  form.dataset.whatsappReady = "true";
  form.dataset.whatsappPhone = whatsappPhone;

  function valueOf(fieldName) {
    const field = form.elements[fieldName];
    return field ? field.value.trim() : "";
  }

  function buildWhatsAppMessage(data) {
    return [
      "Bonjour, je vous contacte depuis votre site web.",
      "",
      `Nom complet : ${data.name}`,
      `Email : ${data.email}`,
      `Sujet : ${data.subject}`,
      "",
      "Message :",
      data.message,
      "",
      "Merci.",
    ].join("\n");
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const message = buildWhatsAppMessage({
      name: valueOf("name"),
      email: valueOf("email"),
      subject: valueOf("subject"),
      message: valueOf("message"),
    });

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  });

  window.afamodecContact = {
    buildWhatsAppMessage,
    buildWhatsAppUrl,
  };
})();
