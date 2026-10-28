# Autohospedaje

El **autohospedaje** te permite guardar los datos de tus espacios en un **servidor propio**: uno que operas tú o alguien de tu confianza. Tu cuenta y el inicio de sesión siguen en la nube de Cuenca, pero las cuentas, los movimientos y los presupuestos de esos espacios viven en tu servidor.

Esta sección es para quien va a **instalar y operar** el servidor. Necesitas sentirte cómodo con una terminal de Linux y con Docker.

!!! warning "Todavía no está disponible en la app"
    El paquete del servidor ya existe, pero la app todavía no permite registrar un servidor ni guardar un espacio en él. Esa pantalla llegará en una próxima versión. Mientras tanto, puedes instalar el servidor y probarlo, pero todavía no puedes alojar espacios en él.

## Qué ganas y qué cambia

| | Con tu propio servidor |
| --- | --- |
| **Dónde viven tus datos** | Las cuentas, los movimientos y los presupuestos del espacio viven en **tu servidor**. Viajan entre tus dispositivos y tu servidor; los datos del libro del espacio no pasan por la nube de Cuenca. |
| **Qué sigue en la nube de Cuenca** | Tu cuenta y tus sesiones, las personas de cada espacio con sus permisos y sus nombres, el nombre y los datos básicos de cada espacio (como su moneda) y la lista que dice en qué servidor vive cada espacio. Los datos del libro del espacio no pasan por la nube. |
| **Costo** | Alojar un servidor es gratis. No hay un número máximo de servidores por persona. |
| **Tu responsabilidad** | Tú haces los respaldos, las actualizaciones y cuidas la seguridad del servidor. Cuenca no lo opera ni lo administra. |

La nube de Cuenca no se conecta a tu servidor: son los dispositivos los que hablan con él.

!!! danger "Quien opera el servidor puede leer los datos que aloja"
    Los datos de cada espacio quedan en la base de datos de tu servidor, y quien lo opera puede leerlos todos. Si alojas espacios de tu familia o de tus amigos, **tú podrás ver sus movimientos y sus saldos**. Aloja solo espacios cuyas personas confíen en ti, y antes de unirte al espacio de otra persona, asegúrate de que confías en quien opera su servidor.

## El camino completo

1. Revisa los [requisitos](requisitos.md): un equipo Linux con Docker, un dominio y los puertos 80 y 443 abiertos.
2. [Consigue el paquete del servidor](conseguir-el-paquete.md).
3. Instálalo con la [instalación guiada](instalacion.md) (recomendada) o con la [instalación manual](instalacion-manual.md).
4. Registra el servidor en la app de Cuenca. *Llegará en una próxima versión.*
5. Programa los [respaldos](respaldos.md) y revisa la [lista de seguridad](seguridad.md).

## Para mantenerlo

- [Actualizar el servidor](actualizar.md)
- [Respaldos y restauración](respaldos.md)
- [Diagnóstico](diagnostico.md)
- [Lista de seguridad](seguridad.md)
- [Problemas frecuentes](problemas-frecuentes.md)
