# Importar movimientos

Si tu banco te deja descargar tus movimientos como archivo **CSV** (una hoja de cálculo sencilla), puedes traerlos a Cuenca en lugar de escribirlos uno por uno.

## Antes de empezar

- Descarga el extracto desde la banca por internet de tu banco, en formato CSV.
- Ten a mano la cuenta de Cuenca donde quieres importarlos.

## Importar paso a paso

El proceso tiene tres pasos: elegir el archivo, indicar qué columna es cada dato y revisar el resumen. **No se guarda nada hasta el botón final.**

=== "En el teléfono"

    1. Abre la cuenta y toca **Importar CSV**.
    2. Toca **Elegir archivo CSV** y busca el archivo.

=== "En la web"

    1. En **Movimientos**, toca **Importar CSV**.
    2. Elige la **Cuenta de destino** y el archivo.

### 1. Indica las columnas

En **Columnas del archivo**, dile a Cuenca qué es cada columna:

- Marca **La primera fila es un encabezado** si la primera fila tiene títulos como "Fecha" o "Monto".
- Elige la **Columna de la fecha** y la **Columna del título**. Si quieres, también las de notas y presupuesto.
- En **Cómo viene el monto**, elige **Una columna con signo** (los gastos en negativo) o **Débito y crédito** (dos columnas separadas).
- Elige el **Formato de la fecha** y el **Formato del monto** (por ejemplo, `1.234,56`).

Abajo verás una **Vista previa** con cada fila como Ingreso o Gasto. Si se ve bien, toca **Continuar**.

### 2. Revisa el resumen

El **Resumen de la importación** te dice:

- Cuántos **movimientos nuevos** se van a importar.
- Cuántos **posibles duplicados** encontró: movimientos con la misma fecha y monto que uno que ya tienes. No se importan, salvo que marques **Incluir duplicados**.
- Qué **filas con problemas** hay y por qué.

### 3. Importa

Toca **Importar** (el botón dice cuántos movimientos son). Los movimientos llegan como **Pendiente**, listos para que les pongas presupuesto y los concilies.

!!! tip "La web lo hace más fácil"
    En la web, Cuenca adivina las columnas, recuerda cómo las elegiste para cada cuenta y aplica tus reglas para poner presupuesto y etiquetas solas.

!!! warning "Si ves letras raras"
    Si las tildes o la ñ aparecen mal, el archivo tiene otra codificación. En la web elige **Windows-1252 (Excel en Windows)** en **Codificación del archivo**. En el teléfono, el archivo debe estar en UTF-8: ábrelo en una hoja de cálculo y guárdalo como "CSV UTF-8".

## Después de importar

1. Revisa los movimientos **Sin presupuesto** desde el aviso del plan y asígnales uno.
2. Compara el saldo de la cuenta con el de tu banco.
3. Concilia.

## Otras importaciones

- **Respaldo**: para pasar todos tus datos de un teléfono a otro, usa el respaldo, en la configuración.
- **Eventos de Google Calendar**: en el [Calendario](calendario.md).
