window.MQ_CHARACTERS = {
  "version": 1,
  "tileSize": 16,
  "personajes": [
    {
      "id": "PC_MATI",
      "nombre": "Mati",
      "mundo": "todos",
      "rol": "Jugador / Protagonista",
      "tipo": "player",
      "sprite": {
        "file": "sprite_mati.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 2,
        "y": 12
      },
      "dialogos": {
        "saludo": "",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": ""
      },
      "flags": {}
    },
    {
      "id": "PET_TOTO",
      "nombre": "Toto",
      "mundo": "todos",
      "rol": "El compañero fiel",
      "tipo": "follower",
      "sprite": {
        "file": "sprite_toto.png",
        "frameWidth": 32,
        "frameHeight": 32,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "x": null,
        "y": null
      },
      "dialogos": {
        "saludo": "",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Guau guau guau guau!"
      },
      "flags": {}
    },
    {
      "id": "NPC_MAMADRI",
      "nombre": "Adri",
      "mundo": "mundo1",
      "rol": "Mamá. Centro de cura y de besos",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_adri.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 8,
        "y": 3
      },
      "dialogos": {
        "saludo": "¡Ay, mi Cuchi Cuchi! Vení acá.",
        "anecdota": "Hace unos años fuimos juntos a Villa Carlos Paz. Un día quisiste subir al cerro de la Cruz y, aunque vos sos muy dado a los desafíos, tuviste la paciencia de subir a mi ritmo y bancarme mis miedos. Lograste que yo llegara. Y después, para quedar en paz con vos mismo, lo volviste a subir corriendo.",
        "cualidad": "Lo que más admiro de vos es tu fuerza de voluntad para todo, tu perseverancia para superarte y la inmensa generosidad que tenés.",
        "mensajeFuturo": "Lo que más deseo es que te relajes un poco y que disfrutes de todo lo que lograste tan dignamente."
      },
      "flags": {
        "esCentroCura": true,
        "beso": true
      }
    },
    {
      "id": "NPC_PAPALUIS",
      "nombre": "Luis",
      "mundo": "mundo1",
      "rol": "El que te enseñó a trabajar duro",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_luis.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 4,
        "y": 5
      },
      "dialogos": {
        "saludo": "Hijo, sentate que te tengo que decir algo sobre el trabajo duro. Es cortito.",
        "anecdota": "Hace mucho fuimos de pesca a Gorchs. Para llegar al río entramos por un camino muy rural: campo, vacas y el sector recién trillado de cereal. Te armé la caña con la línea de boyas y, cuando empezaron a picar, te pusiste a analizar cuándo verías tu primer pez en la superficie, hasta que lo lograste. La pasamos bien. Hasta la perra Angie, corriendo a las vacas.",
        "cualidad": "Terminado el secundario te pregunté si seguías estudiando, y tomaste el camino en lo que sos hoy. Tu estudio y tu trabajo son de cambios y actualizaciones constantes para lograr la meta. Mantenés el norte, alternando prueba y error hasta lograr tu objetivo. Sos perseverante e ingenioso, y con el tiempo vas a lograr lo que deseás.",
        "mensajeFuturo": "Todos y cada uno de los mejores deseos. Aprendí a dar consejos solo si los piden, pero es valioso elaborar la experiencia después de transitar los obstáculos. Me sumo al inicio del cambio: perdé el pudor de mostrar lo que sabés. Mostrá el conocimiento con sutileza, para que te vean lo dispuesto y capaz que sos."
      },
      "flags": {
        "minijuego": "callar",
        "esRival": true
      }
    },
    {
      "id": "NPC_TIALILI",
      "nombre": "Lili",
      "mundo": "mundo1",
      "rol": "La tía seria por fuera y con corazón gigante",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_lili.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 15,
        "y": 5
      },
      "dialogos": {
        "saludo": "Sí, ya sé que parezco seria. Es mi cara de pensar en vos.",
        "anecdota": "Me acuerdo de tu cumple 33, cuando por tu perseverancia y dedicación al pádel te dio una contractura en la cintura... y te ayudamos haciendo trencito para que te apoyaras. Esa fue la parte graciosa.",
        "cualidad": "Admiro tu perseverancia y tu responsabilidad.",
        "mensajeFuturo": "Felicitaciones por tus enormes logros de siempre. Mi gran deseo es que disfrutes mucho, también, de los resultados que te da justamente esa tenacidad y ese compromiso."
      },
      "flags": {}
    },
    {
      "id": "NPC_TIOMARTIN",
      "nombre": "Martín",
      "mundo": "mundo1",
      "rol": "Humorista oficial de la familia",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_martin.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 13,
        "y": 9
      },
      "dialogos": {
        "saludo": "¿Sabés cuál es el colmo de un ingeniero? Que le falle el plan. Vos nunca.",
        "anecdota": "El viaje a Villa Gesell fue un lindo momento que compartimos. Nos divertimos mucho.",
        "cualidad": "Tu disciplina.",
        "mensajeFuturo": "Poné fecha de casamiento... no es tan grave... jiji."
      },
      "flags": {}
    },
    {
      "id": "NPC_TIAALICIA",
      "nombre": "Alicia",
      "mundo": "mundo1",
      "rol": "Tía y cuidadora oficial de Toto",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_alicia.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 10,
        "y": 10
      },
      "dialogos": {
        "saludo": "¿Cómo está mi Toto? Decile que la tía lo extraña.",
        "anecdota": "No tengo una anécdota en particular, pero sí rescato el recuerdo de tu adolescencia, y tu esmero y esfuerzo para cursar la facultad. Lo lograste ampliamente: una carrera de futuro y de múltiples posibilidades. Festejamos cuando te recibiste.",
        "cualidad": "Respeto tu actitud de mejorar cada día, siempre con algún proyecto nuevo.",
        "mensajeFuturo": "Creo que lo mejor es ser honesto y respetuoso con uno mismo. Cada uno arma su vida de acuerdo a su propia evolución."
      },
      "flags": {}
    },
    {
      "id": "NPC_SUEGRAMATI",
      "nombre": "Mati",
      "mundo": "mundo1",
      "rol": "Mati \"The Original\"",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_mati_suegra.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 3,
        "y": 5
      },
      "dialogos": {
        "saludo": "¿Qué comen? Cuéntame, que estoy cenando.",
        "anecdota": "Tu comentario cuando pruebas una comida buena y te pregunto si te gustó: \"jummm\".",
        "cualidad": "Tu solidaridad con la familia. Contigo uno se siente acompañado y protegido.",
        "mensajeFuturo": "Que sigas perseverando, mi hijo, porque siempre cumples lo que te propones. ¡Feliz cumpleaños!"
      },
      "flags": {}
    },
    {
      "id": "NPC_SUEGROALE",
      "nombre": "Ale",
      "mundo": "mundo1",
      "rol": "El que siempre te bendice",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_ale.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 13,
        "y": 11
      },
      "dialogos": {
        "saludo": "Dios te bendiga, papá.",
        "anecdota": "Te conocí en Madrid, en diciembre de 2023. Tu cercanía y tu disposición protectora te hicieron un hijo más para mí. Siempre estás pendiente y me acompañas en todo.",
        "cualidad": "Tu compromiso y tu disposición familiar. Vas a ser un buen padre. Y, pienso, algo estricto y organizado, je je je.",
        "mensajeFuturo": "Me gustaría verte realizado en pareja con mi Gabiota. Son un gran equipo y cuentan con mi bendición. ¡Feliz cumpleaños, papá!"
      },
      "flags": {}
    },
    {
      "id": "NPC_GERAR",
      "nombre": "Gerar",
      "mundo": "mundo1",
      "rol": "El que \"contesta primero\"",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_gerar.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 12,
        "y": 5
      },
      "dialogos": {
        "saludo": "¡Cuñado! Tengo una cosita en casa que ni te imaginas. ¿Cuándo vienes?",
        "anecdota": "Mi anécdota especial fue cuando llegaste a la casa y quisiste arreglar todas las puertas de mi cocina. Cada vez que las veías te ofrecías. Al principio pensé que era cortesía, pero después de tanta insistencia vi que era real, jaja, y que querías ayudar a tu manera.",
        "cualidad": "No sé describirlo en una sola palabra, pero eres una persona muy familiar. Siempre estás atento a los que te rodean y, a tu manera, los ayudas como puedes.",
        "mensajeFuturo": "Que sonrías más, chamo. Los que te conocemos un poco más de cerca vemos lo gracioso que eres. Los que no, pueden pensar que eres un poco serio. ¡Feliz cumpleaños!"
      },
      "flags": {}
    },
    {
      "id": "NPC_VALEN",
      "nombre": "Valen",
      "mundo": "mundo1",
      "rol": "El sobrino más obediente",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_valen.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 16,
        "y": 10
      },
      "dialogos": {
        "saludo": "¡Feliz cumpleaños, Mati! ¿Jugamos como antes? Primero, tengo algo para vos.",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Feliz cumple, Mati! Jugá conmigo cuando quieras."
      },
      "flags": {
        "daSuperpoder": "escudo_palabra"
      }
    },
    {
      "id": "NPC_SUSI",
      "nombre": "Tía Susi",
      "mundo": "mundo1",
      "rol": "Tu tía. Te cuida desde el cielo",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_susi.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 9,
        "y": 6
      },
      "dialogos": {
        "saludo": "¡Feliz cumpleaños, Mati! Desde el cielo, con todo mi amor.",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Feliz cumpleaños, Mati! Desde el cielo, con todo mi amor."
      },
      "flags": {
        "cielo": true
      }
    },
    {
      "id": "NPC_BRIAN",
      "nombre": "Brian",
      "mundo": "mundo2",
      "rol": "El hermano de la vida",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_brian.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 10,
        "y": 7
      },
      "dialogos": {
        "saludo": "Hoy no zafás. Primero a 3, y el que pierde lo admite en voz alta.",
        "anecdota": "Fue hace mucho y capaz tengo la realidad un poco distorsionada, pero me acuerdo de muchas noches en tu casa, cuando me quedaba a dormir, pensando \"travesuras\". Una vez se nos ocurrió, aunque probablemente se TE ocurrió, atarle los pies a tu papá a la cama mientras dormía, para que al despertarse no pudiera moverse. Entraste sigiloso a la pieza y arrancaste el plan, pero algo te faltaba. Saliste, lo buscaste y volviste a entrar a terminar el trabajo. Y ahí surgió el imprevisto: tu papá se había despertado y te estaba esperando para asustarte. El tiro te salió por la culata: la broma para tu papá terminó siendo un gran susto para vos.",
        "cualidad": "Sos una persona que se pone objetivos claros y trabaja en lo que quiere para conseguirlo. No te rendís fácil, le buscás la vuelta. No siempre se logra, pero me animo a decir que en su gran mayoría sí. Y estás dispuesto a ayudar al otro: tus conocimientos los ponés al servicio de tus seres queridos.",
        "mensajeFuturo": "Deseo que encuentres la manera de que tu trabajo funcione sin requerir tanto de tu atención, para tener más tiempo y disfrutar más del día a día. Seguro estás trabajando en eso, y todo el tiempo que le dedicás es para tener más libertad en el futuro. Espero que ese futuro se convierta en presente lo antes posible."
      },
      "flags": {
        "esRival": true,
        "minijuego": "pingpong",
        "recompensa": "Honor de Vencer a Brian"
      }
    },
    {
      "id": "NPC_CAMI",
      "nombre": "Cami",
      "mundo": "mundo2",
      "rol": "La que dice las cosas como son",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_cami.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 6,
        "y": 10
      },
      "dialogos": {
        "saludo": "Te lo digo de frente porque no me gusta la careta: te queremos. Pero hoy Brian te gana.",
        "anecdota": "Las vacaciones en la costa con Bau bebé. Fue una experiencia nueva y muy linda: vos queriendo que fuera todo milimétrico y Bau modificándote los planes, jajaja.",
        "cualidad": "Siempre aportás y acompañás de manera positiva en la vida de quien querés, para que ese ser querido esté mejor.",
        "mensajeFuturo": "Disfrutá mucho los procesos, sin importar si el resultado no es exactamente el que esperabas."
      },
      "flags": {}
    },
    {
      "id": "NPC_BAUTI",
      "nombre": "Bauti",
      "mundo": "mundo2",
      "rol": "El sobrino que disfruta las cosquillas",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_bauti.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 14,
        "y": 10
      },
      "dialogos": {
        "saludo": "...Hola. Feliz cumpleaños. Te hice un dibujo. Es para vos.",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Feliz cumple, Mati! Te hice otro dibujo."
      },
      "flags": {
        "daSuperpoder": "reflejos"
      }
    },
    {
      "id": "NPC_GIGI",
      "nombre": "Gigi",
      "mundo": "mundo2",
      "rol": "La prima con mejores dotes de organización",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_gigi.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 4,
        "y": 2
      },
      "dialogos": {
        "saludo": "¿Te acordás de esos viajes a la costa? Todas esas tardes de playa.",
        "anecdota": "Miles de momentos... Cada cena o almuerzo en tu casa, acomodando servilleta, plato y cubiertos de manera milimétrica. Y aquella juntada de mucho frío armando el toldo en la terraza: cada vez se te ocurrían más cosas para poner y hacer.",
        "cualidad": "Que en silencio, sin levantar el avispero, estás prestando atención para ayudar al otro.",
        "mensajeFuturo": "¡Disfrutá más el presente! Mi sensación es que buscás la perfección sin disfrutar el proceso."
      },
      "flags": {}
    },
    {
      "id": "NPC_VICTOR",
      "nombre": "Víctor",
      "mundo": "mundo2",
      "rol": "El que siempre da una mano",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_victor.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 16,
        "y": 2
      },
      "dialogos": {
        "saludo": "Cuando quieras arrancamos con lo de tu casa. Vos decime qué y cuándo.",
        "anecdota": "Una vez queríamos ir a jugar al pool en la entrada del barrio. Éramos Kevin, vos y yo. Era un sábado a la noche. Kevin y yo no teníamos mucha plata para el remís y vos sí, y querías ir en remís. Con Kevin nos miramos: \"no, Mati, vamos caminando, así nos queda más plata para el pool\". Y vos me mirás y me decís: \"no le digas nada a mi mamá porque me mata, que mamá no se entere, por favor\". Con Kevin nos moríamos de risa. La pasamos muy bien. ¿Te acordás, Matiii?",
        "cualidad": "Lo que más admiro de vos es la amabilidad, el respeto y el cariño que tenés con todos. Los consejos que das sin pedir nada a cambio. Eso lo valoro mucho. Es admirable.",
        "mensajeFuturo": "Que sigas siempre así, para adelante, con la cabeza bien alta. Que sigas cumpliendo y rompiendo esa meta que siempre deseaste. Esa mentalidad única, siempre al éxito, mi amigo y primo querido."
      },
      "flags": {}
    },
    {
      "id": "NPC_NOE",
      "nombre": "Noe",
      "mundo": "mundo2",
      "rol": "La prima con más facha",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_noe.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 13,
        "y": 4
      },
      "dialogos": {
        "saludo": "Mati, no me anda la compu. No, no la reinicié. ¿Por?",
        "anecdota": "Cada almuerzo, cena o juntada en la que querés que salga todo exactamente como lo planeaste, brindando lo que está a tu alcance.",
        "cualidad": "Tu predisposición a ayudar.",
        "mensajeFuturo": "Que no todo tiene que ser tan perfecto... A veces lo imperfecto sale bien."
      },
      "flags": {}
    },
    {
      "id": "NPC_KIARA",
      "nombre": "Kiara",
      "mundo": "mundo2",
      "rol": "La sobrina de las uñas más largas del mapa",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_kiara.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 6,
        "y": 7
      },
      "dialogos": {
        "saludo": "¡Feliz cumple, Mati! ¿Vos sos el que hace juegos? Con estas uñas no puedo apretar la A.",
        "anecdota": "Cuando volvíamos de Villa Gesell y en vez de demorar 4 horas fueron 8.",
        "cualidad": "Que quieras que siempre salga todo bien.",
        "mensajeFuturo": "Que logres todo lo que te propongas. ¡Feliz cumple, Mati!"
      },
      "flags": {}
    },
    {
      "id": "NPC_TOMI",
      "nombre": "Tomi",
      "mundo": "mundo2",
      "rol": "El guardián del silencio",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_tomi.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo2",
        "x": 12,
        "y": 7
      },
      "dialogos": {
        "saludo": "...Feliz cumple. Ya está, no me hagas hablar más.",
        "anecdota": "Las semanas de verano que pasé ayudándote con las refacciones de la casa y conviviendo un tiempo con vos.",
        "cualidad": "Valoro tu intención de que todo salga de la mejor manera, ya sea ayudando u organizando cualquier cosa.",
        "mensajeFuturo": "Te deseo lo mejor para el futuro, en lo laboral y con tu casa. ¡Feliz cumple, Mati!"
      },
      "flags": {}
    },
    {
      "id": "NPC_CANETE",
      "nombre": "Cañete",
      "mundo": "mundo1",
      "rol": "Tu primer alumno",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_canete.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo1",
        "x": 5,
        "y": 11
      },
      "dialogos": {
        "saludo": "Loco, si no fuera por vos repetía dos veces. ¿Unos penales?",
        "anecdota": "Mi mejor recuerdo es del colegio... hablando mal y pronto, ¡me tenías cagando! Pero re bien, y estoy súper agradecido por eso. Gracias a vos no me llevé materias, me hiciste más prolijo, más responsable, y me transmitiste un montón de virtudes sin necesidad de decir demasiado. También tenemos muy buenos recuerdos con el fútbol (lástima que seas cuervo), el gimnasio, el pádel y el tenis... bueno, estos dos últimos no tanto, porque me ganabas siempre. Así que les estaba tomando un poquito de bronca a esos deportes.",
        "cualidad": "Responsabilidad, compromiso y seriedad. Siempre te vi como un pibe con una madurez increíble, y por eso te respeto muchísimo. Además, sos muy amistoso y tenés esa virtud de que podemos pasar un año sin hablar, pero cuando te vuelvo a ver, nos sentamos a hablar como si el tiempo no hubiera pasado.",
        "mensajeFuturo": "Te aliento a que sigas haciendo lo que te gusta, que sigas creciendo tanto personal como profesionalmente y que nunca pierdas esa esencia que te caracteriza. Y un consejo para que seas una persona bastante mejor todavía... ¡hacete bostero! ¡Feliz cumple, Mati!"
      },
      "flags": {
        "minijuego": "futbol"
      }
    },
    {
      "id": "NPC_PABLO",
      "nombre": "Pablo",
      "mundo": "mundo3",
      "rol": "El emprendedor que te inspira",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_pablo.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 9,
        "y": 5
      },
      "dialogos": {
        "saludo": "Perdón que no te atendí el teléfono. Estaba... emprendiendo.",
        "anecdota": "Mi anécdota es tu perseverancia para que \"nuestra\" Guadarrama sea mejor, sin que nadie te pidiera nada. Tu lealtad y tu agradecimiento la hicieron más habitable: la calefacción, la independencia, y las puertas del horno, que solo vos sabés lo que te costaron. Sin hablar del cartel de la \"casa de las M\".",
        "cualidad": "El don que conseguiste de ayudar a los demás desinteresadamente, porque eso es un don. Y el don de ser agradecido en la vida sin interés de por medio es un rasgo único, que se lleva en el corazón. Inmejorable, según mi forma de pensar.",
        "mensajeFuturo": "Construir a la manera de Maty, no rendirte y tener esa fuerza de voluntad y de servicio es lo que hará que cualquier cosa que desees en la vida la puedas tener. No dejes de desearla, porque si alguien puede transformar esos deseos en realidad sos vos, Maty."
      },
      "flags": {
        "esLiderGimnasio": true,
        "minijuego": "logica",
        "esRival": true
      }
    },
    {
      "id": "NPC_MARTINA",
      "nombre": "Martina",
      "mundo": "mundo3",
      "rol": "La sobrina española favorita",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_martina.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 14,
        "y": 10
      },
      "dialogos": {
        "saludo": "¡Ostia, bro! ¡Feliz cumpleaños, Mati! Cada día un poquito mejor, ¿no?",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Ostia, bro! ¡Feliz cumpleaños!"
      },
      "flags": {
        "daSuperpoder": "evolucion"
      }
    },
    {
      "id": "NPC_DIEGO",
      "nombre": "Diego",
      "mundo": "mundo3",
      "rol": "Tu socio de pádel en dos continentes",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_diego.png",
        "frameWidth": 64,
        "frameHeight": 64,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 14,
        "y": 7
      },
      "dialogos": {
        "saludo": "Te preparo empanadas. Esta vez sin el plástico, lo juro.",
        "anecdota": "Las vacaciones en Mar del Plata siempre son de los viajes más recordados: compartir con la familia, asado, playa, partidos de fútbol polémicos, jaja, pero felices de estar todos juntos esos días.",
        "cualidad": "Sos una persona observadora y dispuesta a ayudar en todo lo que podés. Cercano, familiero.",
        "mensajeFuturo": "Yo creo que vas por buen camino. Seguí para adelante con tus convicciones y objetivos, que día a día vas a seguir creciendo en las cosas más importantes para vos."
      },
      "flags": {
        "minijuego": "padel"
      }
    },
    {
      "id": "NPC_SOFI",
      "nombre": "Sofi",
      "mundo": "mundo3",
      "rol": "Parte de la familia española",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_sofi.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 5,
        "y": 8
      },
      "dialogos": {
        "saludo": "Mati, ¿cómo va? Bienvenido a España. ¡Feliz cumpleaños!",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Feliz cumpleaños, Mati! Bienvenido siempre a España."
      },
      "flags": {}
    },
    {
      "id": "NPC_MATEO",
      "nombre": "Mateo",
      "mundo": "mundo3",
      "rol": "El sobrino español favorito",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_mateo.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 3,
        "y": 10
      },
      "dialogos": {
        "saludo": "¡Feliz cumpleaños! ¿Jugamos a la pelota? ¿Y ahora? ¿Y ahora?",
        "anecdota": "",
        "cualidad": "",
        "mensajeFuturo": "¡Feliz cumple, Mati! ¿Y ahora jugamos a la pelota?"
      },
      "flags": {}
    },
    {
      "id": "NPC_JESUS",
      "nombre": "Jesús",
      "mundo": "mundo3",
      "rol": "El que te hace hablar dormido",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_jesus.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 12,
        "y": 2
      },
      "dialogos": {
        "saludo": "¡Hombre, Mati! Qué ilusión, tío. Venga, un abrazo.",
        "anecdota": "Todavía no pudimos compartir muchos momentos juntos, y la mayoría fueron por cámara, jeje. Como anécdota: cuando me enteré de que llevabas tu alimentación totalmente estructurada en un Excel y lo compartías con Gabi, quise que vieras en directo qué pasaba si yo le decía a mi mujer que a partir de ahora también quería llevar mi alimentación en un Excel. Bueno, la respuesta fue la esperada.",
        "cualidad": "Lo que más me sorprende de vos es la sensación de que SIEMPRE escuchás, y no de cualquier forma: cada vez que te digo algo no cae en saco roto. Preguntás, profundizás, lo analizás y me terminás dando la solución después de pasarla por la IA, filtrarla por Excel y comprobar tres veces que funciona. Sos de los que se preocupan de verdad. Y conmigo fuiste muy paciente: haberme ayudado con el Excel te convalida tercero de psicología, jaja.",
        "mensajeFuturo": "Creo que sabés perfectamente lo que hay que decir. Por contestar la pregunta: nunca dejes de creer en vos, porque sos de las personas más válidas que conozco. Ha sido una suerte poder conocerte mejor, en todos los sentidos."
      },
      "flags": {}
    },
    {
      "id": "NPC_SUYI",
      "nombre": "Suyi",
      "mundo": "mundo3",
      "rol": "Usuaria serial de tableros (algún día)",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_suyi.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo3",
        "x": 16,
        "y": 9
      },
      "dialogos": {
        "saludo": "Los tableros que me hiciste los voy a aprender a usar. Este año sí. Palabra.",
        "anecdota": "Mati en estado puro es cuando me explicás algo con todo detalle y minuciosidad. Hubo veces que te volví a preguntar lo mismo por tercera vez y, aunque en mi cabeza pensaba \"de esta no salgo viva\", me lo volviste a repetir.",
        "cualidad": "Admiro lo responsable y constante que sos con todo. Tu lealtad con tu gente y tus amigos, y que siempre estás dispuesto a darme una mano, sin importar las veces que haga falta.",
        "mensajeFuturo": "Paciencia, paciencia y más paciencia."
      },
      "flags": {}
    },
    {
      "id": "NPC_GABY",
      "nombre": "Gaby",
      "mundo": "mundo4",
      "rol": "Tu compañera. Boss final de amor",
      "tipo": "npc",
      "sprite": {
        "file": "sprite_gaby.png",
        "frameWidth": 48,
        "frameHeight": 48,
        "anims": {
          "down": [
            0,
            1,
            2
          ],
          "left": [
            3,
            4,
            5
          ],
          "right": [
            6,
            7,
            8
          ],
          "up": [
            9,
            10,
            11
          ]
        }
      },
      "posicion": {
        "mundo": "mundo4",
        "x": 9,
        "y": 7
      },
      "dialogos": {
        "saludo": "Llegaste. Sabía que ibas a llegar.",
        "anecdota": "Resumir todo lo que vivimos en un solo recuerdo es difícil. Pero me acuerdo de esa salida a comer donde me \"pediste casamiento\" con una servilleta que convertiste en una especie de pulsera, y me dijiste que nos casaríamos un 30 de febrero. Esa salida resume un poco tu esencia: alguien creativo, que resuelve, con espíritu rebelde y, sobre todo, divertido.",
        "cualidad": "Que tu palabra vale. No es una frase: es cómo vivís. Si dijiste que lo hacés, lo hacés, aunque te lleve más de lo que pensabas y aunque nadie te lo reclame. Y lo otro que admiro es que ayudás sin que te lo pidan y sin esperar nada a cambio.",
        "mensajeFuturo": "Disfrutá más el camino, permitite disfrutar eso que ya lograste. Sonreí más, permitite equivocarte, abrazá las imperfecciones. Te amo. Feliz cumple, mi amor."
      },
      "flags": {
        "esBossFinal": true
      }
    }
  ]
};
