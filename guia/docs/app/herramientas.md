# Herramientas de la web

!!! note "Solo en la web"
    Estas herramientas están en la versión web, en **Organizar → Herramientas**.

Las herramientas te ayudan a mantener tus datos ordenados sin hacerlo a mano.

## Reglas

Una **regla** clasifica tus movimientos sola: "**si** pasa esto, **entonces** haz aquello".

!!! example "Ejemplo"
    Si el título contiene "Farmacia", entonces asignar el presupuesto "Salud".

Para crear una regla:

1. Abre **Reglas** y crea una nueva.
2. Elige la condición: **El título contiene**, **es igual a**, **El monto está entre**, **La cuenta es una de** o **El movimiento es un** (tipo).
3. Elige la acción: **Asignar el presupuesto**, **Agregar las etiquetas** o **Cambiar el título a**.
4. Guarda.

Las reglas se aplican en orden. Toca **Ejecutar reglas** para aplicarlas a tus movimientos: antes verás una vista previa, y después puedes deshacer. También se aplican solas cuando [importas un extracto](importar.md).

## Duplicados

**Duplicados** busca movimientos que parecen repetidos: misma cuenta, mismo monto y tipo, fechas cercanas y títulos parecidos. Para cada grupo puedes:

- **Conservar el elegido y eliminar el resto**.
- **Fusionar en el elegido**.
- Decir que **No son duplicados**.

## Auditoría de datos

**Auditoría de datos** revisa tus datos y te avisa de cosas raras, como:

- Gastos sin presupuesto.
- Transferencias a las que les falta un lado.
- Movimientos anteriores a la apertura de su cuenta.
- Movimientos programados vencidos.
- Etiquetas que no usas.

## Vistas guardadas

Si siempre filtras tus movimientos de la misma forma (por ejemplo, "gastos con tarjeta de este mes"), guárdalo como **vista**:

1. Arma el filtro y el orden en la tabla.
2. En **Vistas guardadas**, toca **Guardar la vista actual…** y ponle un nombre.
3. Si quieres, marca **Usar al abrir esta pantalla**.

## Bitácora de cambios

En los espacios sincronizados o compartidos, la **Bitácora de cambios** muestra quién cambió qué y cuándo, con el antes y el después. Nadie puede editarla.

## Atajos de teclado

La web se puede usar casi entera con el teclado:

| Teclas | Qué hace |
|---|---|
| **Ctrl+K** | Abre la paleta de comandos. |
| **?** | Muestra todos los atajos de teclado. |
| **g** y una letra | Va a una sección. Por ejemplo, **g p** al plan y **g m** a movimientos. |
| **N** | Registra un movimiento nuevo. |
| **/** | Busca. |
| **Ctrl+Z** | Deshace la última acción. |
| **Ctrl+Mayús+Z** | Rehace. |
