// ============================================
// UTILIDADES DE FORMATEO
// ============================================

import { TaskPriority, TaskStatus, ITask } from '../types';

// Clase de utilidades para formatear datos
export class TaskFormatters {
  
  // Método para formatear fechas
  public static formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Método para formatear fechas relativas (hace X tiempo)
  public static formatRelativeDate(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Justo ahora';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return this.formatDate(date);
  }
  
  // Método para formatear prioridades con emojis
  public static formatPriority(priority: TaskPriority): string {
    const priorityMap: Record<TaskPriority, string> = {
      [TaskPriority.LOW]: '🟢 Baja',
      [TaskPriority.MEDIUM]: '🟡 Media',
      [TaskPriority.HIGH]: '🟠 Alta',
      [TaskPriority.URGENT]: '🔴 Urgente'
    };
    
    return priorityMap[priority];
  }
  
  // Método para formatear estados con emojis
  public static formatStatus(status: TaskStatus): string {
    const statusMap: Record<TaskStatus, string> = {
      [TaskStatus.PENDING]: '⏳ Pendiente',
      [TaskStatus.IN_PROGRESS]: '🔄 En Progreso',
      [TaskStatus.COMPLETED]: '✅ Completada',
      [TaskStatus.CANCELLED]: '❌ Cancelada'
    };
    
    return statusMap[status];
  }
  
  // Método para formatear etiquetas
  public static formatTags(tags: string[]): string {
    if (tags.length === 0) return 'Sin etiquetas';
    return tags.map(tag => `#${tag}`).join(' ');
  }
  
  // Método para formatear una tarea completa
  public static formatTask(task: ITask): string {
    const lines = [
      `📋 ${task.title}`,
      `📝 ${task.description || 'Sin descripción'}`,
      `🏷️  ${this.formatPriority(task.priority)}`,
      `📊 ${this.formatStatus(task.status)}`,
      `📅 Creada: ${this.formatRelativeDate(task.createdAt)}`,
      `🔄 Actualizada: ${this.formatRelativeDate(task.updatedAt)}`
    ];
    
    if (task.dueDate) {
      const isOverdue = task.dueDate < new Date() && task.status !== TaskStatus.COMPLETED;
      const overdueIcon = isOverdue ? '⚠️ ' : '';
      lines.push(`${overdueIcon}📅 Fecha límite: ${this.formatDate(task.dueDate)}`);
    }
    
    if (task.completedAt) {
      lines.push(`✅ Completada: ${this.formatDate(task.completedAt)}`);
    }
    
    if (task.tags.length > 0) {
      lines.push(`🏷️  Etiquetas: ${this.formatTags(task.tags)}`);
    }
    
    return lines.join('\n');
  }
  
  // Método para formatear estadísticas
  public static formatStatistics(stats: any): string {
    return `
📊 ESTADÍSTICAS DE TAREAS
========================
📈 Total: ${stats.total}
✅ Completadas: ${stats.completed}
⏳ Pendientes: ${stats.pending}
🔄 En Progreso: ${stats.inProgress}
❌ Canceladas: ${stats.cancelled}
⚠️  Vencidas: ${stats.overdue}

📊 POR PRIORIDAD:
🔴 Urgentes: ${stats.byPriority.urgent}
🟠 Altas: ${stats.byPriority.high}
🟡 Medias: ${stats.byPriority.medium}
🟢 Bajas: ${stats.byPriority.low}
    `.trim();
  }
  
  // Método para formatear una lista de tareas
  public static formatTaskList(tasks: ITask[]): string {
    if (tasks.length === 0) {
      return '📭 No hay tareas que mostrar';
    }
    
    return tasks.map((task, index) => {
      const priorityIcon = this.getPriorityIcon(task.priority);
      const statusIcon = this.getStatusIcon(task.status);
      const overdueIcon = task.dueDate && task.dueDate < new Date() && task.status !== TaskStatus.COMPLETED ? '⚠️ ' : '';
      
      return `${index + 1}. ${priorityIcon}${statusIcon}${overdueIcon}${task.title}`;
    }).join('\n');
  }
  
  // Métodos privados para obtener iconos
  private static getPriorityIcon(priority: TaskPriority): string {
    const icons: Record<TaskPriority, string> = {
      [TaskPriority.LOW]: '🟢',
      [TaskPriority.MEDIUM]: '🟡',
      [TaskPriority.HIGH]: '🟠',
      [TaskPriority.URGENT]: '🔴'
    };
    return icons[priority];
  }
  
  private static getStatusIcon(status: TaskStatus): string {
    const icons: Record<TaskStatus, string> = {
      [TaskStatus.PENDING]: '⏳',
      [TaskStatus.IN_PROGRESS]: '🔄',
      [TaskStatus.COMPLETED]: '✅',
      [TaskStatus.CANCELLED]: '❌'
    };
    return icons[status];
  }
} 