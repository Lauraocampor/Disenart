# Resúmenes de Scrum Weekly

> SPRINT #5_02

- Desiree Holowiniec

1. Estuve trabajando en las vistas de profile, editProfile, allUsers y profileDetail.

2. Me surgieron problemas mas que nada con la parte de edicion.

3. Investigué un poco cómo hacer para que el usuario siga loggeado cuando se actualizan los datos pero no pude resolverlo. Hay que volver a iniciar sesión cuando se cambian los datos del usuario.

4. Otro problema al momento de editar/actualizar fue la contraseña, al ser eliminada no la podía requerir y se sobrescribia el json sin la contraseña. Momentaneamente comenté la línea que elimina la contraseña.

5. Al momento de configurar el css de allUsers para que aparezcan usuarios en fila cuando se agranda la pantalla, no funcionaba. Fue un tema de que estaba mal cerrado el forEach.

6. Hay un problema de que en todos los res.render necesitamos exportar el userToLogged porque sino se rompe el código, creo que el problema viene del ejs del header. Lo solucionaremos bien para el próximo sprint.

- Juan Diego Marín

1. Tuve unas cuestiones personales así que durante este sprint no hice mucho. Me comprometí a hacer los pendientes del trello en el sprint de base de datos. También integramos ESlint y prettier a nuestro proyecto para mantener un formato consistente.

2. Para el sprint de API haré colaboraciones mas sustaciales.

3. Tuve problemas para manejar el tiempo pero ya lo resolví.

- Mercedes Lavezzolo

1. Realicé toda la parte del login del usuario, manteniendo activa la sesión. Todavía tenemos problemas con los modales.

- Laura Ocampo

1. Configuré las rutas para los users que estaban logueados y no logueados.

2. Intenté darle uso a los modales, sin embargo se presentaban inconvenientes cuando se realizaba el post. Por ello, a medida que avancemos en el proyecto continuaré investigando cómo evitar que se cierren los modales y se puedan mostrar los errores de validación.

> SPRINT #5_01

- Desiree Holowiniec

1. De momento no he avanzado con mis tareas. Planeo terminarlas la semana siguiente.

- Juan Diego Marín

1. Esta semana terminé de ponerme al día con el contenido del módulo de express.
2. La siguiente semana planeo implementar las rutas con redirección según el estado de login. También haré unos ajustes a los estilos del componente header.

- Mercedes Lavezzolo

1. Implemente el sistema de sesiones y cookies.
2. Queda pendiente el componente de perfil de usuario que ira en el header.

- Laura Ocampo

1. Se configuró la validación de usuarios y edité el json según lo solicitado en el sprint.
2. También implementé el sistema de subida de imágenes con multer y la encriptación con bcryptjs.
3. Queda pendiente mover el código al modal y trabajar desde ahí.

> SPRINT #4_02

- Desiree Holowiniec

1. Estuve trabajando en las vistas específicas de los productos y también con la función de delete.
2. Armé la página de error 404 y sumé diferentes imágenes a los productos.
3. De momento no hemos asignado tareas porque hasta unos días haremos el próximo sprint.

- Juan Diego Marín

1. Pulí el header y el footer. Trabajé en los documentos de scrum, e implementé un sistema de búsqueda con expresiones regulares.
2. No he tenido dificultades notorias.
3. No tengo tareas asignada pues nos falta analizar el sprint.

- Mercedes Lavezzolo

1. Trabajé en mejorar partes del diseño y el routing. También implemente persistencia en la imagen de un producto cuando este es actualizado pero no hay reemplazo.
2. No he tenido dificultados de momento.
3. Aún no hemos asignado tareas para el próximo sprint.

- Laura Ocampo

1. No hice muchos cambios esta semana pues había adelantado mis tareas la semana anterior.
2. No tengo dificultades hasta ahora
3. Quiero implementar las validaciones necesarias a mis formularios antes que termine la clase.

> SPRINT #4_01

Los integrantes del grupo número seis se reunieron para compartir sus avances respecto a las tareas del cuarto sprint.

- Desiree Holowiniec

1. Por el momento no había avanzado con mis tareas asignadas. Me dedicaré a realizarlas el fin de semana.
2. Por el momento no he tenido dificultades, pero avisaré a mis compañeros en caso de que surjan.

- Juan Diego Marín

1. Hice el modal de búsqueda y terminé de implementar el menú de hamburguesa.
2. Planeo implementar la página de resultados y las rutas pendientes.
3. De momento no he tenido ninguna dificultad.

- Mercedes Lavezzolo

1. Terminé de crear la base de datos de los productos.
2. Armé los modelos, rutas, vista y controladores de la página EditProduct.
3. Terminé mis tareas satisfactoriamente y no se me presentó dificultad alguna.

- Laura Ocampo

1. Hice la base de datos de usuarios.
2. Realicé las rutas, modelos y controladores para la creación de productos.
3. No encontré dificultad para terminar las tareas asignadas.

> SPRINT #3

Cada uno de los integrantes del equipo hizo un pequeño reporte sobre las tareas que tiene pendientes:

- Desiree Holowiniec

1. Seguimos avanzando con la actividad iniciada ayer en clase de implementación de ejs, rutas y controladores.
2. No inicié el formulario de crear y editar productos para ver si hay que sumar alguna funcionalidad la próxima clase.

- Juan Diego Marín

1. Mi último push fue sobre unas ediciones al header y el footer. Quiero participar más en el próximo sprint.
2. Tengo unos problemas con el git pero ya los resolví.
3. Crearé los parciales del header y el footer el fin de semana.
4. Trabajaremos en el ruteo de manera grupal.

- Mercedes Lavezzolo

1. Decidimos continuar trabajando en grupo para organizar los temas del sprint.
2. Trabajaré normalizando los class e ids.

- Laura Ocampo

1. Agregaré páginas de login y register.
2. Separaré las vistas.
3. Trabajaremos en grupo para el seteo de las páginas.

- Israel Urcola

1. Voy a hacer los controladores.
