# Respaldos y restauración

Como operas el servidor, **los respaldos son tu responsabilidad**. Cuenca no tiene una copia de los datos de los espacios que alojas.

Lo que importa respaldar es la base de datos `cuenca`. No hace falta respaldar `.env`: una instalación nueva genera sus propias contraseñas y funciona con los datos restaurados.

## Hacer un respaldo

Desde `deploy/tercero/`:

```sh
./respaldar.sh --frase-archivo ~/frase-cuenca   # o sin opciones: pregunta la frase dos veces
```

- Escribe un archivo cifrado `respaldos/cuenca-<fecha>.dump.enc` y su suma de comprobación `.sha256`. Solo tu usuario puede leerlos.
- Antes de guardarlo, lo descifra otra vez y comprueba que se lee entero. Un respaldo dañado se descarta y nunca hace borrar los buenos.
- Conserva los **14 más nuevos**. Cámbialo con `--conservar`.

!!! danger "Sin la frase de paso no hay restauración posible"
    Guarda la frase de paso **fuera del equipo**, igual que los respaldos. Si se pierde, nadie puede abrir esos archivos.

### La frase de paso

El script la toma, en este orden, de:

1. `--frase-archivo ARCHIVO`: la primera línea de un archivo con permisos `600`.
2. La variable `CUENCA_RESPALDO_FRASE_ARCHIVO` (la ruta de ese archivo) o la variable `CUENCA_RESPALDO_FRASE`.
3. La terminal, si no hay ninguna de las anteriores.

Nunca la escribas en la línea de comandos: otros usuarios del equipo podrían verla.

### Respaldar cada noche

Al terminar, el script imprime la línea que debes añadir con `crontab -e` para respaldar todas las noches a las 03:15. Cópiala tal como la muestra y cambia `/ruta/a/la-frase` por la ruta de tu archivo de frase.

Después, copia la carpeta `respaldos/` **fuera del equipo**, con regularidad. Un respaldo que vive solo en el mismo servidor se pierde con él.

### Opciones

| Opción | Qué hace |
| --- | --- |
| `--directorio DIR` | Dónde se guardan. Por defecto, `respaldos/` junto al script. |
| `--conservar N` | Cuántos respaldos se conservan. Por defecto, 14. |
| `--frase-archivo ARCHIVO` | Archivo con la frase de paso en su primera línea. |

## Restaurar un respaldo

!!! warning "Restaurar sustituye los datos actuales"
    Lo que se haya registrado en el servidor después del respaldo se reemplaza por lo del respaldo. Aun así, el script nunca deja el servidor sin datos: guarda los actuales antes de cambiar nada.

```sh
./restaurar.sh respaldos/cuenca-<fecha>.dump.enc --frase-archivo ~/frase-cuenca
```

Qué hace, en orden:

1. **Comprueba el respaldo**: su suma `.sha256` (si falta, avisa), la frase de paso y que se lee entero.
2. **Comprueba el espacio en disco**: necesita unas 10 veces el tamaño del respaldo más 1 GiB. Si no alcanza, se detiene sin cambiar nada.
3. **Lo restaura en una base nueva**, junto a la actual, y comprueba que está completa. Si algo falla, la descarta y tus datos actuales quedan intactos.
4. **Te muestra** cuántos datos hay ahora y cuántos trae el respaldo, y te pide **escribir el dominio del servidor** para confirmar.
5. **Detiene** el gateway y PowerSync, y **respalda los datos actuales** en `respaldos/previo/`.
6. **Intercambia** las bases. La anterior queda guardada como `cuenca_anterior_<fecha>`. Después arranca todo otra vez, y los dispositivos vuelven a sincronizar solos.

Hasta el intercambio, cualquier fallo o interrupción descarta la base nueva y vuelve a arrancar el servidor con los datos de antes. Si el servidor no llega a estar sano después del intercambio, el script imprime cómo volver a la base anterior.

Cuando compruebes que todo está bien, libera el espacio de los datos anteriores con el comando `dropdb` que imprime el script al final.

### Opciones

| Opción | Qué hace |
| --- | --- |
| `--si` | No pregunta: confirma la sustitución. Úsalo solo en scripts. |
| `--frase-archivo ARCHIVO` | Archivo con la frase de paso en su primera línea. |
| `--sin-respaldo-previo` | No respalda los datos actuales antes del intercambio (no recomendado). |
| `--espera SEGUNDOS` | Tiempo máximo para que todo esté sano. Por defecto, 300. |

## Restaurar en un equipo nuevo

1. Instala el servidor con `./instalar.sh`, con **el mismo dominio y los mismos servidorId**.
2. Copia el respaldo y su archivo `.sha256` al equipo nuevo.
3. Restaura con `./restaurar.sh`.
