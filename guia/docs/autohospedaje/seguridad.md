# Lista de seguridad

Operar un servidor significa cuidar los datos de otras personas. Revisa esta lista al instalar y de vez en cuando.

## Al instalar

- [ ] El servidor responde **solo por HTTPS**, con tu dominio.
- [ ] `.env` tiene permisos `600` y **no está en ningún repositorio**.
- [ ] Solo los puertos 80 y 443 están abiertos hacia el equipo. La base de datos nunca publica puertos.
- [ ] `CUENCA_SERVIDORES_PERMITIDOS` tiene **solo los servidorId que aceptas**.
- [ ] Si usas una imagen publicada del gateway, va fijada por digest (`@sha256:...`).

## Respaldos

- [ ] Los respaldos corren solos, por ejemplo cada noche con `crontab`.
- [ ] Copias los respaldos **fuera del equipo**.
- [ ] La frase de paso está guardada **fuera del equipo**, en un lugar seguro.
- [ ] Probaste restaurar un respaldo al menos una vez.

## Mantenimiento

- [ ] Actualizas el servidor con `./actualizar.sh` cuando hay una versión nueva del paquete.
- [ ] Mantienes al día el sistema del equipo y Docker.
- [ ] Revisas `./diagnostico.sh` si algo se comporta raro.

## Las personas que alojas

- [ ] Las personas de los espacios que alojas **saben que tú puedes leer sus datos**.
- [ ] Les dijiste cómo cuidas sus datos: quién tiene acceso al equipo, dónde guardas los respaldos y cuánto tiempo los conservas.
- [ ] Sabes qué hacer si una persona te pide borrar sus datos: borrar su cuenta de Cuenca no borra los datos de tu servidor.

## Qué ya hace el paquete por ti

- Los servicios corren con permisos mínimos y con el sistema de archivos de solo lectura.
- El servidor solo acepta permisos firmados por la nube de Cuenca para tu dirección. Un permiso para otro servidor se rechaza.
- Cada permiso vence a los **15 minutos**. Cuando alguien sale de un espacio, pierde el acceso a tu servidor en unos 15 minutos. Los datos que ya tenía en su dispositivo se quedan allí.
- Caddy y el gateway no registran el contenido de las peticiones ni los tokens.
- El gateway limita cada persona a 600 peticiones por minuto, y Caddy rechaza las peticiones de más de 1 MiB.

!!! note "Lo que el paquete no incluye"
    No trae límites de peticiones por dirección IP. Si los necesitas, tienes que configurarlos tú.
