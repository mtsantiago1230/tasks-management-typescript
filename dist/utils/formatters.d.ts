import { TaskPriority, TaskStatus, ITask } from '../types';
export declare class TaskFormatters {
    static formatDate(date: Date): string;
    static formatRelativeDate(date: Date): string;
    static formatPriority(priority: TaskPriority): string;
    static formatStatus(status: TaskStatus): string;
    static formatTags(tags: string[]): string;
    static formatTask(task: ITask): string;
    static formatStatistics(stats: any): string;
    static formatTaskList(tasks: ITask[]): string;
    private static getPriorityIcon;
    private static getStatusIcon;
}
