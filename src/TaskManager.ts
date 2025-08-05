// ============================================
// CLASE PRINCIPAL - TASK MANAGER
// ============================================

import { 
  ITask, 
  ICreateTask, 
  IUpdateTask, 
  ITaskFilters, 
  ISortOptions, 
  ITaskStatistics,
  TaskPriority, 
  TaskStatus, 
  TaskId,
  IOperationResult 
} from './types';

// Clase: Es una plantilla para crear objetos
// En TypeScript, las clases pueden implementar interfaces
export class TaskManager {
  // Propiedad privada: Solo accesible dentro de la clase
  private tasks: Map<TaskId, ITask> = new Map();
  
  // Propiedad estática: Pertenece a la clase, no a las instancias
  private static instance: TaskManager;
  
  // Constructor: Se ejecuta cuando se crea una nueva instancia
  private constructor() {
    // Inicializar con algunas tareas de ejemplo
    this.initializeSampleTasks();
  }
  
  // Método estático: Patrón Singleton - asegura una sola instancia
  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }
  
  // Método privado para generar IDs únicos
  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Método para crear una nueva tarea
  public createTask(taskData: ICreateTask): IOperationResult<ITask> {
    try {
      // Validación de datos de entrada
      if (!taskData.title || taskData.title.trim().length === 0) {
        return {
          success: false,
          error: 'El título de la tarea es obligatorio'
        };
      }

      let a = 1;
      let b = "hola";
  
      let c = a + b;
      console.log(c);
      
      // Crear nueva tarea con valores por defecto
      const newTask: ITask = {
        id: this.generateId(),
        title: taskData.title.trim(),
        description: taskData.description?.trim() || '',
        priority: taskData.priority || TaskPriority.MEDIUM,
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: taskData.dueDate,
        tags: taskData.tags || [],
        completedAt: undefined
      };
      
      // Guardar la tarea
      this.tasks.set(newTask.id, newTask);
      
      return {
        success: true,
        data: newTask,
        message: 'Tarea creada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al crear la tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`
      };
    }
  }
  
  // Método para obtener una tarea por ID
  public getTaskById(id: TaskId): IOperationResult<ITask> {
    const task = this.tasks.get(id);
    
    if (!task) {
      return {
        success: false,
        error: `Tarea con ID ${id} no encontrada`
      };
    }
    
    return {
      success: true,
      data: task
    };
  }
  
  // Método para obtener todas las tareas
  public getAllTasks(): ITask[] {
    return Array.from(this.tasks.values());
  }
  
  // Método para actualizar una tarea
  public updateTask(id: TaskId, updates: IUpdateTask): IOperationResult<ITask> {
    const task = this.tasks.get(id);
    
    if (!task) {
      return {
        success: false,
        error: `Tarea con ID ${id} no encontrada`
      };
    }
    
    try {
      // Crear tarea actualizada
      const updatedTask: ITask = {
        ...task,
        ...updates,
        updatedAt: new Date(),
        // Si se marca como completada, establecer fecha de completado
        completedAt: updates.status === TaskStatus.COMPLETED && !task.completedAt 
          ? new Date() 
          : task.completedAt
      };
      
      // Validar que el título no esté vacío si se está actualizando
      if (updates.title !== undefined && updates.title.trim().length === 0) {
        return {
          success: false,
          error: 'El título de la tarea no puede estar vacío'
        };
      }
      
      this.tasks.set(id, updatedTask);
      
      return {
        success: true,
        data: updatedTask,
        message: 'Tarea actualizada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al actualizar la tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`
      };
    }
  }
  
  // Método para eliminar una tarea
  public deleteTask(id: TaskId): IOperationResult<void> {
    const task = this.tasks.get(id);
    
    if (!task) {
      return {
        success: false,
        error: `Tarea con ID ${id} no encontrada`
      };
    }
    
    this.tasks.delete(id);
    
    return {
      success: true,
      message: 'Tarea eliminada exitosamente'
    };
  }
  
  // Método para buscar tareas con filtros
  public searchTasks(filters: ITaskFilters, sortOptions?: ISortOptions): ITask[] {
    let filteredTasks = this.getAllTasks();
    
    // Aplicar filtros
    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }
    
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        filters.tags!.some(tag => task.tags.includes(tag))
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.dueDateFrom) {
      filteredTasks = filteredTasks.filter(task => 
        task.dueDate && task.dueDate >= filters.dueDateFrom!
      );
    }
    
    if (filters.dueDateTo) {
      filteredTasks = filteredTasks.filter(task => 
        task.dueDate && task.dueDate <= filters.dueDateTo!
      );
    }
    
    // Aplicar ordenamiento
    if (sortOptions) {
      filteredTasks.sort((a, b) => {
        let aValue: any = a[sortOptions.field];
        let bValue: any = b[sortOptions.field];
        
        // Manejar casos especiales
        if (sortOptions.field === 'dueDate') {
          aValue = aValue || new Date(9999, 11, 31); // Fecha muy lejana si no hay dueDate
          bValue = bValue || new Date(9999, 11, 31);
        }
        
        if (aValue < bValue) return sortOptions.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOptions.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filteredTasks;
  }
  
  // Método para obtener estadísticas
  public getStatistics(): ITaskStatistics {
    const tasks = this.getAllTasks();
    const now = new Date();
    
    const statistics: ITaskStatistics = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
      pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
      inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      cancelled: tasks.filter(t => t.status === TaskStatus.CANCELLED).length,
      overdue: tasks.filter(t => 
        t.dueDate && t.dueDate < now && t.status !== TaskStatus.COMPLETED
      ).length,
      byPriority: {
        [TaskPriority.LOW]: tasks.filter(t => t.priority === TaskPriority.LOW).length,
        [TaskPriority.MEDIUM]: tasks.filter(t => t.priority === TaskPriority.MEDIUM).length,
        [TaskPriority.HIGH]: tasks.filter(t => t.priority === TaskPriority.HIGH).length,
        [TaskPriority.URGENT]: tasks.filter(t => t.priority === TaskPriority.URGENT).length
      }
    };
    
    return statistics;
  }
  
  // Método para marcar tarea como completada
  public completeTask(id: TaskId): IOperationResult<ITask> {
    return this.updateTask(id, { 
      status: TaskStatus.COMPLETED,
      completedAt: new Date()
    });
  }
  
  // Método para marcar tarea como en progreso
  public startTask(id: TaskId): IOperationResult<ITask> {
    return this.updateTask(id, { status: TaskStatus.IN_PROGRESS });
  }
  
  // Método para cancelar tarea
  public cancelTask(id: TaskId): IOperationResult<ITask> {
    return this.updateTask(id, { status: TaskStatus.CANCELLED });
  }
  
  // Método privado para inicializar tareas de ejemplo
  private initializeSampleTasks(): void {
    const sampleTasks: ICreateTask[] = [
      {
        title: 'Aprender TypeScript',
        description: 'Estudiar los conceptos básicos de TypeScript',
        priority: TaskPriority.HIGH,
        tags: ['estudio', 'programación'],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
      },
      {
        title: 'Hacer ejercicio',
        description: 'Ir al gimnasio por 1 hora',
        priority: TaskPriority.MEDIUM,
        tags: ['salud', 'ejercicio'],
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 día
      },
      {
        title: 'Comprar víveres',
        description: 'Ir al supermercado para la semana',
        priority: TaskPriority.URGENT,
        tags: ['compras', 'hogar'],
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 días
      }
    ];
    
    // Crear las tareas de ejemplo
    sampleTasks.forEach(taskData => {
      this.createTask(taskData);
    });
  }
} 