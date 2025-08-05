import { ICreateTask, IUpdateTask } from '../types';
export declare class TaskValidators {
    static validateTitle(title: string): {
        isValid: boolean;
        error?: string;
    };
    static validateDescription(description?: string): {
        isValid: boolean;
        error?: string;
    };
    static validatePriority(priority: any): {
        isValid: boolean;
        error?: string;
    };
    static validateStatus(status: any): {
        isValid: boolean;
        error?: string;
    };
    static validateDueDate(dueDate?: Date): {
        isValid: boolean;
        error?: string;
    };
    static validateTags(tags?: string[]): {
        isValid: boolean;
        error?: string;
    };
    static validateCreateTask(taskData: ICreateTask): {
        isValid: boolean;
        errors: string[];
    };
    static validateUpdateTask(updates: IUpdateTask): {
        isValid: boolean;
        errors: string[];
    };
    static validateTaskId(id: any): {
        isValid: boolean;
        error?: string;
    };
}
