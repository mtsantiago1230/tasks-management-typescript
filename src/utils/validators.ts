// ============================================
// UTILIDADES DE VALIDACIÓN
// ============================================

import { TaskPriority, TaskStatus, ICreateTask, IUpdateTask } from '../types';

// Clase de utilidades para validar datos
export class TaskValidators {
  
  // Método para validar el título de una tarea
  public static validateTitle(title: string): { isValid: boolean; error?: string } {
    if (!title || typeof title !== 'string') {
      return { isValid: false, error: 'El título es obligatorio y debe ser una cadena de texto' };
    }
    
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      return { isValid: false, error: 'El título no puede estar vacío' };
    }
    
    if (trimmedTitle.length > 200) {
      return { isValid: false, error: 'El título no puede tener más de 200 caracteres' };
    }
    
    return { isValid: true };
  }
  
  // Método para validar la descripción
  public static validateDescription(description?: string): { isValid: boolean; error?: string } {
    if (description === undefined || description === null) {
      return { isValid: true }; // La descripción es opcional
    }
    
    if (typeof description !== 'string') {
      return { isValid: false, error: 'La descripción debe ser una cadena de texto' };
    }
    
    if (description.length > 1000) {
      return { isValid: false, error: 'La descripción no puede tener más de 1000 caracteres' };
    }
    
    return { isValid: true };
  }
  
  // Método para validar la prioridad
  public static validatePriority(priority: any): { isValid: boolean; error?: string } {
    if (!priority) {
      return { isValid: false, error: 'La prioridad es obligatoria' };
    }
    
    const validPriorities = Object.values(TaskPriority);
    if (!validPriorities.includes(priority)) {
      return { 
        isValid: false, 
        error: `La prioridad debe ser una de: ${validPriorities.join(', ')}` 
      };
    }
    
    return { isValid: true };
  }
  
  // Método para validar el estado
  public static validateStatus(status: any): { isValid: boolean; error?: string } {
    if (!status) {
      return { isValid: false, error: 'El estado es obligatorio' };
    }
    
    const validStatuses = Object.values(TaskStatus);
    if (!validStatuses.includes(status)) {
      return { 
        isValid: false, 
        error: `El estado debe ser uno de: ${validStatuses.join(', ')}` 
      };
    }
    
    return { isValid: true };
  }
  
  // Método para validar la fecha límite
  public static validateDueDate(dueDate?: Date): { isValid: boolean; error?: string } {
    if (dueDate === undefined || dueDate === null) {
      return { isValid: true }; // La fecha límite es opcional
    }
    
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
      return { isValid: false, error: 'La fecha límite debe ser una fecha válida' };
    }
    
    const now = new Date();
    if (dueDate < now) {
      return { isValid: false, error: 'La fecha límite no puede ser en el pasado' };
    }
    
    return { isValid: true };
  }
  
  // Método para validar las etiquetas
  public static validateTags(tags?: string[]): { isValid: boolean; error?: string } {
    if (tags === undefined || tags === null) {
      return { isValid: true }; // Las etiquetas son opcionales
    }
    
    if (!Array.isArray(tags)) {
      return { isValid: false, error: 'Las etiquetas deben ser un array' };
    }
    
    if (tags.length > 10) {
      return { isValid: false, error: 'No se pueden tener más de 10 etiquetas' };
    }
    
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      
      if (typeof tag !== 'string') {
        return { isValid: false, error: `La etiqueta en la posición ${i + 1} debe ser una cadena de texto` };
      }
      
      const trimmedTag = tag.trim();
      if (trimmedTag.length === 0) {
        return { isValid: false, error: `La etiqueta en la posición ${i + 1} no puede estar vacía` };
      }
      
      if (trimmedTag.length > 50) {
        return { isValid: false, error: `La etiqueta en la posición ${i + 1} no puede tener más de 50 caracteres` };
      }
      
      // Validar que no contenga caracteres especiales
      if (!/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s_-]+$/.test(trimmedTag)) {
        return { isValid: false, error: `La etiqueta en la posición ${i + 1} contiene caracteres no permitidos` };
      }
    }
    
    return { isValid: true };
  }
  
  // Método para validar una tarea completa para crear
  public static validateCreateTask(taskData: ICreateTask): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validar título
    const titleValidation = this.validateTitle(taskData.title);
    if (!titleValidation.isValid) {
      errors.push(titleValidation.error!);
    }
    
    // Validar descripción
    const descriptionValidation = this.validateDescription(taskData.description);
    if (!descriptionValidation.isValid) {
      errors.push(descriptionValidation.error!);
    }
    
    // Validar prioridad
    const priorityValidation = this.validatePriority(taskData.priority);
    if (!priorityValidation.isValid) {
      errors.push(priorityValidation.error!);
    }
    
    // Validar fecha límite
    const dueDateValidation = this.validateDueDate(taskData.dueDate);
    if (!dueDateValidation.isValid) {
      errors.push(dueDateValidation.error!);
    }
    
    // Validar etiquetas
    const tagsValidation = this.validateTags(taskData.tags);
    if (!tagsValidation.isValid) {
      errors.push(tagsValidation.error!);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Método para validar una tarea para actualizar
  public static validateUpdateTask(updates: IUpdateTask): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validar título si se proporciona
    if (updates.title !== undefined) {
      const titleValidation = this.validateTitle(updates.title);
      if (!titleValidation.isValid) {
        errors.push(titleValidation.error!);
      }
    }
    
    // Validar descripción si se proporciona
    if (updates.description !== undefined) {
      const descriptionValidation = this.validateDescription(updates.description);
      if (!descriptionValidation.isValid) {
        errors.push(descriptionValidation.error!);
      }
    }
    
    // Validar prioridad si se proporciona
    if (updates.priority !== undefined) {
      const priorityValidation = this.validatePriority(updates.priority);
      if (!priorityValidation.isValid) {
        errors.push(priorityValidation.error!);
      }
    }
    
    // Validar estado si se proporciona
    if (updates.status !== undefined) {
      const statusValidation = this.validateStatus(updates.status);
      if (!statusValidation.isValid) {
        errors.push(statusValidation.error!);
      }
    }
    
    // Validar fecha límite si se proporciona
    if (updates.dueDate !== undefined) {
      const dueDateValidation = this.validateDueDate(updates.dueDate);
      if (!dueDateValidation.isValid) {
        errors.push(dueDateValidation.error!);
      }
    }
    
    // Validar etiquetas si se proporcionan
    if (updates.tags !== undefined) {
      const tagsValidation = this.validateTags(updates.tags);
      if (!tagsValidation.isValid) {
        errors.push(tagsValidation.error!);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Método para validar un ID de tarea
  public static validateTaskId(id: any): { isValid: boolean; error?: string } {
    if (!id || typeof id !== 'string') {
      return { isValid: false, error: 'El ID debe ser una cadena de texto válida' };
    }
    
    if (id.trim().length === 0) {
      return { isValid: false, error: 'El ID no puede estar vacío' };
    }
    
    return { isValid: true };
  }
} 