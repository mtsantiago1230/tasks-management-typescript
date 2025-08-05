// ============================================
// DEFINICIÓN DE TIPOS E INTERFACES
// ============================================

// Enum: Define un conjunto de valores constantes
// En TypeScript, los enums son más seguros que usar strings
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Enum para el estado de las tareas
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Interface: Define la estructura de un objeto
// Es como un "contrato" que dice qué propiedades debe tener un objeto
export interface ITask {
  id: string;                    // Identificador único
  title: string;                 // Título de la tarea
  description?: string;          // Descripción opcional (el ? hace que sea opcional)
  priority: TaskPriority;        // Prioridad usando el enum
  status: TaskStatus;            // Estado usando el enum
  createdAt: Date;              // Fecha de creación
  updatedAt: Date;              // Fecha de última modificación
  dueDate?: Date;               // Fecha límite opcional
  tags: string[];               // Array de etiquetas
  completedAt?: Date;           // Fecha de completado (solo si está completada)
}

// Interface para crear una nueva tarea (sin id ni fechas automáticas)
export interface ICreateTask {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
  tags?: string[];
}

// Interface para actualizar una tarea (todas las propiedades son opcionales)
export interface IUpdateTask {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: Date;
  tags?: string[];
  completedAt?: Date;
}

// Interface para los filtros de búsqueda
export interface ITaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string[];
  search?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
}

// Type: Define un tipo personalizado
// Puede ser una unión de tipos, un tipo primitivo, etc.
export type TaskId = string;

// Type para las opciones de ordenamiento
export type SortOption = 'title' | 'priority' | 'createdAt' | 'dueDate' | 'status';

// Type para la dirección del ordenamiento
export type SortDirection = 'asc' | 'desc';

// Interface para las opciones de ordenamiento
export interface ISortOptions {
  field: SortOption;
  direction: SortDirection;
}

// Interface para el resultado de una operación
export interface IOperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Interface para las estadísticas de las tareas
export interface ITaskStatistics {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  cancelled: number;
  overdue: number;
  byPriority: Record<TaskPriority, number>;
} 