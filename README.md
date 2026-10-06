# Mati: Ingeniero de Tesoros — v1.4

Web app estilo Game Boy Advance (horizontal, pantalla al medio, cruceta a la izquierda, A/B a la derecha). Se juega en el navegador del celular, de costado.

## Cómo probarlo
1. Descomprimí la carpeta.
2. Abrí `index.html` en Chrome (funciona directo, sin servidor). En el celular: subí la carpeta a GitHub Pages, Netlify Drop o Vercel y abrí el link.
3. Controles: cruceta táctil + A/B. En PC: flechas, Z = A, X = B, Enter = START.

## Qué hay
- 4 mundos (20×15 tiles cada uno), puerta al siguiente mundo en el borde derecho (Mundo 4: puerta no, es el final).
- Para pasar de mundo hay que conseguir el superpoder del mundo hablando con Valen / Bauti / Martina.
- 26 NPC ubicados según `characters.json`. Se habla apretando A de frente.
- Toto sigue al jugador.
- Minijuegos: Callar a Luis y penales con Cañete (Claypole), ping-pong con Brian (Nuevos Horizontes), pádel táctico con Diego y secuencia lógica con Pablo (España), construir la casa y la pelotita con Toto (Base Central).
- Cadena guiada: cada personaje te dice a quién buscar después (menú B → "Siguiente"). Los rivales (Luis, Brian, Pablo) te salen al paso cuando les toca. Con B mantenido, corrés. Menú: Tesorodex (los 28, en silueta hasta hablarles), Insignias, Guardar.
- Las puertas al siguiente mundo están escondidas: aparecen al conseguir el superpoder del mundo, y algunos personajes dan pistas de dónde están.
- Cada edificio tiene un '!' hasta que leés su mensaje. En el menú se cuentan Tesoros, Lugares, Superpoderes y Trofeos.
- Final: Gaby (Mundo 4) → foto grupal, tocás a cada uno y lee su mensaje.
- Guardado automático en el navegador.

## Dónde editar
- `content.js` — intro, preguntas de trivia, textos del final.
- `characters.json` — nombres, roles, posiciones (x, y en tiles), diálogos. Editá directamente `characters.js` (es el que carga el juego).
- `maps.json` — mapas ASCII (T árbol/pared, G piso, P camino, H edificio, W agua/pared, D puerta) y paleta de cada mundo.
- `sprite_*.png` — un PNG por personaje. Grilla 3×4: filas down/left/right/up, columnas idle/paso1/paso2.

## Cargar los mensajes del formulario
Exportá las respuestas de Tally (o la Google Sheet) a CSV y corré:

    python3 importar_dialogos.py respuestas.csv

Empareja por nombre (sin acentos, admite "Martín (Tío)") y llena `anecdota`, `cualidad` y `mensajeFuturo`. Avisa los que no encontró.

## Agregar un personaje
1. Sprite en `sprite_nombre.png` con la misma grilla.
2. Entrada en `characters.json` (copiá una existente, cambiá id, nombre, mundo, posición y `sprite.file`).
3. Editá `characters.js`.

## Sonido
Música chiptune original por mundo y efectos, generados por código (sin archivos). Botón ♪ arriba a la derecha o tecla M para silenciar. En iPhone el audio arranca con el primer toque.

## Instalar como app
Abrí la URL en Safari (iPhone) o Chrome (Android) → Compartir → Agregar a pantalla de inicio. Queda con ícono propio, pantalla completa y funciona sin internet después de la primera carga.

## Plan del día del cumple
1. Reseteá la partida (B → Reiniciar todo) en el celu que va a usar.
2. Celu cargado, brillo alto, modo no molestar.
3. Probá el QR desde otro teléfono la noche anterior.
4. Notebook con la URL abierta y F (pantalla completa) como backup y para la tele.
5. Si el audio no suena: tocar la pantalla una vez, o revisar el botón ♪.

## Pendiente (siguientes versiones)
- Tiles dibujados a mano (hoy son tiles generados por código, mejorados).
- Minijuego de pádel (hoy Diego solo habla).
- Martín Pádel, Macus, Nacho.
