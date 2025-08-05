// ============================================
// CONCEPTOS AVANZADOS DE TYPESCRIPT
// ============================================

import { TaskPriority, TaskStatus, ITask } from '../types';

// ============================================
// 1. GENERICS - Tipos reutilizables
// ============================================

// Función genérica que puede trabajar con cualquier tipo
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}



// Uso de la función genérica
const _stringArray = createArray<string>(3, "hola");
const _numberArray = createArray<number>(5, 42);

// Clase genérica
class Container<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
  
  getAll(): T[] {
    return [...this.items];
  }
}

// ============================================
// 2. UNION TYPES - Tipos de unión
// ============================================

type TaskId = string | number;
type _TaskStatusOrPriority = TaskStatus | TaskPriority;

// Función que acepta múltiples tipos
function processTaskId(id: TaskId): string {
  if (typeof id === 'string') {
    return `task_${id}`;
  } else {
    return `task_${id.toString()}`;
  }
}

// ============================================
// 3. INTERSECTION TYPES - Tipos de intersección
// ============================================

interface HasId {
  id: string;
}

interface HasTitle {
  title: string;
}

// Combina dos interfaces
type _TaskWithIdAndTitle = HasId & HasTitle;

// ============================================
// 4. CONDITIONAL TYPES - Tipos condicionales
// ============================================

type _NonNullable<T> = T extends null | undefined ? never : T;
type _TaskProperty<T> = T extends keyof ITask ? ITask[T] : never;

// ============================================
// 5. MAPPED TYPES - Tipos mapeados
// ============================================

// Hace todas las propiedades opcionales
type _PartialTask = Partial<ITask>;

// Hace todas las propiedades requeridas
type _RequiredTask = Required<ITask>;

// Hace todas las propiedades de solo lectura
type _ReadonlyTask = Readonly<ITask>;

// ============================================
// 6. UTILITY TYPES - Tipos de utilidad
// ============================================

// Pick: Selecciona solo algunas propiedades
type TaskSummary = Pick<ITask, 'id' | 'title' | 'status'>;

// Omit: Excluye algunas propiedades
type _TaskWithoutDates = Omit<ITask, 'createdAt' | 'updatedAt' | 'completedAt'>;

// Record: Crea un objeto con claves y valores tipados
type _PriorityCount = Record<TaskPriority, number>;

// ============================================
// 7. FUNCTION OVERLOADS - Sobrecarga de funciones
// ============================================

// Declaraciones de sobrecarga
function _getTaskInfo(id: string): ITask | null;
function _getTaskInfo(tasks: ITask[]): ITask[];
function _getTaskInfo(input: string | ITask[]): ITask | ITask[] | null {
  if (typeof input === 'string') {
    // Lógica para buscar por ID
    return null;
  } else {
    // Lógica para procesar array
    return input;
  }
}

// ============================================
// 8. DECORATORS - Decoradores (experimental)
// ============================================

// Decorador de función
function _log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Llamando a ${propertyKey} con argumentos:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Resultado de ${propertyKey}:`, result);
    return result;
  };
  
  return descriptor;
}

// Clase con decorador
class _TaskService {
  @_log
  createTask(title: string, priority: TaskPriority): ITask {
    return {
      id: `task_${Date.now()}`,
      title,
      priority,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
  }
}

// ============================================
// 9. ENUM ADVANCED - Enums avanzados
// ============================================

// Enum numérico
enum _TaskType {
  PERSONAL = 1,
  WORK = 2,
  STUDY = 3
}

// Enum con valores calculados
enum TaskCategory {
  URGENT = 'urgent',
  IMPORTANT = 'important',
  NORMAL = 'normal',
  LOW = 'low'
}

// ============================================
// 10. NAMESPACES - Espacios de nombres
// ============================================

namespace _TaskUtils {
  export function formatPriority(priority: TaskPriority): string {
    return `Priority: ${priority}`;
  }
  
  export function isOverdue(task: ITask): boolean {
    if (!task.dueDate) return false;
    return task.dueDate < new Date() && task.status !== TaskStatus.COMPLETED;
  }
}

// ============================================
// 11. MODULE AUGMENTATION - Extensión de módulos
// ============================================

// Extender la interfaz ITask
declare module '../types' {
  interface ITask {
    category?: TaskCategory;
    estimatedTime?: number; // en minutos
  }
}

// ============================================
// 12. TYPE GUARDS - Guardias de tipo
// ============================================

// Función guardia de tipo
function isHighPriority(task: ITask): task is ITask & { priority: TaskPriority.HIGH | TaskPriority.URGENT } {
  return task.priority === TaskPriority.HIGH || task.priority === TaskPriority.URGENT;
}

// Función que usa la guardia de tipo
function _processHighPriorityTasks(tasks: ITask[]): void {
  const highPriorityTasks = tasks.filter(isHighPriority);
  console.log(`Encontradas ${highPriorityTasks.length} tareas de alta prioridad`);
}

// ============================================
// 13. ASYNC/AWAIT CON TYPESCRIPT
// ============================================

// Función asíncrona tipada
async function fetchTaskFromAPI(id: string): Promise<ITask> {
  // Simulación de llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `Tarea ${id}`,
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: []
      });
    }, 1000);
  });
}

// ============================================
// 14. DISCRIMINATED UNIONS - Uniones discriminadas
// ============================================

// Definir tipos para diferentes estados de resultado
type SuccessResult<T> = {
  type: 'success';
  data: T;
};

type ErrorResult = {
  type: 'error';
  message: string;
  code: number;
};

type Result<T> = SuccessResult<T> | ErrorResult;

// Función que usa unión discriminada
function handleResult(result: Result<ITask>): void {
  switch (result.type) {
    case 'success':
      console.log('Tarea obtenida:', result.data.title);
      break;
    case 'error':
      console.log('Error:', result.message, 'Código:', result.code);
      break;
  }
}

// ============================================
// 15. TUPLE TYPES - Tipos de tupla
// ============================================

// Tupla para coordenadas de tarea
type _TaskPosition = [number, number]; // [x, y]

// Tupla para información de tarea
type TaskInfo = [string, TaskPriority, TaskStatus]; // [title, priority, status]

// Función que usa tuplas
function createTaskFromTuple(info: TaskInfo): ITask {
  const [title, priority, status] = info;
  return {
    id: `task_${Date.now()}`,
    title,
    priority,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: []
  };
}

// ============================================
// DEMOSTRACIÓN DE USO
// ============================================

export function demonstrateAdvancedConcepts(): void {
  console.log('🔬 DEMOSTRANDO CONCEPTOS AVANZADOS DE TYPESCRIPT');
  console.log('================================================\n');
  
  // 1. Generics
  console.log('1. 📦 Generics:');
  const stringArr = createArray<string>(3, "test");
  console.log('Array de strings:', stringArr);
  
  // 2. Container genérico
  const _taskContainer = new Container<ITask>();
  console.log('Container creado para tareas');
  
  // 3. Union types
  console.log('\n2. 🔗 Union Types:');
  const taskId = processTaskId("abc123");
  console.log('ID procesado:', taskId);
  
  // 4. Utility types
  console.log('\n3. 🛠️ Utility Types:');
  const taskSummary: TaskSummary = {
    id: "task_1",
    title: "Ejemplo",
    status: TaskStatus.PENDING
  };
  console.log('Task Summary:', taskSummary);
  
  // 5. Type guards
  console.log('\n4. 🛡️ Type Guards:');
  const sampleTask: ITask = {
    id: "task_1",
    title: "Tarea importante",
    priority: TaskPriority.HIGH,
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: []
  };
  
  if (isHighPriority(sampleTask)) {
    console.log('Es una tarea de alta prioridad');
  }
  
  // 6. Tuples
  console.log('\n5. 📋 Tuples:');
  const taskInfo: TaskInfo = ["Nueva tarea", TaskPriority.MEDIUM, TaskStatus.PENDING];
  const newTask = createTaskFromTuple(taskInfo);
  console.log('Tarea creada desde tupla:', newTask.title);
  
  console.log('\n✅ Demostración completada');
}

// Exportar para uso en otros módulos
export {
  createArray,
  Container,
  processTaskId,
  isHighPriority,
  fetchTaskFromAPI,
  handleResult,
  createTaskFromTuple
}; 