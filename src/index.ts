// ============================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// ============================================

import { TaskManager } from './TaskManager';
import { TaskFormatters } from './utils/formatters';
import { TaskValidators } from './utils/validators';
import { TaskPriority, TaskStatus, ICreateTask, ITaskFilters } from './types';

// Función principal que ejecuta la aplicación
async function main() {
  console.log('🚀 INICIANDO APLICACIÓN DE GESTIÓN DE TAREAS');
  console.log('=============================================\n');
  
  // Obtener la instancia del gestor de tareas (Singleton)
  const taskManager = TaskManager.getInstance();
  
  // ============================================
  // DEMOSTRACIÓN DE FUNCIONALIDADES
  // ============================================
  
  console.log('📋 MOSTRANDO TAREAS INICIALES:');
  console.log('--------------------------------');
  const initialTasks = taskManager.getAllTasks();
  console.log(TaskFormatters.formatTaskList(initialTasks));
  console.log('\n');
  
  // ============================================
  // CREAR NUEVAS TAREAS
  // ============================================
  
  console.log('➕ CREANDO NUEVAS TAREAS:');
  console.log('-------------------------');
  
  const newTasks: ICreateTask[] = [
    {
      title: 'Estudiar TypeScript',
      description: 'Completar el curso de TypeScript en línea',
      priority: TaskPriority.HIGH,
      tags: ['estudio', 'typescript', 'programación'],
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 días
    },
    {
      title: 'Hacer la compra semanal',
      description: 'Comprar frutas, verduras y productos básicos',
      priority: TaskPriority.MEDIUM,
      tags: ['compras', 'hogar'],
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 día
    },
    {
      title: 'Llamar al dentista',
      description: 'Agendar cita para revisión dental',
      priority: TaskPriority.URGENT,
      tags: ['salud', 'cita'],
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 días
    }
  ];
  
  // Crear las tareas y mostrar resultados
  for (const taskData of newTasks) {
    console.log(`📝 Creando tarea: "${taskData.title}"`);
    
    // Validar antes de crear
    const validation = TaskValidators.validateCreateTask(taskData);
    if (!validation.isValid) {
      console.log(`❌ Error de validación: ${validation.errors.join(', ')}`);
      continue;
    }
    
    const result = taskManager.createTask(taskData);
    if (result.success) {
      console.log(`✅ Tarea creada exitosamente con ID: ${result.data!.id}`);
    } else {
      console.log(`❌ Error al crear tarea: ${result.error}`);
    }
  }
  
  console.log('\n');
  
  // ============================================
  // MOSTRAR TODAS LAS TAREAS
  // ============================================
  
  console.log('📋 TODAS LAS TAREAS:');
  console.log('--------------------');
  const allTasks = taskManager.getAllTasks();
  console.log(TaskFormatters.formatTaskList(allTasks));
  console.log('\n');
  
  // ============================================
  // BUSCAR Y FILTRAR TAREAS
  // ============================================
  
  console.log('🔍 BUSCANDO TAREAS CON FILTROS:');
  console.log('--------------------------------');
  
  // Buscar tareas de alta prioridad
  const highPriorityFilters: ITaskFilters = {
    priority: TaskPriority.HIGH
  };
  
  const highPriorityTasks = taskManager.searchTasks(highPriorityFilters);
  console.log('🟠 Tareas de alta prioridad:');
  console.log(TaskFormatters.formatTaskList(highPriorityTasks));
  console.log('\n');
  
  // Buscar tareas por etiqueta
  const studyFilters: ITaskFilters = {
    tags: ['estudio']
  };
  
  const studyTasks = taskManager.searchTasks(studyFilters);
  console.log('📚 Tareas de estudio:');
  console.log(TaskFormatters.formatTaskList(studyTasks));
  console.log('\n');
  
  // ============================================
  // ACTUALIZAR TAREAS
  // ============================================
  
  console.log('✏️  ACTUALIZANDO TAREAS:');
  console.log('-------------------------');
  
  if (allTasks.length > 0) {
    const firstTask = allTasks[0];
    console.log(`🔄 Actualizando tarea: "${firstTask.title}"`);
    
    const updateResult = taskManager.updateTask(firstTask.id, {
      status: TaskStatus.IN_PROGRESS,
      description: firstTask.description + ' (En progreso)'
    });
    
    if (updateResult.success) {
      console.log('✅ Tarea actualizada exitosamente');
      console.log(TaskFormatters.formatTask(updateResult.data!));
    } else {
      console.log(`❌ Error al actualizar: ${updateResult.error}`);
    }
  }
  
  console.log('\n');
  
  // ============================================
  // COMPLETAR TAREAS
  // ============================================
  
  console.log('✅ COMPLETANDO TAREAS:');
  console.log('----------------------');
  
  if (allTasks.length > 1) {
    const secondTask = allTasks[1];
    console.log(`✅ Completando tarea: "${secondTask.title}"`);
    
    const completeResult = taskManager.completeTask(secondTask.id);
    if (completeResult.success) {
      console.log('✅ Tarea marcada como completada');
      console.log(TaskFormatters.formatTask(completeResult.data!));
    } else {
      console.log(`❌ Error al completar: ${completeResult.error}`);
    }
  }
  
  console.log('\n');
  
  // ============================================
  // MOSTRAR ESTADÍSTICAS
  // ============================================
  
  console.log('📊 ESTADÍSTICAS:');
  console.log('----------------');
  const statistics = taskManager.getStatistics();
  console.log(TaskFormatters.formatStatistics(statistics));
  console.log('\n');
  
  // ============================================
  // DEMOSTRAR VALIDACIONES
  // ============================================
  
  console.log('🔍 DEMOSTRANDO VALIDACIONES:');
  console.log('-----------------------------');
  
  // Intentar crear una tarea inválida
  const invalidTask: ICreateTask = {
    title: '', // Título vacío
    priority: TaskPriority.HIGH,
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10', 'tag11'] // Demasiadas etiquetas
  };
  
  console.log('❌ Intentando crear tarea inválida...');
  const validation = TaskValidators.validateCreateTask(invalidTask);
  if (!validation.isValid) {
    console.log('🔍 Errores de validación encontrados:');
    validation.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n');
  
  // ============================================
  // MOSTRAR TAREAS FINALES
  // ============================================
  
  console.log('📋 ESTADO FINAL DE LAS TAREAS:');
  console.log('-------------------------------');
  const finalTasks = taskManager.getAllTasks();
  console.log(TaskFormatters.formatTaskList(finalTasks));
  
  console.log('\n🎉 ¡APLICACIÓN EJECUTADA EXITOSAMENTE!');
  console.log('=====================================');
}

// Función para manejar errores
function handleError(error: unknown) {
  console.error('❌ Error en la aplicación:', error);
  process.exit(1);
}

// Ejecutar la aplicación
if (require.main === module) {
  main().catch(handleError);
}

// Exportar para uso en otros módulos
export { main }; 