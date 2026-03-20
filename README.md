# Carrito App - Frontend

Aplicación de carrito de compras construida con React y Vite.

## Descripción

Frontend que permite:
- Ver productos con paginación
- Agregar productos al carrito
- Gestionar cantidades en el carrito
- Validación de stock en tiempo real
- Notificaciones de éxito y error

## Requisitos Previos

- **Node.js** v18 o superior
- **npm** o **yarn**

## Instalación

```bash
# Clonar el repositorio
cd carrito-app

# Instalar dependencias
npm install
```

## Configuración

Crear el archivo `.env` en la raíz del proyecto:

```env
# URL del backend (por defecto: http://localhost:3000/api)
VITE_API_URL=http://localhost:3000/api
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Producción
```bash
npm run build
npm run preview
```

## Funcionalidades

### Página de Productos
- Lista de productos con paginación
- Información de cada producto (nombre, precio, descuento, imagen)
- Botón para agregar al carrito

### Página del Carrito
- Lista de productos agregados
- Edición de cantidades con validación de stock
- Eliminación de productos
- Resumen del pedido (subtotal, total)
- Notificaciones de error cuando se supera el stock

### Notificaciones
El sistema muestra notificaciones en la esquina inferior derecha:
- **Verde**: Operaciones exitosas
- **Roja**: Errores (ej: stock insuficiente)

## Estructura del Proyecto

```
src/
├── main.jsx                  # Punto de entrada
├── App.jsx                   # Componente principal con rutas
├── api/
│   ├── axios.js              # Configuración de Axios
│   ├── cartService.js        # Servicio para operaciones del carrito
│   └── productService.js     # Servicio para productos
├── components/
│   ├── cart/                 # Componentes del carrito
│   │   ├── CartItem.jsx     # Item individual del carrito
│   │   ├── CartList.jsx     # Lista de items
│   │   └── CartSummary.jsx  # Resumen del pedido
│   ├── common/               # Componentes reutilizables
│   │   ├── ErrorMessage/    # Mensaje de error
│   │   ├── Loading/         # Indicador de carga
│   │   └── Pagination/      # Componente de paginación
│   ├── layout/               # Layout principal
│   │   ├── Header.jsx       # Encabezado
│   │   ├── Layout.jsx       # Diseño base
│   │   └── Sidebar.jsx      # Barra lateral
│   └── products/             # Componentes de productos
│       ├── ProductCard.jsx  # Tarjeta de producto
│       └── ProductList.jsx  # Lista de productos
├── context/
│   └── CartContext.jsx      # Contexto global del carrito
├── hooks/
│   └── useProducts.js       # Hook personalizado para productos
├── pages/
│   ├── HomePage.jsx         # Página de productos
│   ├── CartPage.jsx         # Página del carrito
│   └── NotFoundPage.jsx    # Página 404
└── utils/
    ├── constants.js         # Constantes de la aplicación
    └── formatters.js        # Funciones de formateo
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar build de producción |
| `npm run lint` | Verificar código con ESLint |

## Dependencias Principales

- **React** - Librería de UI
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Vite** - Bundler y servidor de desarrollo
- **CSS Modules** - Estilos scoped

## Integración con Backend

El frontend se comunica con el backend a través de la API REST. Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.

### URLs por defecto:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
