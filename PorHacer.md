
2. **Rutas**:

   - **Autenticación**:
     - `POST /api/users/register`: Registro de nuevos usuarios con bcrypt para encriptar la contraseña.
     - `POST /api/users/login`: Autenticación de usuarios y generación de token JWT.
     - `GET /api/users/profile`: (opcional) Devuelve el perfil del usuario autenticado (protegida con JWT).
   
   - **Gestión de eventos**:
     - `GET /api/events`: Listar todos los eventos deportivos.
     - `GET /api/events/:eventId`: Obtener detalles de un evento específico.
     - `POST /api/events`: Crear un nuevo evento (protegido con JWT).
     - `PUT /api/events/:eventId`: Actualizar un evento existente (protegido con JWT).
     - `DELETE /api/events/:eventId`: Eliminar un evento (protegido con JWT).

   - **Consultas avanzadas**:
     - `GET /api/events/upcoming`: Listar los próximos eventos ordenados por fecha.
     - `GET /api/events?type=futbol`: Filtrar eventos por tipo de deporte.
     - `GET /api/events/date?from=YYYY-MM-DD&to=YYYY-MM-DD`: Filtrar eventos por rango de fechas.





## Autenticación con JWT

1. **Registro (`POST /api/users/register`)**:
   - Recibir `username` y `password`.
   - Usar bcrypt para encriptar la contraseña.
   - Guardar el usuario en la base de datos.

2. **Login (`POST /api/users/login`)**:
   - Recibir `username` y `password`.
   - Verificar las credenciales.
   - Si son correctas, devolver un **token JWT**.

3. **Protección de rutas**:
   - Crear un middleware para verificar el token JWT en las rutas protegidas.
   - El token debe ser enviado en el encabezado de autorización (`Authorization: Bearer <token>`).





## Validaciones y Manejo de Errores

1. Validar que los campos obligatorios en las rutas estén presentes.
2. Validar que las fechas sean correctas.
3. Manejar errores comunes:
   - **404**: Evento no encontrado.
   - **400**: Datos inválidos.
   - **401**: Acceso no autorizado (falta de token JWT).
   - **403**: Token inválido.





## Pruebas y Revisión

1. Probar todas las rutas usando herramientas como **Postman** o **Insomnia**.
2. Asegurarse de que las validaciones y manejo de errores funcionen correctamente.
3. Revisar que las rutas protegidas solo sean accesibles mediante un token JWT válido.








