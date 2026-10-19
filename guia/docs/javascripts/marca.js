// Material expone el buscador como diálogo sin nombre accesible.
document.querySelector(".md-search")?.setAttribute("aria-label", "Buscar");

// Clips de la guía: con movimiento reducido no se reproducen solos; se muestra el póster y un botón para verlos.
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".clip video").forEach((video) => {
  if (!sinMovimiento.matches) return;
  video.autoplay = false;
  video.removeAttribute("autoplay");
  video.pause();
  video.load();
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "clip__reproducir";
  boton.textContent = "Reproducir";
  boton.setAttribute("aria-label", `Reproducir: ${video.getAttribute("aria-label") ?? "clip"}`);
  boton.addEventListener("click", () => {
    video.controls = true;
    video.play();
    boton.remove();
  });
  video.after(boton);
});
