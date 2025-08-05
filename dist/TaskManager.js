"use strict";
// ============================================
// CLASE PRINCIPAL - TASK MANAGER
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const types_1 = require("./types");
// Clase: Es una plantilla para crear objetos
// En TypeScript, las clases pueden implementar interfaces
class TaskManager {
    // Constructor: Se ejecuta cuando se crea una nueva instancia
    constructor() {
        // Propiedad privada: Solo accesible dentro de la clase
        this.tasks = new Map();
        // Inicializar con algunas tareas de ejemplo
        this.initializeSampleTasks();
    }
    // Método estático: Patrón Singleton - asegura una sola instancia
    static getInstance() {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }
    // Método privado para generar IDs únicos
    generateId() {
        return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    // Método para crear una nueva tarea
    createTask(taskData) {
        try {
            // Validación de datos de entrada
            if (!taskData.title || taskData.title.trim().length === 0) {
                return {
                    success: false,
                    error: 'El título de la tarea es obligatorio'
                };
            }
            // Crear nueva tarea con valores por defecto
            const newTask = {
                id: this.generateId(),
                title: taskData.title.trim(),
                description: taskData.description?.trim() || '',
                priority: taskData.priority || types_1.TaskPriority.MEDIUM,
                status: types_1.TaskStatus.PENDING,
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
        }
        catch (error) {
            return {
                success: false,
                error: `Error al crear la tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`
            };
        }
    }
    // Método para obtener una tarea por ID
    getTaskById(id) {
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
    getAllTasks() {
        return Array.from(this.tasks.values());
    }
    // Método para actualizar una tarea
    updateTask(id, updates) {
        const task = this.tasks.get(id);
        if (!task) {
            return {
                success: false,
                error: `Tarea con ID ${id} no encontrada`
            };
        }
        try {
            // Crear tarea actualizada
            const updatedTask = {
                ...task,
                ...updates,
                updatedAt: new Date(),
                // Si se marca como completada, establecer fecha de completado
                completedAt: updates.status === types_1.TaskStatus.COMPLETED && !task.completedAt
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
        }
        catch (error) {
            return {
                success: false,
                error: `Error al actualizar la tarea: ${error instanceof Error ? error.message : 'Error desconocido'}`
            };
        }
    }
    // Método para eliminar una tarea
    deleteTask(id) {
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
    searchTasks(filters, sortOptions) {
        let filteredTasks = this.getAllTasks();
        // Aplicar filtros
        if (filters.status) {
            filteredTasks = filteredTasks.filter(task => task.status === filters.status);
        }
        if (filters.priority) {
            filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
        }
        if (filters.tags && filters.tags.length > 0) {
            filteredTasks = filteredTasks.filter(task => filters.tags.some(tag => task.tags.includes(tag)));
        }
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(searchTerm) ||
                (task.description && task.description.toLowerCase().includes(searchTerm)));
        }
        if (filters.dueDateFrom) {
            filteredTasks = filteredTasks.filter(task => task.dueDate && task.dueDate >= filters.dueDateFrom);
        }
        if (filters.dueDateTo) {
            filteredTasks = filteredTasks.filter(task => task.dueDate && task.dueDate <= filters.dueDateTo);
        }
        // Aplicar ordenamiento
        if (sortOptions) {
            filteredTasks.sort((a, b) => {
                let aValue = a[sortOptions.field];
                let bValue = b[sortOptions.field];
                // Manejar casos especiales
                if (sortOptions.field === 'dueDate') {
                    aValue = aValue || new Date(9999, 11, 31); // Fecha muy lejana si no hay dueDate
                    bValue = bValue || new Date(9999, 11, 31);
                }
                if (aValue < bValue)
                    return sortOptions.direction === 'asc' ? -1 : 1;
                if (aValue > bValue)
                    return sortOptions.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filteredTasks;
    }
    // Método para obtener estadísticas
    getStatistics() {
        const tasks = this.getAllTasks();
        const now = new Date();
        const statistics = {
            total: tasks.length,
            completed: tasks.filter(t => t.status === types_1.TaskStatus.COMPLETED).length,
            pending: tasks.filter(t => t.status === types_1.TaskStatus.PENDING).length,
            inProgress: tasks.filter(t => t.status === types_1.TaskStatus.IN_PROGRESS).length,
            cancelled: tasks.filter(t => t.status === types_1.TaskStatus.CANCELLED).length,
            overdue: tasks.filter(t => t.dueDate && t.dueDate < now && t.status !== types_1.TaskStatus.COMPLETED).length,
            byPriority: {
                [types_1.TaskPriority.LOW]: tasks.filter(t => t.priority === types_1.TaskPriority.LOW).length,
                [types_1.TaskPriority.MEDIUM]: tasks.filter(t => t.priority === types_1.TaskPriority.MEDIUM).length,
                [types_1.TaskPriority.HIGH]: tasks.filter(t => t.priority === types_1.TaskPriority.HIGH).length,
                [types_1.TaskPriority.URGENT]: tasks.filter(t => t.priority === types_1.TaskPriority.URGENT).length
            }
        };
        return statistics;
    }
    // Método para marcar tarea como completada
    completeTask(id) {
        return this.updateTask(id, {
            status: types_1.TaskStatus.COMPLETED,
            completedAt: new Date()
        });
    }
    // Método para marcar tarea como en progreso
    startTask(id) {
        return this.updateTask(id, { status: types_1.TaskStatus.IN_PROGRESS });
    }
    // Método para cancelar tarea
    cancelTask(id) {
        return this.updateTask(id, { status: types_1.TaskStatus.CANCELLED });
    }
    // Método privado para inicializar tareas de ejemplo
    initializeSampleTasks() {
        const sampleTasks = [
            {
                title: 'Aprender TypeScript',
                description: 'Estudiar los conceptos básicos de TypeScript',
                priority: types_1.TaskPriority.HIGH,
                tags: ['estudio', 'programación'],
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
            },
            {
                title: 'Hacer ejercicio',
                description: 'Ir al gimnasio por 1 hora',
                priority: types_1.TaskPriority.MEDIUM,
                tags: ['salud', 'ejercicio'],
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 día
            },
            {
                title: 'Comprar víveres',
                description: 'Ir al supermercado para la semana',
                priority: types_1.TaskPriority.URGENT,
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
exports.TaskManager = TaskManager;
//# sourceMappingURL=TaskManager.js.map