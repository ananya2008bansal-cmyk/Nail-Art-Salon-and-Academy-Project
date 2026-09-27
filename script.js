const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menu?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    const select = document.querySelector("#service");
    if (select) select.value = service;
  });
});

document.querySelector("#bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const service = document.querySelector("#service").value;
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const message = document.querySelector("#message").value.trim();

  const readableDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    : "";

  // Build the complete WhatsApp message first, then encode the entire
  // message once. This preserves spaces, line breaks, emojis and all
  // entered booking details reliably on WhatsApp.
  const whatsappMessage =
`Hello Nail Art Salon & Academy! 💅

*Appointment Request*

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${readableDate}
Preferred time: ${time}
Message: ${message || "None"}

Please let me know if this slot is available.`;

  const whatsappUrl =
    `https://wa.me/919875693596?text=${encodeURIComponent(whatsappMessage)}`;

  // Direct navigation is more reliable than window.open on mobile,
  // where popup blocking can prevent WhatsApp from opening correctly.
  window.location.href = whatsappUrl;
});
