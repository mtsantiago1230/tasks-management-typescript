# 📋 Aplicación de Gestión de Tareas en TypeScript

Este proyecto es una aplicación completa de gestión de tareas desarrollada en **TypeScript** para aprender los conceptos fundamentales del lenguaje. Te explicaré cada parte detalladamente.

## 🎯 ¿Qué aprenderás?

Este proyecto te enseñará:

- **Tipos e Interfaces**: Cómo definir la estructura de datos
- **Enums**: Cómo crear conjuntos de valores constantes
- **Clases**: Cómo crear objetos con métodos y propiedades
- **Generics**: Cómo crear funciones y tipos reutilizables
- **Validación**: Cómo asegurar que los datos sean correctos
- **Patrones de diseño**: Singleton, Factory, etc.
- **Manejo de errores**: Cómo gestionar errores de forma segura

## 🚀 Conceptos de TypeScript que verás

### 1. **Tipos Básicos**
```typescript
// Tipos primitivos
let title: string = "Mi tarea";
let completed: boolean = false;
let priority: number = 1;

// Arrays
let tags: string[] = ["urgente", "trabajo"];
let numbers: Array<number> = [1, 2, 3];
```

### 2. **Interfaces** (Contratos de datos)
```typescript
interface ITask {
  id: string;
  title: string;
  description?: string; // El ? hace que sea opcional
  priority: TaskPriority;
  status: TaskStatus;
}
```

### 3. **Enums** (Conjuntos de valores constantes)
```typescript
enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
```

### 4. **Clases** (Plantillas para objetos)
```typescript
class TaskManager {
  private tasks: Map<string, ITask> = new Map();
  
  public createTask(taskData: ICreateTask): IOperationResult<ITask> {
    // Lógica aquí
  }
}
```

### 5. **Generics** (Tipos reutilizables)
```typescript
interface IOperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

## 📁 Estructura del Proyecto

```
typescript/
├── src/
│   ├── types/
│   │   └── index.ts          # Definición de tipos e interfaces
│   ├── utils/
│   │   ├── formatters.ts     # Utilidades de formateo
│   │   └── validators.ts     # Utilidades de validación
│   ├── TaskManager.ts        # Clase principal
│   └── index.ts             # Archivo principal
├── package.json             # Configuración del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── README.md              # Este archivo
```

## 🔧 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Compilar el proyecto
```bash
npm run build
```

### 3. Ejecutar la aplicación
```bash
npm run dev
```

### 4. Ejecutar la versión compilada
```bash
npm start
```

## 📚 Explicación Detallada de Cada Archivo

### `src/types/index.ts` - Definición de Tipos

Este archivo define **todos los tipos** que usa la aplicación:

- **Enums**: `TaskPriority` y `TaskStatus` - Conjuntos de valores constantes
- **Interfaces**: `ITask`, `ICreateTask`, etc. - Estructuras de datos
- **Types**: `TaskId`, `SortOption` - Alias de tipos

**¿Por qué usar interfaces?**
- Definen un "contrato" que los objetos deben cumplir
- TypeScript verifica que los objetos tengan las propiedades correctas
- Mejoran la documentación del código

### `src/TaskManager.ts` - Lógica de Negocio

Esta clase maneja **toda la lógica** de la aplicación:

- **Patrón Singleton**: Asegura una sola instancia
- **Métodos públicos**: Para operaciones CRUD
- **Métodos privados**: Para lógica interna
- **Manejo de errores**: Con tipos seguros

**Conceptos importantes:**
- `private` vs `public`: Control de acceso
- `static`: Métodos que pertenecen a la clase, no a las instancias
- `Map<TKey, TValue>`: Estructura de datos tipada

### `src/utils/formatters.ts` - Formateo de Datos

Utilidades para **mostrar datos** de forma bonita:

- Formateo de fechas
- Emojis para prioridades y estados
- Texto formateado para consola

**¿Por qué separar el formateo?**
- Separación de responsabilidades
- Reutilización de código
- Fácil mantenimiento

### `src/utils/validators.ts` - Validación de Datos

Asegura que **los datos sean correctos**:

- Validación de tipos
- Validación de longitud
- Validación de formato

**¿Por qué validar?**
- Previene errores en tiempo de ejecución
- Mejora la experiencia del usuario
- Mantiene la integridad de los datos

### `src/index.ts` - Archivo Principal

**Demuestra todas las funcionalidades**:

- Crear tareas
- Buscar y filtrar
- Actualizar y eliminar
- Mostrar estadísticas
- Validar datos

## 🎨 Características de la Aplicación

### ✅ Funcionalidades Implementadas

1. **Gestión CRUD completa**:
   - Crear tareas
   - Leer tareas (con filtros)
   - Actualizar tareas
   - Eliminar tareas

2. **Búsqueda avanzada**:
   - Por prioridad
   - Por estado
   - Por etiquetas
   - Por texto
   - Por fechas

3. **Validación robusta**:
   - Validación de tipos
   - Validación de longitud
   - Validación de formato

4. **Estadísticas**:
   - Total de tareas
   - Tareas por estado
   - Tareas por prioridad
   - Tareas vencidas

5. **Formateo elegante**:
   - Emojis para mejor UX
   - Fechas relativas
   - Texto formateado

### 🔍 Conceptos TypeScript Demostrados

1. **Tipado estático**:
   ```typescript
   function createTask(taskData: ICreateTask): IOperationResult<ITask>
   ```

2. **Interfaces**:
   ```typescript
   interface ITask {
     id: string;
     title: string;
     // ...
   }
   ```

3. **Enums**:
   ```typescript
   enum TaskPriority {
     LOW = 'low',
     MEDIUM = 'medium',
     // ...
   }
   ```

4. **Generics**:
   ```typescript
   interface IOperationResult<T> {
     success: boolean;
     data?: T;
   }
   ```

5. **Tipos de unión**:
   ```typescript
   type SortDirection = 'asc' | 'desc';
   ```

6. **Tipos condicionales**:
   ```typescript
   completedAt: updates.status === TaskStatus.COMPLETED ? new Date() : undefined
   ```

## 🚀 Cómo Ejecutar

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Compilar y ejecutar**:
   ```bash
   npm run build
   npm start
   ```

## 📖 Lo que Verás al Ejecutar

La aplicación mostrará:

1. **Tareas iniciales** (creadas automáticamente)
2. **Creación de nuevas tareas**
3. **Búsqueda y filtrado**
4. **Actualización de tareas**
5. **Completado de tareas**
6. **Estadísticas**
7. **Validación de errores**

## 🎓 Conceptos Clave de TypeScript

### ¿Qué es TypeScript?
TypeScript es **JavaScript con tipos**. Te permite:
- Detectar errores antes de ejecutar
- Mejor autocompletado en el editor
- Código más mantenible
- Mejor documentación

### Ventajas sobre JavaScript:
- **Detección temprana de errores**
- **Mejor IDE support**
- **Código más legible**
- **Refactoring más seguro**

### Diferencias principales:
```javascript
// JavaScript
function createTask(taskData) {
  return taskData.title; // Puede fallar si taskData es undefined
}

// TypeScript
function createTask(taskData: ICreateTask): string {
  return taskData.title; // TypeScript garantiza que taskData tiene title
}
```

## 🔧 Configuración de TypeScript

El archivo `tsconfig.json` define:
- **Target**: Versión de JavaScript a generar
- **Strict mode**: Verificaciones estrictas de tipos
- **Module system**: Sistema de módulos a usar
- **Source maps**: Para debugging

## 📝 Próximos Pasos

Para continuar aprendiendo:

1. **Modifica las tareas**: Cambia prioridades, estados, etc.
2. **Añade nuevas funcionalidades**: Notificaciones, categorías, etc.
3. **Crea tests**: Usa Jest para probar las funciones
4. **Añade persistencia**: Guarda en archivo o base de datos
5. **Crea una API**: Usa Express.js para crear endpoints

## 🎉 ¡Felicidades!

Has completado un proyecto completo en TypeScript que demuestra:
- ✅ Tipos e interfaces
- ✅ Clases y métodos
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Patrones de diseño
- ✅ Código limpio y mantenible

¡Ahora tienes una base sólida para seguir aprendiendo TypeScript! 