#!/usr/bin/env python3
"""Importa las respuestas del formulario (CSV exportado de Tally o Google Sheets) a data/characters.json
y regenera data/characters.js.

Uso:  python3 tools/importar_dialogos.py respuestas.csv

El CSV debe tener 4 columnas de texto en este orden (los encabezados no importan):
  nombre | anécdota | mejor cualidad | mensaje para el futuro
Columnas extra (fecha, id de envío) se ignoran: se toman las 4 últimas columnas con texto.
Los nombres se comparan sin acentos ni mayúsculas; "Martin", "martín" y "Martín (Tío)" matchean con Martín.
"""
import csv, json, sys, unicodedata, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'characters.json')
def norm(s): return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn').strip()
def main(path):
    data = json.load(open(CH, encoding='utf-8'))
    by_name = {}
    for p in data['personajes']:
        by_name.setdefault(norm(p['nombre']), []).append(p)
    rows = list(csv.reader(open(path, encoding='utf-8')))
    hits, misses = 0, []
    for r in rows[1:]:
        cells = [c.strip() for c in r if c is not None]
        text = [c for c in cells if c]
        if len(text) < 4: continue
        nombre, anec, cual, msg = text[-4:]
        key = norm(nombre).split('(')[0].strip()
        cands = by_name.get(key) or [p for k, v in by_name.items() for p in v if key and (key in k or k in key)]
        if not cands: misses.append(nombre); continue
        p = cands[0]
        if len(cands) > 1:
            print(f'Aviso: "{nombre}" coincide con varios ({", ".join(c["id"] for c in cands)}); usé {p["id"]}. Corregí a mano si hace falta.')
        p['dialogos'].update({'anecdota': anec, 'cualidad': cual, 'mensajeFuturo': msg}); hits += 1
        for campo, txt in (('anecdota', anec), ('cualidad', cual), ('mensajeFuturo', msg)):
            if len(txt) > 450: print(f'  Aviso {p["nombre"]}/{campo}: {len(txt)} caracteres (~{len(txt)//110 + 1} páginas de diálogo). Considerá acortar.')
            if txt.isupper() and len(txt) > 20: print(f'  Aviso {p["nombre"]}/{campo}: todo en mayúsculas.')
    json.dump(data, open(CH, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    open(os.path.join(os.path.dirname(CH), 'characters.js'), 'w', encoding='utf-8').write('window.MQ_CHARACTERS = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
    print(f'Importados: {hits}. Sin match: {misses or "ninguno"}')
if __name__ == '__main__':
    if len(sys.argv) < 2: print(__doc__); sys.exit(1)
    main(sys.argv[1])
