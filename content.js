// Contenido editable del juego. Cambiá textos acá sin tocar el motor.
window.MQ_CONTENT = {
  titulo: "MATI",
  subtitulo: "Ingeniero de Tesoros",
  // Intro: Gaby explica el juego y con quién empezar
  intro: [
    "Mi amor. Este mapa es tu vida. Cuatro mundos: Don Orione, Nuevos Horizontes, España y nuestra casa.",
    "Cada persona que encuentres guardó un tesoro para vos: un recuerdo y algo que admira de vos. Y cada lugar tiene una historia.",
    "Te van a ir diciendo a quién buscar. El último de cada mundo te da un superpoder, y con eso aparece la puerta al siguiente.",
    "Con B abrís la mochila: ahí ves a quién te toca, tus tesoros y tus insignias. Si mantenés B mientras caminás, corrés.",
    "Yo te espero al final, en casa. Empezá por tu mamá: Adri te está esperando cerca de la casa de Don Orione.",
  ],
  // Trivia de la Verdad y la Palabra (Mundo 1, la da Luis)
  trivia: [
    { q: "¿Qué vale más que un regalo caro?", a: ["La intención", "El envoltorio", "El precio"], ok: 0 },
    { q: "Si diste tu palabra, ¿qué hacés?", a: ["La cumplís", "Depende", "La renegociás"], ok: 0 },
    { q: "¿Cuál es tu mayor logro?", a: ["Un ascenso", "Tu casa y tu familia", "Un auto"], ok: 1 },
    { q: "¿Cómo se mejora?", a: ["De golpe", "Un poquito cada día", "Con suerte"], ok: 1 },
    { q: "¿Qué hace un buen analista?", a: ["Adivina", "Pregunta y mide", "Opina fuerte"], ok: 1 },
  ],
  // Rompecabezas de lógica (Mundo 3, lo da Pablo): secuencia a repetir con el D-pad
  logica: { rondas: 4, largoInicial: 3 },
  // Textos de cierre (Mundo 4)
  // Lo que dice Toto si le hablás de frente
  toto: ["¡Guau!", "¡Guau guau!", "(Mueve la cola.)", "(Te mira fijo. Quiere comida.)"],
  // Frases cuando volvés a hablar con alguien que ya te dio su tesoro (se elige una al azar)
  segundaVez: ["Ya te di mi tesoro. Guardalo bien.", "¿Seguís acá? Andá a buscar a los demás.", "Un poquito mejor cada día, ¿no?", "Dale, que Toto se aburre."],
  // Frase propia por personaje para la segunda charla. Clave = id del personaje.
  manas: {
    NPC_MAMADRI: "Comé algo, Cuchi.",
    NPC_PAPALUIS: "Cumplí tu palabra. Es lo único que te pido.",
    NPC_TIALILI: "Y dejá de decir que tengo cara de seria.",
    NPC_TIOMARTIN: "¿Qué le dice un ingeniero a otro? Nada. Se mandan un mail.",
    NPC_TIAALICIA: "Toto me pidió que te diga que le des más premios. Y que lo lleves a visitarme.",
    NPC_SUEGRAMATI: "Mati, pero la original soy yo. ¿Ya cenaron, mi hijo?",
    NPC_SUEGROALE: "Dios te bendiga, papá. Siempre. Cuídame a mi Gabiota.",
    NPC_GERAR: "Es un enchufe nada más, chamo. Y un grifo. Y la puerta. Y...",
    NPC_CANETE: "Lo del colegio no me lo olvido. En serio.",
    NPC_BRIAN: "El honor es tuyo. Por ahora.",
    NPC_CAMI: "Ya te lo dije. No lo repito.",
    NPC_GIGI: "Yo organizo la próxima. Vos traé el mate.",
    NPC_VICTOR: "¿Este finde? Dale, llevo las herramientas.",
    NPC_NOE: "Ahora sí la reinicié. Sigue igual. ¿Vos qué sabés?",
    NPC_KIARA: "Las uñas no se negocian.",
    NPC_TOMI: "...",
    NPC_PABLO: "Te llamo yo. Bueno, te escribo. Bueno, mandame vos.",
    NPC_DIEGO: "En España te espero. Ya sabés dónde.",
    NPC_SOFI: "Avisá cuando vuelvan, así hacemos pizzas.",
    NPC_SUSI: "Siempre estoy. Aunque no me veas.",
    NPC_MATEO: "¿Y ahora jugamos?",
    NPC_JESUS: "Que no, hombre, que no. Bueno, que sí. Venga.",
    NPC_SUYI: "El tablero de ventas... ¿era el azul o el verde?",
    NPC_GABY: "Llegaste.",
  },
  // Juego de Luis: discurso interminable; hay que apretar A rápido para callarlo
  luis: {
    discurso: ["El trabajo duro, hijo, es lo único que no te pueden sacar.", "Cuando yo tenía tu edad me levantaba a las cinco...", "...y no había feriado que valga, ni domingo, ni...", "...y tu abuelo, que en paz descanse, decía siempre que...", "...porque el que no trabaja, no come, y el que no...", "...y otra cosa: el norte. Nunca perdés el norte, porque el norte...", "...y ahora que lo pienso, hay otra cosa que te quería decir sobre...", "...aunque, pensándolo bien, lo más importante de todo es..."],
    callado: "Bueno, bueno. Ya entendí. Feliz cumple, hijo. Te quiero.",
    sigue: "...¿decías algo? No, dejame terminar. Y no aflojes, que si aflojás sigo.",
    toques: 16, ms: 2400
  },
  // Toto: tirarle la pelotita en la Base Central
  toto_juego: { intro: ["Toto trajo la pelotita.", "Mantené la vista en la barra: apretá A para cargar y otra vez A para soltar. La pelota tiene que caer en el círculo amarillo, donde Toto la espera."], gana: "Dos de tres o mejor. Toto está feliz. Vos también.", pierde: "Toto igual te la trae. Siempre." },
  // Conectores naturales para el recuerdo y la cualidad (se elige uno por personaje)
  recuerdoIntro: ["Te tengo un recuerdo.", "Me acuerdo de algo con vos.", "¿Te acordás de esto?", "Hay algo que no me olvido."],
  admiroIntro: ["Y hay algo que admiro de vos.", "Te digo lo que más admiro de vos.", "Una cosa más, y en serio.", "Y esto lo pienso siempre de vos."],
  // Frases de la cadena guiada
  cadena: {
    siguienteNpc: ["Ahora buscá a {n}.", "Andá a hablar con {n}, te está esperando.", "El que sigue es {n}.", "Seguí con {n}."],
    siguienteLugar: ["Ahora andá a ver {n}.", "Pasá por {n} antes de seguir.", "Te falta ver {n}."],
    todaviaNo: "Todavía no. Primero {n}.",
    ultimo: "Ya hablaste con todos por acá. Ahora buscá la puerta.",
  },
  // Cuando volvés a hablar con alguien que ya te dio su tesoro
  yaHablado: "Ya te conté lo mío, ya lo sabés.",
  // Cuando volvés a un lugar que ya leíste
  yaLeido: "Este lugar ya lo conocés. Y sabés lo que significa.",
  // Toto al entrar a la Base Central
  totoLlega: "¡Guau! ¡Quiero jugar!",
  // Frase de Adri después del beso
  beso: "Mi Cuchi Cuchi hermoso.",
  // Pádel táctico (Diego): situación, opciones, índice de la correcta, respuesta si acierta / si falla
  padel: [
    { q: "Te tiran un globo alto al fondo. Llegás justo.", a: ["Bandeja controlada", "Remate a la reja", "Dejada"], ok: 0, si: "Eso. Control antes que fuerza.", no: "Con fuerza la regalás. Bandeja, siempre." },
    { q: "Estás en la red y la pelota te llega baja, a los pies.", a: ["Remate", "Volea suave al fondo", "Globo"], ok: 1, si: "Bien. Baja y profunda, que no puedan atacar.", no: "Desde abajo no se remata. Volea suave al fondo." },
    { q: "Los dos rivales están pegados a la red, esperando.", a: ["Pelota fuerte al medio", "Dejada", "Globo por arriba"], ok: 2, si: "Exacto. Si están adelante, por arriba.", no: "Están en la red: los pasás por arriba con un globo." },
    { q: "La pelota pica y va derecho a la pared de fondo.", a: ["Esperás el rebote y le pegás", "Corrés a pegarle antes", "La dejás pasar"], ok: 0, si: "Paciencia. El vidrio es tu amigo.", no: "En pádel la pared juega para vos. Esperá el rebote." },
    { q: "Punto largo. Tu rival mira la pelota y no a vos.", a: ["Globo defensivo", "Víbora al rincón", "Remate por 3"], ok: 1, si: "Ahí está: cuando no te miran, definís al rincón.", no: "Si no te mira, castigás al rincón. Víbora." },
  ],
  creditos: {
    intro: "Este juego lo hicieron, con sus recuerdos y enseñanzas, las personas de su vida:",
    cierre: "Idea, dirección y producción: Gaby.",
    final: "Gracias por jugar. Feliz cumple, Mati.",
  },
  final: {
    gaby: [
      "Recorriste todo el mapa. Cada persona que hablaste dejó algo real acá adentro.",
      "Sus mensajes para lo que viene no te los doy yo: están en el buzón, a la derecha. Andá a buscarlos.",
      "Y antes de eso, no te olvides de ver qué hay en la casa. Y jugá con Toto, que te está esperando.",
      "Yo también tengo un mensaje. Ese te lo digo en persona.",
    ],
    fotoTitulo: "Sus mensajes para lo que viene. Tocá a cada uno.",
  },
};
