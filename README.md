# Demostración de Componentes Web con Lit y Estándares Nativos

Este proyecto es una exploración práctica de la tecnología de **Web Components**, desarrollada como parte del curso de Desarrollo Web. El objetivo es demostrar la creación de componentes reutilizables, encapsulados y flexibles utilizando dos enfoques:

1.  **Web Components Estándar**: Usando las APIs nativas del navegador (`Custom Elements`, `Shadow DOM`, `HTML Templates`).
2.  **Lit**: Utilizando la librería ligera de Google para simplificar el desarrollo de componentes con un sistema reactivo y plantillas declarativas.

## Componentes Desarrollados

Se crearon dos componentes de interfaz de usuario, cada uno implementado en las dos modalidades mencionadas.

### 1\. Acordeón Interactivo (`<acordeon>`)

Un componente de UI clásico que permite mostrar y ocultar secciones de contenido. La lógica implementada asegura que solo una sección pueda estar abierta a la vez, ideal para secciones de FAQ o menús colapsables.

### 2\. Tarjeta de Suscripción (`<suscripcion>`)

Un componente flexible para mostrar planes de suscripción. Permite una personalización detallada a través de propiedades y slots, incluyendo títulos, precios, descripciones, listas de características y un estilo visual para destacar un plan específico. Es responsivo y se adapta a diferentes tamaños de pantalla.

## Estructura del Proyecto

El repositorio está organizado en carpetas separadas para cada implementación, permitiendo una comparación clara entre los dos enfoques:

```
.
├── acordion-lit/         # Implementación del Acordeón con Lit
├── acordion-standard/    # Implementación del Acordeón con Estándares
├── suscripcion-lit/      # Implementación de la Suscripción con Lit
└── suscripcion-standard/ # Implementación de la Suscripción con Estándares
```

Cada carpeta es un proyecto autocontenido con sus propias dependencias y se puede ejecutar de forma independiente.

## ¿Cómo Ejecutar un Proyecto?

Todos los sub-proyectos utilizan **Vite** como herramienta de desarrollo. Para ejecutar cualquiera de ellos, sigue estos pasos desde tu terminal:

```bash
# 1. Navega a la carpeta del proyecto que deseas ejecutar
# Por ejemplo, para la versión Lit de la suscripción:
cd suscripcion-lit

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Vite te proporcionará una URL local (generalmente `http://localhost:5173`) que puedes abrir en tu navegador para ver el componente en acción.

## Conceptos Clave Demostrados

- **Encapsulación Real con Shadow DOM**: Todos los componentes utilizan Shadow DOM para aislar completamente sus estilos y estructura interna. Esto previene conflictos de CSS con la página principal y hace que los componentes sean robustos y predecibles.

- **Reutilización y Flexibilidad**:

  - La **versión estándar** hace un uso intensivo de `<slot>` para permitir que el usuario inyecte su propio contenido HTML, logrando una gran flexibilidad compositiva.
  - La **versión Lit** demuestra cómo manejar datos complejos (como arreglos de objetos) a través de propiedades, y cómo usar directivas como `map` y `when` para renderizar contenido dinámicamente.

- **Comunicación por Eventos**: Para mantener los componentes desacoplados, la comunicación con el exterior se realiza a través de `CustomEvent`. Por ejemplo, al hacer clic en el botón de una tarjeta de suscripción, esta no realiza ninguna acción, sino que emite un evento `subscribe` que la aplicación principal puede capturar y manejar.

- **Comparativa Estándar vs. Lit**: El proyecto sirve como una comparación directa:

  - **Estándar**: Muestra cómo funcionan las APIs nativas, requiriendo más código manual (boilerplate) para manipular el DOM y gestionar el estado.
  - **Lit**: Demuestra cómo una capa de abstracción con un sistema reactivo simplifica el código, mejora la legibilidad y aumenta la productividad del desarrollador.
