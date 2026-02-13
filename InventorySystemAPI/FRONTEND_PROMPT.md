# PROMPT COMPLETO PARA GENERAR FRONTEND - SISTEMA DE INVENTARIO

## 📋 DESCRIPCIÓN DEL PROYECTO

**Nombre:** InventorySystemAPI - Sistema de Gestión de Inventario

**Propósito:** API REST para gestionar productos de un inventario. Permite crear, leer, actualizar y eliminar productos (CRUD).

**Tecnología del Backend:** Spring Boot (Java) + MySQL + JPA/Hibernate

**Base URL:** `http://localhost:8080/api/v1/products`

---

## 🗄️ ESTRUCTURA DE DATOS

### Modelo de Producto (Product)

| Campo              | Tipo          | Requerido     | Validaciones           |
| ------------------ | ------------- | ------------- | ---------------------- |
| id                 | Long          | Auto-generado | -                      |
| productName        | String        | Sí            | 1-100 caracteres       |
| productDescription | String        | No            | Máximo 300 caracteres  |
| productPrice       | BigDecimal    | Sí            | Mayor a 0, 2 decimales |
| productCategory    | String        | Sí            | -                      |
| productStock       | Integer       | Sí            | Mayor o igual a 0      |
| createdAt          | LocalDateTime | Auto-generado | -                      |

---

## 🔗 ENDPOINTS DE LA API

### 1. OBTENER TODOS LOS PRODUCTOS

- **Método:** GET
- **URL:** `/api/v1/products`
- **Response (200 OK):**

```json
[
  {
    "id": 1,
    "productName": "Laptop Dell XPS 15",
    "productDescription": "Computadora portátil de alta gama",
    "productPrice": 1299.99,
    "productCategory": "Electrónica",
    "productStock": 25,
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

### 2. OBTENER PRODUCTO POR ID

- **Método:** GET
- **URL:** `/api/v1/products/{id}`
- **Parámetro:** `id` (Long) - ID del producto
- **Response (200 OK):**

```json
{
  "id": 1,
  "productName": "Laptop Dell XPS 15",
  "productDescription": "Computadora portátil de alta gama",
  "productPrice": 1299.99,
  "productCategory": "Electrónica",
  "productStock": 25,
  "createdAt": "2024-01-15T10:30:00"
}
```

- **Error (404 Not Found):** Producto no encontrado

### 3. CREAR PRODUCTO

- **Método:** POST
- **URL:** `/api/v1/products`
- **Request Body:**

```json
{
  "productName": "Mouse Inalámbrico Logitech",
  "productDescription": "Mouse Bluetooth con alta precisión",
  "productPrice": 49.99,
  "productCategory": "Accesorios",
  "productStock": 100
}
```

- **Response (201 Created):**

```json
{
  "id": 2,
  "productName": "Mouse Inalámbrico Logitech",
  "productDescription": "Mouse Bluetooth con alta precisión",
  "productPrice": 49.99,
  "productCategory": "Accesorios",
  "productStock": 100,
  "createdAt": "2024-01-15T11:00:00"
}
```

- **Errores (400 Bad Request):** Validaciones fallidas

### 4. ACTUALIZAR PRODUCTO

- **Método:** PATCH
- **URL:** `/api/v1/products/{id}`
- **Parámetro:** `id` (Long) - ID del producto
- **Request Body:** (mismos campos que crear, todos opcionales)

```json
{
  "productName": "Mouse Inalámbrico Logitech MX",
  "productStock": 75
}
```

- **Response (200 OK):** Producto actualizado completo
- **Error (404 Not Found):** Producto no encontrado

### 5. ELIMINAR PRODUCTO

- **Método:** DELETE
- **URL:** `/api/v1/products/{id}`
- **Parámetro:** `id` (Long) - ID del producto
- **Response (200 OK):** `"Product with id:{id} have been deleted"`
- **Error (404 Not Found):** Producto no encontrado

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### Estilo Visual: MINIMALISTA + FUTURISTA + ELEGANTE

#### Paleta de Colores

- **Fondo principal:** Negro profundo (#0a0a0a) o gris muy oscuro (#121212)
- **Fondo secundario:** Gris oscuro (#1a1a1a) con efecto glassmorphism
- **Acentos:**
  - Primario: Cyan neón (#00f5ff) o turquesa (#00d4ff)
  - Secundario: Violeta neón (#b347d9) o púrpura (#8b5cf6)
  - Éxito: Verde neón (#00ff88)
  - Peligro: Rojo neón (#ff4757)
  - Advertencia: Amarillo dorado (#ffd700)

#### Tipografía

- **Títulos:** Sans-serif moderno, bold, espaciado generoso (Inter, Roboto, SF Pro)
- **Cuerpo:** Sans-serif legible, tamaño base 14-16px
- **Monospace:** Para precios y datos numéricos (JetBrains Mono, Fira Code)

#### Efectos Visuales

- **Glassmorphism:** Fondos translúcidos con blur (backdrop-filter: blur(10px))
- **Bordes sutiles:** 1px con gradiente sutil
- **Sombras:** Suaves, difusas, con glow neón
- **Transiciones:** Smooth, 0.3s ease-out
- **Animaciones:** Fade in, slide up, scale subtle

#### Componentes UI Recomendados

##### 1. **Sidebar/Navegación**

- Fondo oscuro translúcido
- Iconos minimalistas con glow al hover
- Texto con opacidad reducida, 100% al hover
- Efecto de línea divisora con gradiente

##### 2. **Tabla de Productos**

- Sin bordes visibles, solo separadores sutiles
- Filas con hover effect: sutil cambio de color + borde izquierdo
- Encabezados con tipografía uppercase, tracking wide
- Scrollbar personalizado, minimalista
- Acciones (editar, eliminar) con iconos y tooltip

##### 3. **Tarjetas de Producto**

- Borde sutil con gradiente cyan/púrpura
- Efecto de brillo en hover
- Badge de categoría con glow
- Precio grande, destacado, con fuente monospace

##### 4. **Formularios**

- Inputs sin borde, solo línea inferior
- Label flotante al focus
- Focus glow: cyan/verde
- Botones con gradiente y efecto hover luminosity
- Errores con animación shake sutil

##### 5. **Estadísticas/KPIs**

- Números grandes, bold, con gradiente de texto
- Iconos con background translúcido
- Sparklines o mini gráficos de tendencia

##### 6. **Modal/Dialog**

- Fondo backdrop blur intenso
- Borde con gradiente
- Animación slide up + scale

---

## 📱 RESPONSIVE DESIGN

- **Mobile:** Menú hamburguesa, cards en grid 1 columna, touch-friendly
- **Tablet:** Grid 2 columnas, sidebar colapsable
- **Desktop:** Grid 3-4 columnas, sidebar expandido

---

## ✨ FEATURES REQUERIDAS

1. **Dashboard con métricas**
   - Total productos
   - Valor total del inventario
   - Productos con stock bajo
   - Categorías más populares

2. **Listado de productos** con:
   - Búsqueda en tiempo real
   - Filtros por categoría
   - Ordenamiento (nombre, precio, stock)
   - Paginación infinita o tradicional

3. **Gestión de productos**
   - Crear producto con validación visual
   - Editar producto (modal o página)
   - Eliminar con confirmación
   - Duplicar producto

4. **Indicadores visuales**
   - Stock bajo (< 10): Badge rojo/naranja con pulse
   - Stock cero: Badge gris con línea
   - Producto nuevo (< 7 días): Badge "NEW" con glow

5. **Exportación/Importación**
   - Exportar a CSV/Excel
   - Importar desde CSV

---

## 🛠️ STACK TECNOLÓGICO SUGERIDO

### Opción 1: React + Tailwind CSS

- React 18+
- Tailwind CSS con configuración custom
- Framer Motion para animaciones
- React Query para estado del servidor
- Lucide React o Heroicons para iconos

### Opción 2: Vue 3 + Tailwind CSS

- Vue 3 con Composition API
- Tailwind CSS
- VueUse para composables
- Motion One para animaciones

### Opción 3: Vanilla JS + CSS Moderno

- ES6+ modules
- CSS custom properties
- Intersection Observer para animaciones al scroll

### Opción 4: Next.js + Tailwind CSS

- Next.js 14+ (App Router)
- Tailwind CSS
- Shadcn/UI como base de componentes

---

## 🎯 EJEMPLO DE CÓDIGO CSS (Tailwind config extendido)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#1a1a1a",
        primary: "#00f5ff",
        secondary: "#8b5cf6",
        success: "#00ff88",
        danger: "#ff4757",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 245, 255, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
      },
    },
  },
};
```

---

## 📝 NOTAS ADICIONALES

1. **Loading States:** Skeleton loaders con efecto shimmer
2. **Error Handling:** Toast notifications con diseño minimalista
3. **Empty States:** Ilustraciones minimalistas + texto amigable
4. **Accesibilidad:** Alto contraste, keyboard navigation, focus visible
5. **Performance:** Lazy loading de imágenes, code splitting

---

## 🚀 PROMPT PARA IA GENERATIVA

Puedes usar este prompt resumido para generar el código:

> "Crea un frontend minimalista y futurista para un sistema de inventario usando React y Tailwind CSS. La API REST está en `http://localhost:8080/api/v1/products`. Incluye: dashboard con KPIs, tabla de productos con búsqueda/filtros/ordenamiento, formularios para crear/editar productos, y animaciones suaves con glassmorphism. Usa colores oscuros (#0a0a0a), acentos cyan neón (#00f5ff) y púrpura (#8b5cf6), tipografía Inter, y efectos de glow. Los componentes deben tener bordes sutiles, transiciones smooth, y un diseño elegante y moderno."

---

## 📁 ARCHIVOS DEL PROYECTO

- Backend: `src/main/java/com/andres/inventorysystemapi/`
- Controlador: `products/controllers/ProductController.java`
- Modelos: `products/model/Product.java`
- DTOs: `products/dto/InProductDto.java`, `OutProductDto.java`
- Configuración: `application.properties`
