# Diagnóstico

Si algo no funciona, `diagnostico.sh` imprime un informe del estado de tu servidor. **Solo lee**: no arranca, no detiene, no descarga ni escribe nada.

Desde `deploy/tercero/`:

```sh
./diagnostico.sh
```

## Qué revisa

| Sección | Qué muestra |
| --- | --- |
| Equipo | El sistema, las versiones de Docker y Compose, la memoria y el disco libre. |
| Configuración | Los permisos de `.env`, si cada contraseña está definida (sin mostrarla) y el resto de la configuración. |
| Contenedores | El estado y la salud de cada servicio. |
| Acceso público | La respuesta del servidor a través de Caddy y el certificado HTTPS. |
| Claves públicas de la nube | Si el servidor llega a las claves que necesita para comprobar los permisos. |
| Errores recientes | Los errores de los registros de cada servicio. |
| Resumen | Cuántos problemas encontró. Cada uno aparece en el informe con la palabra `PROBLEMA`. |

## ¿Puedo pegarlo al pedir ayuda?

Sí. El informe tapa las contraseñas, los tokens y las credenciales de las direcciones de conexión: aparecen como `[secreto]`. Por eso puedes pegarlo al pedir ayuda.

Igual, léelo antes de compartirlo. El informe sí muestra tu dominio, tus servidorId y la configuración que no es secreta.

!!! tip "Si la instalación falló"
    Cuando un servicio no llega a estar sano, `instalar.sh` ya muestra su estado y sus últimos registros, con los secretos tapados. Para el informe completo, ejecuta `./diagnostico.sh`.
