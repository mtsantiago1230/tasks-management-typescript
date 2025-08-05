"use strict";
// ============================================
// CONCEPTOS AVANZADOS DE TYPESCRIPT
// ============================================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
exports.demonstrateAdvancedConcepts = demonstrateAdvancedConcepts;
exports.createArray = createArray;
exports.processTaskId = processTaskId;
exports.isHighPriority = isHighPriority;
exports.fetchTaskFromAPI = fetchTaskFromAPI;
exports.handleResult = handleResult;
exports.createTaskFromTuple = createTaskFromTuple;
const types_1 = require("../types");
// ============================================
// 1. GENERICS - Tipos reutilizables
// ============================================
// Función genérica que puede trabajar con cualquier tipo
function createArray(length, value) {
    return Array(length).fill(value);
}
// Uso de la función genérica
const _stringArray = createArray(3, "hola");
const _numberArray = createArray(5, 42);
// Clase genérica
class Container {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        return this.items[index];
    }
    getAll() {
        return [...this.items];
    }
}
exports.Container = Container;
// Función que acepta múltiples tipos
function processTaskId(id) {
    if (typeof id === 'string') {
        return `task_${id}`;
    }
    else {
        return `task_${id.toString()}`;
    }
}
function _getTaskInfo(input) {
    if (typeof input === 'string') {
        // Lógica para buscar por ID
        return null;
    }
    else {
        // Lógica para procesar array
        return input;
    }
}
// ============================================
// 8. DECORATORS - Decoradores (experimental)
// ============================================
// Decorador de función
function _log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Llamando a ${propertyKey} con argumentos:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Resultado de ${propertyKey}:`, result);
        return result;
    };
    return descriptor;
}
// Clase con decorador
class _TaskService {
    createTask(title, priority) {
        return {
            id: `task_${Date.now()}`,
            title,
            priority,
            status: types_1.TaskStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: []
        };
    }
}
__decorate([
    _log
], _TaskService.prototype, "createTask", null);
// ============================================
// 9. ENUM ADVANCED - Enums avanzados
// ============================================
// Enum numérico
var _TaskType;
(function (_TaskType) {
    _TaskType[_TaskType["PERSONAL"] = 1] = "PERSONAL";
    _TaskType[_TaskType["WORK"] = 2] = "WORK";
    _TaskType[_TaskType["STUDY"] = 3] = "STUDY";
})(_TaskType || (_TaskType = {}));
// Enum con valores calculados
var TaskCategory;
(function (TaskCategory) {
    TaskCategory["URGENT"] = "urgent";
    TaskCategory["IMPORTANT"] = "important";
    TaskCategory["NORMAL"] = "normal";
    TaskCategory["LOW"] = "low";
})(TaskCategory || (TaskCategory = {}));
// ============================================
// 10. NAMESPACES - Espacios de nombres
// ============================================
var _TaskUtils;
(function (_TaskUtils) {
    function formatPriority(priority) {
        return `Priority: ${priority}`;
    }
    _TaskUtils.formatPriority = formatPriority;
    function isOverdue(task) {
        if (!task.dueDate)
            return false;
        return task.dueDate < new Date() && task.status !== types_1.TaskStatus.COMPLETED;
    }
    _TaskUtils.isOverdue = isOverdue;
})(_TaskUtils || (_TaskUtils = {}));
// ============================================
// 12. TYPE GUARDS - Guardias de tipo
// ============================================
// Función guardia de tipo
function isHighPriority(task) {
    return task.priority === types_1.TaskPriority.HIGH || task.priority === types_1.TaskPriority.URGENT;
}
// Función que usa la guardia de tipo
function _processHighPriorityTasks(tasks) {
    const highPriorityTasks = tasks.filter(isHighPriority);
    console.log(`Encontradas ${highPriorityTasks.length} tareas de alta prioridad`);
}
// ============================================
// 13. ASYNC/AWAIT CON TYPESCRIPT
// ============================================
// Función asíncrona tipada
async function fetchTaskFromAPI(id) {
    // Simulación de llamada a API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                title: `Tarea ${id}`,
                priority: types_1.TaskPriority.MEDIUM,
                status: types_1.TaskStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
                tags: []
            });
        }, 1000);
    });
}
// Función que usa unión discriminada
function handleResult(result) {
    switch (result.type) {
        case 'success':
            console.log('Tarea obtenida:', result.data.title);
            break;
        case 'error':
            console.log('Error:', result.message, 'Código:', result.code);
            break;
    }
}
// Función que usa tuplas
function createTaskFromTuple(info) {
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
function demonstrateAdvancedConcepts() {
    console.log('🔬 DEMOSTRANDO CONCEPTOS AVANZADOS DE TYPESCRIPT');
    console.log('================================================\n');
    // 1. Generics
    console.log('1. 📦 Generics:');
    const stringArr = createArray(3, "test");
    console.log('Array de strings:', stringArr);
    // 2. Container genérico
    const _taskContainer = new Container();
    console.log('Container creado para tareas');
    // 3. Union types
    console.log('\n2. 🔗 Union Types:');
    const taskId = processTaskId("abc123");
    console.log('ID procesado:', taskId);
    // 4. Utility types
    console.log('\n3. 🛠️ Utility Types:');
    const taskSummary = {
        id: "task_1",
        title: "Ejemplo",
        status: types_1.TaskStatus.PENDING
    };
    console.log('Task Summary:', taskSummary);
    // 5. Type guards
    console.log('\n4. 🛡️ Type Guards:');
    const sampleTask = {
        id: "task_1",
        title: "Tarea importante",
        priority: types_1.TaskPriority.HIGH,
        status: types_1.TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: []
    };
    if (isHighPriority(sampleTask)) {
        console.log('Es una tarea de alta prioridad');
    }
    // 6. Tuples
    console.log('\n5. 📋 Tuples:');
    const taskInfo = ["Nueva tarea", types_1.TaskPriority.MEDIUM, types_1.TaskStatus.PENDING];
    const newTask = createTaskFromTuple(taskInfo);
    console.log('Tarea creada desde tupla:', newTask.title);
    console.log('\n✅ Demostración completada');
}
//# sourceMappingURL=advanced-concepts.js.map