"use strict";
// ============================================
// UTILIDADES DE FORMATEO
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFormatters = void 0;
const types_1 = require("../types");
// Clase de utilidades para formatear datos
class TaskFormatters {
    // Método para formatear fechas
    static formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    // Método para formatear fechas relativas (hace X tiempo)
    static formatRelativeDate(date) {
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInMinutes < 1)
            return 'Justo ahora';
        if (diffInMinutes < 60)
            return `Hace ${diffInMinutes} minutos`;
        if (diffInHours < 24)
            return `Hace ${diffInHours} horas`;
        if (diffInDays < 7)
            return `Hace ${diffInDays} días`;
        return this.formatDate(date);
    }
    // Método para formatear prioridades con emojis
    static formatPriority(priority) {
        const priorityMap = {
            [types_1.TaskPriority.LOW]: '🟢 Baja',
            [types_1.TaskPriority.MEDIUM]: '🟡 Media',
            [types_1.TaskPriority.HIGH]: '🟠 Alta',
            [types_1.TaskPriority.URGENT]: '🔴 Urgente'
        };
        return priorityMap[priority];
    }
    // Método para formatear estados con emojis
    static formatStatus(status) {
        const statusMap = {
            [types_1.TaskStatus.PENDING]: '⏳ Pendiente',
            [types_1.TaskStatus.IN_PROGRESS]: '🔄 En Progreso',
            [types_1.TaskStatus.COMPLETED]: '✅ Completada',
            [types_1.TaskStatus.CANCELLED]: '❌ Cancelada'
        };
        return statusMap[status];
    }
    // Método para formatear etiquetas
    static formatTags(tags) {
        if (tags.length === 0)
            return 'Sin etiquetas';
        return tags.map(tag => `#${tag}`).join(' ');
    }
    // Método para formatear una tarea completa
    static formatTask(task) {
        const lines = [
            `📋 ${task.title}`,
            `📝 ${task.description || 'Sin descripción'}`,
            `🏷️  ${this.formatPriority(task.priority)}`,
            `📊 ${this.formatStatus(task.status)}`,
            `📅 Creada: ${this.formatRelativeDate(task.createdAt)}`,
            `🔄 Actualizada: ${this.formatRelativeDate(task.updatedAt)}`
        ];
        if (task.dueDate) {
            const isOverdue = task.dueDate < new Date() && task.status !== types_1.TaskStatus.COMPLETED;
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
    static formatStatistics(stats) {
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
    static formatTaskList(tasks) {
        if (tasks.length === 0) {
            return '📭 No hay tareas que mostrar';
        }
        return tasks.map((task, index) => {
            const priorityIcon = this.getPriorityIcon(task.priority);
            const statusIcon = this.getStatusIcon(task.status);
            const overdueIcon = task.dueDate && task.dueDate < new Date() && task.status !== types_1.TaskStatus.COMPLETED ? '⚠️ ' : '';
            return `${index + 1}. ${priorityIcon}${statusIcon}${overdueIcon}${task.title}`;
        }).join('\n');
    }
    // Métodos privados para obtener iconos
    static getPriorityIcon(priority) {
        const icons = {
            [types_1.TaskPriority.LOW]: '🟢',
            [types_1.TaskPriority.MEDIUM]: '🟡',
            [types_1.TaskPriority.HIGH]: '🟠',
            [types_1.TaskPriority.URGENT]: '🔴'
        };
        return icons[priority];
    }
    static getStatusIcon(status) {
        const icons = {
            [types_1.TaskStatus.PENDING]: '⏳',
            [types_1.TaskStatus.IN_PROGRESS]: '🔄',
            [types_1.TaskStatus.COMPLETED]: '✅',
            [types_1.TaskStatus.CANCELLED]: '❌'
        };
        return icons[status];
    }
}
exports.TaskFormatters = TaskFormatters;
//# sourceMappingURL=formatters.js.map