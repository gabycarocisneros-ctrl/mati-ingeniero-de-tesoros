window.MQ_MAPS = {
 "tile": 16,
 "cols": 20,
 "rows": 15,
 "orden": [
  "mundo1",
  "mundo2",
  "mundo3",
  "mundo4"
 ],
 "mundos": {
  "mundo1": {
   "nombre": "Don Orione",
   "entrada": [
    2,
    12
   ],
   "palette": {
    "G": "#7cb96b",
    "P": "#d9c58a",
    "T": "#2f6b3a",
    "H": "#b5654a",
    "W": "#4a90d9",
    "D": "#f2d94e"
   },
   "superpoder": "escudo_palabra",
   "mapa": [
    "TTTTTTTTTTTTTTTTTTTT",
    "TGGGGGGGGGGGGGGGGGGT",
    "TGGGGGGGGGGGGGGGGGDT",
    "TGGGGGGGGGGGGGGGGGGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPGGGGGGGGWWGGGGPGT",
    "TGPPPPPPPPPWWPPPPPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGGGT",
    "TTTTTTTTTTTTTTTTTTTT"
   ],
   "edificios": [
    {
     "id": "monoblock",
     "tipo": "monoblock",
     "x": 2,
     "y": 1,
     "w": 5,
     "h": 3,
     "nombre": "Casa de Don Orione",
     "texto": [
      "Acá dormía Brian cuando se quedaba, y acá planearon la travesura de atarle los pies a Luis a la cama mientras dormía. Todavía se cuenta en las juntadas.",
      "Una casa no es el edificio: es quién te espera adentro. Acá te esperaron siempre."
     ]
    },
    {
     "id": "colegio",
     "tipo": "colegio",
     "x": 12,
     "y": 1,
     "w": 6,
     "h": 3,
     "nombre": "Colegio del Sol",
     "texto": [
      "Colegio del Sol.",
      "Acá conociste a Cañete. Él repetía el año y vos te sentaste a estudiar con él hasta que aprobó. Fue tu primer alumno, mucho antes de que explicaras tableros.",
      "Acá aprendiste que la palabra se cumple, y que ayudar a otro también es aprobar."
     ]
    },
    {
     "id": "campito",
     "tipo": "campito",
     "x": 2,
     "y": 8,
     "w": 7,
     "h": 5,
     "nombre": "El campito",
     "bloquea": false,
     "texto": [
      "El campito. Potrero oficial de Don Orione.",
      "Acá no podías dar dos pasos con la pelota. Y volviste. Y volviste. Hasta que un día jugabas como un profesional, aunque los partidos con los primos siguieran siendo polémicos.",
      "Acá aprendiste el valor de la constancia: el que vuelve, mejora. Cañete te espera para unos penales."
     ]
    }
   ],
   "puerta": [
    18,
    2
   ],
   "cadena": [
    [
     "npc",
     "NPC_MAMADRI"
    ],
    [
     "lugar",
     "monoblock"
    ],
    [
     "npc",
     "NPC_PAPALUIS"
    ],
    [
     "npc",
     "NPC_TIALILI"
    ],
    [
     "npc",
     "NPC_TIOMARTIN"
    ],
    [
     "lugar",
     "colegio"
    ],
    [
     "npc",
     "NPC_CANETE"
    ],
    [
     "lugar",
     "campito"
    ],
    [
     "npc",
     "NPC_TIAALICIA"
    ],
    [
     "npc",
     "NPC_SUEGRAMATI"
    ],
    [
     "npc",
     "NPC_SUEGROALE"
    ],
    [
     "npc",
     "NPC_GERAR"
    ],
    [
     "npc",
     "NPC_SUSI"
    ],
    [
     "npc",
     "NPC_VALEN"
    ]
   ]
  },
  "mundo2": {
   "nombre": "Nuevos Horizontes",
   "entrada": [
    2,
    12
   ],
   "palette": {
    "G": "#8fc97a",
    "P": "#e8e2c8",
    "T": "#4a5566",
    "H": "#6b7b8c",
    "W": "#f4f4f4",
    "D": "#f2d94e"
   },
   "superpoder": "reflejos",
   "mapa": [
    "TTTTTTTTTTTTTTTTTTTT",
    "THHHHHHGGGGGGGHHHHHT",
    "TDGGGGGGGGGGGGGGGGGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPGWWWWWGGWWWWWGPGT",
    "TGPGWGGGGGGGGGGWGPGT",
    "TGPGWGGGGGGGGGGWGPGT",
    "TGPGWGGGGGGGGGGWGPGT",
    "TGPGWWWWWWWWWWWWGPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "THHHHHHHHHHHHHHHGGGT",
    "TTTTTTTTTTTTTTTTTTTT"
   ],
   "estilo": {
    "W": "linea",
    "T": "pared",
    "flores": false
   },
   "edificios": [
    {
     "id": "utn",
     "tipo": "utn",
     "x": 7,
     "y": 0,
     "w": 6,
     "h": 3,
     "nombre": "UTN",
     "texto": [
      "Universidad Tecnológica Nacional.",
      "Te mudaste a Capital con una mochila y un plan. Luis te preguntó si ibas a seguir estudiando y elegiste este camino. Tu tía Alicia se acuerda del esmero para cursar, y de la fiesta cuando te recibiste.",
      "Nuevos horizontes. Vos los fuiste a buscar, a fuerza de constancia y noches largas."
     ]
    }
   ],
   "puerta": [
    1,
    2
   ],
   "cadena": [
    [
     "npc",
     "NPC_GIGI"
    ],
    [
     "lugar",
     "utn"
    ],
    [
     "npc",
     "NPC_NOE"
    ],
    [
     "npc",
     "NPC_KIARA"
    ],
    [
     "npc",
     "NPC_TOMI"
    ],
    [
     "npc",
     "NPC_CAMI"
    ],
    [
     "npc",
     "NPC_BRIAN"
    ],
    [
     "npc",
     "NPC_VICTOR"
    ],
    [
     "npc",
     "NPC_BAUTI"
    ]
   ]
  },
  "mundo3": {
   "nombre": "España, Segunda Casa",
   "entrada": [
    2,
    12
   ],
   "palette": {
    "G": "#d8c9a8",
    "P": "#f0e6cf",
    "T": "#5f8a3a",
    "H": "#c9433a",
    "W": "#4a90d9",
    "D": "#f2d94e"
   },
   "superpoder": "evolucion",
   "mapa": [
    "TTTTTTTTTTTTTTTTTTTT",
    "THHHHHGGGGGGGGHHHHHT",
    "TGGGGGGGGGGGGGGGGGGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGPGGGGGWWWWGGGGGPGT",
    "TGPGGGGGWWWWGGGGGPGT",
    "TGPGGGGGGGGGGGGGGPGT",
    "TGPPPPPPPPPPPPPPPPGT",
    "TGGGGGGGGGGGGGGGGPGT",
    "TGGGGGGGGGGGGGGGGGDT",
    "TTTTTTTTTTTTTTTTTTTT"
   ],
   "estilo": {
    "flores": false
   },
   "edificios": [
    {
     "id": "guadarrama",
     "tipo": "guadarrama",
     "x": 3,
     "y": 3,
     "w": 5,
     "h": 3,
     "nombre": "Guadarrama",
     "texto": [
      "Guadarrama. La casa de Pablo en la sierra de Madrid.",
      "Nadie te lo pidió: le pusiste calefacción, la hiciste independiente y arreglaste las puertas del horno, que solo vos sabés lo que costaron. Pablo dice que 'nuestra' Guadarrama es mejor gracias a vos.",
      "Acá entendiste que la familia cruza el océano y te abre la puerta como si nunca te hubieras ido."
     ]
    },
    {
     "id": "padelcit",
     "tipo": "padelcit",
     "x": 11,
     "y": 3,
     "w": 6,
     "h": 3,
     "nombre": "Pádel CIT",
     "texto": [
      "Pádel CIT.",
      "No es solo una cancha. Acá se juntan todos los de España: Pablo, Diego, Jesús, Suyi, Sofi, los chicos. Cada vez que volvés, la cancha es la excusa; lo importante es quién te espera afuera.",
      "Acá el brazo importa menos que la cabeza. Como en la vida: pensar antes de pegar. Diego te espera abajo."
     ]
    }
   ],
   "puerta": [
    18,
    13
   ],
   "cadena": [
    [
     "npc",
     "NPC_SOFI"
    ],
    [
     "lugar",
     "guadarrama"
    ],
    [
     "npc",
     "NPC_PABLO"
    ],
    [
     "npc",
     "NPC_SUYI"
    ],
    [
     "npc",
     "NPC_JESUS"
    ],
    [
     "lugar",
     "padelcit"
    ],
    [
     "npc",
     "NPC_DIEGO"
    ],
    [
     "npc",
     "NPC_MATEO"
    ],
    [
     "npc",
     "NPC_MARTINA"
    ]
   ]
  },
  "mundo4": {
   "nombre": "Base Central",
   "entrada": [
    9,
    12
   ],
   "palette": {
    "G": "#3b3f5c",
    "P": "#8a8fd1",
    "T": "#151726",
    "H": "#9fe0c8",
    "W": "#3a3f6b",
    "D": "#f2d94e"
   },
   "superpoder": null,
   "mapa": [
    "TTTTTTTTTTTTTTTTTTTT",
    "TWWWWWWWWWWWWWWWWWWT",
    "TWGGGGGGGGGGGGGGGGWT",
    "TWGGGGGGGGGGGGGGGGWT",
    "TWGGGGGGGGGGGGGGGGWT",
    "TWGGGGGGGGGGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWGGGGGGGPPGGGGGGGWT",
    "TWWWWWWWWWWWWWWWWWWT",
    "TTTTTTTTTTTTTTTTTTTT"
   ],
   "estilo": {
    "W": "pared",
    "T": "pared",
    "flores": false
   },
   "edificios": [
    {
     "id": "casa",
     "tipo": "casa",
     "x": 7,
     "y": 2,
     "w": 6,
     "h": 4,
     "nombre": "Nuestra casa",
     "texto": [
      "Nuestra casa.",
      "No la compraste: la construiste. Tomi pasó semanas de verano ayudándote con las refacciones. Y en la terraza, en una juntada helada, armaste el toldo y cada rato se te ocurría algo más para ponerle.",
      "Es tu logro más grande. Y adentro está la persona que lo hizo con vos. ¿Construimos un piso más?"
     ],
     "minijuego": "construir"
    },
    {
     "id": "p1",
     "tipo": "portal",
     "x": 2,
     "y": 4,
     "w": 1,
     "h": 1,
     "nombre": "Don Orione",
     "viaje": "mundo1",
     "etiqueta": "DON ORIONE"
    },
    {
     "id": "p2",
     "tipo": "portal",
     "x": 2,
     "y": 8,
     "w": 1,
     "h": 1,
     "nombre": "Nuevos Horizontes",
     "viaje": "mundo2",
     "etiqueta": "HORIZONTES"
    },
    {
     "id": "p3",
     "tipo": "portal",
     "x": 2,
     "y": 12,
     "w": 1,
     "h": 1,
     "nombre": "España",
     "viaje": "mundo3",
     "etiqueta": "ESPAÑA"
    },
    {
     "id": "buzon",
     "tipo": "buzon",
     "x": 15,
     "y": 4,
     "w": 2,
     "h": 2,
     "nombre": "Mensajes para el futuro",
     "texto": [
      "Acá guardaron lo que te desean para lo que viene.",
      "Cada uno dejó su mensaje. Tocá A para leerlos."
     ],
     "abrirFoto": true
    }
   ],
   "cadena": [
    [
     "npc",
     "NPC_GABY"
    ],
    [
     "toto",
     "toto"
    ],
    [
     "lugar",
     "casa"
    ],
    [
     "lugar",
     "buzon"
    ]
   ]
  }
 },
 "superpoderes": {
  "escudo_palabra": "Escudo de la Palabra Inquebrantable",
  "reflejos": "Reflejos Milimétricos",
  "evolucion": "Motor de Evolución Continua"
 },
 "pasean": {
  "mundo1": [
   "NPC_TIOMARTIN",
   "NPC_GERAR"
  ],
  "mundo2": [
   "NPC_KIARA",
   "NPC_VICTOR"
  ],
  "mundo3": [
   "NPC_MATEO",
   "NPC_JESUS"
  ],
  "mundo4": []
 }
};
