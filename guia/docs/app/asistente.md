# El asistente

Cuenca tiene un asistente con inteligencia artificial que te ayuda a registrar movimientos y a entender tus datos. Funciona distinto en la web y en el teléfono:

- En la **web**, es un **chat**: le escribes y te responde.
- En el **teléfono**, es un **asistente de voz** que usas desde el [reloj](reloj-y-atajos.md).

En los dos casos, **nada se guarda hasta que lo confirmas**.

## Lo que necesitas: una clave

El asistente usa un servicio de inteligencia artificial externo. Para usarlo, necesitas una clave de ese servicio, que consigues en la página del proveedor. Cuenca la guarda **solo en tu dispositivo**: no se sincroniza ni entra en los respaldos.

=== "En el teléfono"

    El asistente de voz usa **Gemini**, de Google. La clave se consigue en Google AI Studio.

    1. Ve a **Más → Configuraciones**.
    2. En **Asistente de voz**, toca **Clave y modelo**.
    3. Pega tu **Clave de API de Gemini** y toca **Verificar clave**.
    4. Toca **Guardar clave** y elige un **Modelo**.

=== "En la web"

    El chat puede usar **Gemini**, **OpenAI** o **Claude**.

    1. Ve a **Configuración**, a la sección **Asistente de voz**.
    2. Elige el **Proveedor activo**.
    3. Pega la clave, toca **Verificar clave** y luego **Guardar clave**.
    4. Elige un **Modelo**.

Para borrarla, toca **Quitar clave**.

## El chat (en la web)

Abre **Asistente** en el menú lateral y escribe lo que necesitas. Algunos ejemplos que la propia app te sugiere:

- "Hazme un reporte de mis gastos por mes de los últimos seis meses."
- "Propón cómo asignar mi presupuesto de este mes."
- "Busca movimientos inusuales de los últimos tres meses."
- "Propón un perfil de préstamo con cuota nivelada a 12 meses."

El asistente responde con propuestas concretas:

- Un **reporte**, que puedes guardar con **Guardar en tablero**.
- Un **Presupuesto propuesto**, con cuánto asignar a cada presupuesto y por qué.
- Un **Movimiento propuesto**, listo para registrar.
- Un **perfil de préstamo**, con su tabla de cuotas.

Cada propuesta tiene **Confirmar** y **Descartar**. Hasta que no tocas **Confirmar**, nada cambia en tu plan.

Pulsa **Enter** para enviar y **Shift+Enter** para escribir otra línea. Usa **Nueva conversación** para empezar de cero.

## La voz (en el teléfono y el reloj)

Con la clave de Gemini guardada, puedes hablarle a tu reloj: "Gasté 35 bolivianos en el almuerzo". El teléfono entiende lo que dijiste y te muestra el movimiento para que lo confirmes. También puedes hacerle preguntas, como "¿cuánto me queda para comida?".

Todo esto se explica en [El reloj y los atajos](reloj-y-atajos.md).

## Consejos

- Revisa siempre la propuesta antes de confirmar: el asistente puede equivocarse de presupuesto o de cuenta.
- El servicio de inteligencia artificial puede tener costo según tu proveedor. Revisa sus condiciones.
