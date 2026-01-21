const BASE = import.meta.env.BASE_URL;
const img = (p) => `${BASE}${p.replace(/^\/+/, "")}`;

export const invite = {
  couple: "María José Abarzúa Riquelme & Christopher Nicolás Rubiera Larson",
  verse: "“Dos son mejor que uno, porque obtienen más fruto de su esfuerzo.”",
  verseRef: "Eclisiastés 4:9",
  dateLong: "28 de febrero de 2026",
  eventDateISO: "2026-02-28T12:00:00-03:00",
  event: {
    date: "Viernes 28 de febrero de 2026",
    time: "12:00 hrs",
    place: "Campo familiar",
    mapsUrl: "https://maps.app.goo.gl/K4fihCHNPv52Ez6r5",
  },
  music: {
    videoId: "sD9_l3oDOag",
    startSeconds: 18,
  },

  gifts: {
    text:
      "Tu presencia es lo más importante para nosotros.\n\n" +
      "Si deseas hacernos un regalo, preferimos que sea un aporte para comenzar nuestro sueño de construir nuestro hogar y seguir dando pasos en esta nueva etapa de vida, siempre de la mano de Dios.",
    options: [
      { icon: "💛", title: "Aporte libre", amount: null },
    ],
    bank: {
      holder: "María José Abarzúa Riquelme",
      rut: "16285678-2",
      bank: "Mercado Pago",
      accountType: "Cuenta Vista",
      accountNumber: "1097629220",
      email: "mjabarzuar@gmail.com",
    },
    // materialGiftNote:
    // "Si prefieres un regalo material, nos serán muy útiles sábanas de hilo blancas (desde 200 hilos), cobertor blanco y toallas blancas.",
  },

  rsvp: {
    deadlineText:
      "Por favor confirma tu asistencia por el mismo medio que recibiste esta invitacion.",
    url: "",
  },

  access: {
    text:
      "El lugar del matrimonio se encuentra en un sector de cerro.\n\n" +
      "🚗 Vehículos sin tracción 4x4: deberán estacionarse en la parte superior.\n" +
      "🚙 Vehículos 4x4: podrán bajar hasta el estacionamiento habilitado cercano al lugar del evento.\n\n" +
      "Te recomendamos venir con calzado cómodo.",
  },

  celebration:
    "Será al aire libre, en el campo, pensada para compartir, relajarnos y disfrutar juntos.\n\n" +
    "Habrá cóctel, asado, piscina, postres y una celebración durante todo el día.",

  dressCode:
    "Te invitamos a venir con un estilo relajado y cómodo, acorde a una celebración de día en el campo.\n\n" +
    "👔 Hombres: prendas de lino (camisa, pantalón o bermuda), mocasines o calzado cómodo.\n" +
    "👗 Mujeres: vestidos relajados, frescos y adecuados para un entorno natural.\n\n" +
    "La vestimenta es sugerida y opcional; lo más importante es que te sientas cómodo/a.\n\n" +
    "Si deseas disfrutar de la piscina, no olvides traer traje de baño.",

  closing:
    "Gracias por acompañarnos y ser parte de este momento tan importante en nuestras vidas.\n\n¡Te esperamos con mucho cariño!\n\n\n\n Información importante: \n\nEsta invitación es una página web y podrá actualizarse con nueva información. Les recomendamos revisarla periódicamente para estar al tanto de cualquier novedad.",

  gallery: {
    title: "Retratos de nuestro amor",
    photos: [
      { src: img("galeria/1.jpg"), alt: "Retrato 1" },
      { src: img("galeria/2.jpg"), alt: "Retrato 2" },
      { src: img("galeria/3.jpg"), alt: "Retrato 3" },
      // { src: img("galeria/4.jpg"), alt: "Retrato 4" },
      // { src: img("galeria/5.jpg"), alt: "Retrato 5" },
      { src: img("galeria/6.jpg"), alt: "Retrato 6" },
      { src: img("galeria/7.jpg"), alt: "Retrato 7" },
      { src: img("galeria/8.jpg"), alt: "Retrato 8" },
      { src: img("galeria/9.jpg"), alt: "Retrato 9" },
      // { src: img("galeria/10.jpg"), alt: "Retrato 10" },
      { src: img("galeria/11.jpg"), alt: "Retrato 11" },
      // { src: img("galeria/12.jpg"), alt: "Retrato 12" },
      // { src: img("galeria/13.jpg"), alt: "Retrato 13" },
    ],
  },
};
