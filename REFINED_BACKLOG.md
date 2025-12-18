Gema usada para refinar las HU:
https://gemini.google.com/gem/565ef68c7783/621b5c45f884c8b0

# REFINED_BACKLOG.md

## 2.3.10. Historia de Usuario 10
**Identificador único (ID):** US-010

**Título:** Calcular y Simular Tiempo de Preparación de Pedido

**Descripción:** Como orders-producer-node (microservicio de cocina Node.js), quiero calcular y simular el tiempo de preparación estimado para cada pedido, para gestionar el flujo de trabajo de la cocina de manera eficiente.

**Criterios de Aceptación:**

- **Escenario 1:** Cálculo del Tiempo de Preparación
  - Dado que un nuevo pedido es recibido desde RabbitMQ (cola orders.new),
  - Cuando el orders-producer-node lo procesa,
  - Entonces calcula el tiempo de preparación usando el Strategy Pattern y cambia el estado del pedido de "pending" a "preparing".
- **Escenario 2:** Finalización de la Preparación Simulada
  - Dado que un pedido está en estado "preparing",
  - Cuando el tiempo de preparación simulado finaliza,
  - Entonces el estado del pedido cambia a "ready" y se emite un evento ORDER_STATUS_CHANGED vía WebSocket.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-003 - Gestión de Pedidos en Cocina (orders-producer-node)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-009, US-022, US-030
**Versión / Release:** 1.0

---


## 2.3.11. Historia de Usuario 11
**Identificador único (ID):** US-011

**Título:** Actualizar Pedido Existente y Notificar

**Descripción:** Como orders-producer-node (microservicio de cocina Node.js), quiero poder actualizar un pedido existente si se recibe nuevamente, para reflejar cambios en la orden y notificar a los usuarios sobre la modificación.

**Criterios de Aceptación:**

- **Escenario 1:** Procesamiento de Actualización de Pedido
  - Dado que el orders-producer-node recibe un mensaje para un pedido con un ID ya existente,
  - Cuando procesa el mensaje de actualización,
  - Entonces actualiza la orden en MongoDB y emite un evento ORDER_STATUS_CHANGED vía WebSocket al puerto 4000.

**Prioridad / Orden en el Backlog:** Media
**Feature:** FT-003 - Gestión de Pedidos en Cocina (orders-producer-node)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-009, US-017, US-021
**Versión / Release:** 1.1

---


## US-012
**Identificador único (ID):** US-012

**Título:** Autenticación y Control de Acceso por Roles

**Descripción:** Como usuario del sistema (admin, waiter, cook), quiero iniciar sesión de forma segura con mis credenciales y que el sistema asigne permisos según mi rol, para que solo el personal autorizado acceda a las funcionalidades correspondientes y se garantice la seguridad de la información.

**Criterios de Aceptación:**

- **Escenario 1:** Inicio de Sesión y Asignación de Rol
  - Dado que el usuario accede a la interfaz de login (/login),
  - Cuando ingresa sus credenciales y son validadas por el admin-service,
  - Entonces recibe un token JWT y es redirigido a la vista correspondiente: admin → /admin/dashboard, waiter → /mesero, cook → /cocina.
- **Escenario 2:** Acceso Restringido por Rol
  - Dado que un usuario autenticado intenta acceder a una funcionalidad restringida a otro rol,
  - Cuando el api-gateway o admin-service detecta que el rol no tiene permisos,
  - Entonces se deniega el acceso y se muestra un mensaje de error.
- **Escenario 3:** Credenciales Inválidas
  - Dado que el usuario ingresa credenciales incorrectas,
  - Cuando el admin-service rechaza la autenticación,
  - Entonces se muestra un mensaje "Credenciales inválidas" y no se permite el acceso.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-001 - Seguridad y Autenticación (admin-service)
**Épica:** EP-002 - Seguridad y Control de Acceso
**Dependencias:** Ninguna
**Versión / Release:** 1.0

---

## US-013
**Identificador único (ID):** US-013

**Título:** Módulo de Gestión Administrativa Integral

**Descripción:** Como usuario con rol admin, quiero un módulo de gestión donde pueda visualizar el dashboard con el resumen de la operación, gestionar productos, usuarios y configuraciones, para tener control centralizado y eficiente de la administración del restaurante.

**Criterios de Aceptación:**

- **Escenario 1:** Visualización de Dashboard
  - Dado que el usuario admin accede al módulo de gestión (/admin/dashboard),
  - Cuando ingresa a la pestaña de dashboard,
  - Entonces visualiza métricas clave y el resumen de la operación servidas por el admin-service.
- **Escenario 2:** Acceso a Gestión de Productos
  - Dado que el usuario admin está en el módulo de gestión,
  - Cuando selecciona la pestaña de productos (/admin/products),
  - Entonces puede crear, editar y listar productos (ver detalle en la HU correspondiente US-015).
- **Escenario 3:** Acceso a Gestión de Usuarios
  - Dado que el usuario admin está en el módulo de gestión,
  - Cuando selecciona la pestaña de usuarios (/admin/users),
  - Entonces puede crear, editar y listar usuarios administrativos (ver detalle en la HU correspondiente US-014).
- **Escenario 4:** Acceso a Configuración
  - Dado que el usuario admin está en el módulo de gestión,
  - Cuando selecciona la pestaña de configuración (/admin/categories),
  - Entonces puede agregar, editar y listar categorías (ver detalle en la HU correspondiente US-016).

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-009 - Módulo de Gestión Administrativa (orders-producer-frontend + admin-service)
**Épica:** EP-003 - Gestión Administrativa
**Dependencias:** US-012
**Versión / Release:** 1.0


## US-014
**Identificador único (ID):** US-014

**Título:** Gestión de Usuarios Administrativos

**Descripción:** Como usuario con rol admin, quiero crear, editar y listar usuarios administrativos, para gestionar el acceso y los roles (admin, waiter, cook) dentro del sistema.

**Criterios de Aceptación:**

- **Escenario 1:** Creación de Usuario
  - Dado que el usuario admin accede al módulo de usuarios (/admin/users),
  - Cuando ingresa los datos requeridos (name, email, password, roles, active) y guarda,
  - Entonces el usuario es creado en MongoDB vía admin-service y visible en la lista.
- **Escenario 2:** Edición de Usuario
  - Dado que el usuario admin selecciona un usuario existente,
  - Cuando modifica los datos (name, email, roles, active) y guarda,
  - Entonces los cambios se reflejan correctamente en MongoDB y en la interfaz.
- **Escenario 3:** Listado de Usuarios
  - Dado que el usuario admin accede al módulo de usuarios,
  - Cuando la página carga,
  - Entonces visualiza todos los usuarios con sus roles y estado (activo/inactivo).

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-010 - Administración de Usuarios (admin-service)
**Épica:** EP-003 - Gestión Administrativa
**Dependencias:** US-012, US-013
**Versión / Release:** 1.0

---


## US-015
**Identificador único (ID):** US-015

**Título:** Gestión de Productos

**Descripción:** Como usuario con rol admin, quiero crear, editar y listar productos, para mantener actualizado el catálogo de productos del restaurante.

**Criterios de Aceptación:**

- **Escenario 1:** Creación de Producto
  - Dado que el usuario admin accede al módulo de productos (/admin/products),
  - Cuando ingresa los datos requeridos (name, price, description, image, category, enabled) y guarda,
  - Entonces el producto es creado en MongoDB vía admin-service y visible en la lista.
- **Escenario 2:** Edición de Producto
  - Dado que el usuario admin selecciona un producto existente,
  - Cuando modifica los datos (name, price, description, image, category, enabled) y guarda,
  - Entonces los cambios se reflejan correctamente en MongoDB y en la interfaz.
- **Escenario 3:** Listado de Productos
  - Dado que el usuario admin accede al módulo de productos,
  - Cuando la página carga,
  - Entonces visualiza todos los productos con su información y estado (habilitado/deshabilitado).
- **Escenario 4:** Productos Activos para Meseros
  - Dado que un usuario waiter accede a la WaiterPage (/mesero),
  - Cuando la página carga,
  - Entonces solo visualiza productos con enabled=true obtenidos desde fetchActiveProducts().

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-011 - Administración de Productos (admin-service)
**Épica:** EP-003 - Gestión Administrativa
**Dependencias:** US-012, US-013
**Versión / Release:** 1.0

---


## US-016
**Identificador único (ID):** US-016

**Título:** Gestión de Categorías desde Configuración

**Descripción:** Como usuario con rol admin, quiero agregar, editar y listar categorías desde la pestaña de configuración, para organizar los productos de manera eficiente.

**Criterios de Aceptación:**

- **Escenario 1:** Creación de Categoría
  - Dado que el usuario admin accede a la pestaña de configuración (/admin/categories),
  - Cuando ingresa el nombre de la categoría y guarda,
  - Entonces la categoría es creada en MongoDB vía admin-service y visible en la lista.
- **Escenario 2:** Edición de Categoría
  - Dado que el usuario admin selecciona una categoría existente,
  - Cuando modifica el nombre y guarda,
  - Entonces los cambios se reflejan correctamente en MongoDB y en la interfaz.
- **Escenario 3:** Categorías Públicas para Meseros
  - Dado que un usuario waiter accede a la WaiterPage (/mesero),
  - Cuando la página carga,
  - Entonces visualiza las categorías disponibles obtenidas desde fetchPublicCategories() para filtrar productos.

**Prioridad / Orden en el Backlog:** Media
**Feature:** FT-012 - Administración de Categorías (admin-service)
**Épica:** EP-003 - Gestión Administrativa
**Dependencias:** US-012, US-013
**Versión / Release:** 1.0

---



## 2.3.18. Historia de Usuario 18
**Identificador único (ID):** US-018

**Título:** Restricción de Edición para Pedidos en Preparación o Listos

**Descripción:** Como usuario con rol waiter, quiero que el sistema impida la edición de un pedido si ya está en preparación o listo, para evitar inconsistencias y problemas en el flujo de trabajo de la cocina.

**Criterios de Aceptación:**

- **Escenario 1:** Intento de Edición de Pedido en Curso
  - Dado que un pedido tiene el estado "preparing" o "ready",
  - Cuando el usuario waiter intenta editar el pedido a través de la WaiterPage usando EditOrderDialog,
  - Entonces el sistema muestra un mensaje de error ("No se puede editar un pedido en curso") y no permite la modificación.
- **Escenario 2:** Edición Permitida para Pedidos Pendientes
  - Dado que un pedido tiene el estado "pending",
  - Cuando el usuario waiter intenta editar el pedido a través de la WaiterPage,
  - Entonces el sistema permite la edición y actualiza el pedido vía updateOrder() del orderService.

**Prioridad / Orden en el Backlog:** Media
**Feature:** FT-005 - Edición de Pedidos (orders-producer-frontend)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-017
**Versión / Release:** 1.1

---


## 2.3.22. Historia de Usuario 22
**Identificador único (ID):** US-022

**Título:** Almacenar Estrategias de Cálculo de Tiempo en MongoDB

**Descripción:** Como orders-producer-node (microservicio de cocina), quiero almacenar y cargar dinámicamente las implementaciones de código de las estrategias de cálculo de tiempo de preparación desde MongoDB, para permitir la fácil configuración y extensión de las lógicas de negocio sin modificar el código principal.

**Criterios de Aceptación:**

- **Escenario 1:** Carga Dinámica de Estrategias al Iniciar
  - Dado que el orders-producer-node inicia y se conecta a MongoDB (orders_db),
  - Cuando necesita calcular un tiempo de preparación usando el Strategy Pattern,
  - Entonces carga las implementaciones de código de las estrategias de cálculo desde la colección preparation_times en MongoDB.
- **Escenario 2:** Configuración de Tiempos por Producto
  - Dado que existe una colección preparation_times en MongoDB,
  - Cuando el orders-producer-node procesa un pedido con productos específicos,
  - Entonces utiliza los secondsPerUnit configurados para cada productName para calcular el tiempo total de preparación.

**Prioridad / Orden en el Backlog:** Media
**Feature:** FT-007 - Persistencia de Datos con MongoDB (orders-producer-node)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-021, US-030
**Versión / Release:** 1.0

---

## US-017
**Identificador único (ID):** US-017

**Título:** Toma de Pedidos por Mesero

**Descripción:** Como usuario con rol waiter, quiero tomar pedidos seleccionando productos, especificando cantidades y agregando notas, para registrar las órdenes de los clientes de manera eficiente.

**Criterios de Aceptación:**

- **Escenario 1:** Selección de Productos
  - Dado que el usuario waiter accede a la WaiterPage (/mesero),
  - Cuando selecciona productos del catálogo filtrado por categorías,
  - Entonces los productos se agregan al carrito con la cantidad especificada.
- **Escenario 2:** Envío de Pedido
  - Dado que el usuario waiter tiene productos en el carrito y ha ingresado customerName y table,
  - Cuando presiona "Enviar pedido",
  - Entonces el pedido se envía al orders-producer-python vía POST /api/v1/orders/ y se limpia el carrito.
- **Escenario 3:** Validación de Campos Requeridos
  - Dado que el usuario waiter intenta enviar un pedido,
  - Cuando el customerName está vacío o no hay productos en el carrito,
  - Entonces el botón "Enviar pedido" permanece deshabilitado.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-004 - Toma de Pedidos (orders-producer-frontend)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-015, US-016
**Versión / Release:** 1.0

---

## US-019
**Identificador único (ID):** US-019

**Título:** Visualización de Pedidos en Cocina

**Descripción:** Como usuario con rol cook, quiero visualizar los pedidos en tiempo real organizados por estados, para gestionar eficientemente el flujo de trabajo de la cocina.

**Criterios de Aceptación:**

- **Escenario 1:** Visualización de Pedidos por Estado
  - Dado que el usuario cook accede a la KitchenPage (/cocina),
  - Cuando la página carga,
  - Entonces visualiza los pedidos organizados en pestañas: All, Nueva Orden, Preparando, Listo, Finalizada, Cancelada.
- **Escenario 2:** Actualización en Tiempo Real
  - Dado que el usuario cook está en la KitchenPage,
  - Cuando llega un nuevo pedido o cambia el estado de un pedido existente,
  - Entonces la interfaz se actualiza automáticamente vía WebSocket (puerto 4000) sin necesidad de recargar.
- **Escenario 3:** Cambio de Estado de Pedidos
  - Dado que el usuario cook visualiza un pedido,
  - Cuando hace clic en "Iniciar Cocción", "Marcar como Listo" o "Completar",
  - Entonces el estado del pedido cambia y se notifica vía WebSocket a todos los usuarios conectados.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-006 - Visualización de Cocina (orders-producer-frontend)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** US-010, US-011
**Versión / Release:** 1.0

---

## US-020
**Identificador único (ID):** US-020

**Título:** Procesamiento de Pedidos vía RabbitMQ

**Descripción:** Como orders-producer-python (microservicio de pedidos), quiero recibir pedidos HTTP, validarlos y publicarlos en RabbitMQ, para asegurar la comunicación asíncrona con el microservicio de cocina.

**Criterios de Aceptación:**

- **Escenario 1:** Recepción y Validación de Pedidos
  - Dado que llega un pedido vía POST /api/v1/orders/,
  - Cuando el orders-producer-python valida los datos usando Pydantic (OrderIn),
  - Entonces genera un ID único, timestamp y publica el mensaje en la cola orders.new de RabbitMQ.
- **Escenario 2:** Validación de Datos Requeridos
  - Dado que llega un pedido con customerName vacío o items vacíos,
  - Cuando el orders-producer-python valida los datos,
  - Entonces retorna un error 422 con el mensaje de validación correspondiente.
- **Escenario 3:** Respuesta Exitosa
  - Dado que un pedido es procesado exitosamente,
  - Cuando el orders-producer-python publica el mensaje en RabbitMQ,
  - Entonces retorna el pedido completo con id y createdAt al cliente.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-002 - Procesamiento de Pedidos (orders-producer-python)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** Ninguna
**Versión / Release:** 1.0

---

## US-021
**Identificador único (ID):** US-021

**Título:** API Gateway y Enrutamiento de Servicios

**Descripción:** Como api-gateway, quiero enrutar las peticiones HTTP a los microservicios correspondientes, para proporcionar un punto de entrada único y centralizado al sistema.

**Criterios de Aceptación:**

- **Escenario 1:** Enrutamiento de Pedidos
  - Dado que llega una petición a /api/orders/*,
  - Cuando el api-gateway la procesa,
  - Entonces la redirige al orders-producer-python (puerto 8000) con el timeout y reintentos configurados.
- **Escenario 2:** Enrutamiento de Cocina
  - Dado que llega una petición a /api/kitchen/*,
  - Cuando el api-gateway la procesa,
  - Entonces la redirige al orders-producer-node (puerto 3002) con el timeout y reintentos configurados.
- **Escenario 3:** Enrutamiento de Administración
  - Dado que llega una petición a /api/admin/*,
  - Cuando el api-gateway la procesa,
  - Entonces la redirige al admin-service (puerto 4001) con autenticación JWT.
- **Escenario 4:** Manejo de Errores de Microservicios
  - Dado que un microservicio no responde o retorna error,
  - Cuando el api-gateway detecta el fallo,
  - Entonces aplica la lógica de reintentos y retorna un error apropiado al cliente.

**Prioridad / Orden en el Backlog:** Alta
**Feature:** FT-008 - API Gateway (api-gateway)
**Épica:** EP-001 - Automatización y Optimización de la Gestión de Pedidos
**Dependencias:** Ninguna
**Versión / Release:** 1.0

---