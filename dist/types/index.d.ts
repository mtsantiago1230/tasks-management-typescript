export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export interface ITask {
    id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    tags: string[];
    completedAt?: Date;
}
export interface ICreateTask {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: Date;
    tags?: string[];
}
export interface IUpdateTask {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: Date;
    tags?: string[];
    completedAt?: Date;
}
export interface ITaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    tags?: string[];
    search?: string;
    dueDateFrom?: Date;
    dueDateTo?: Date;
}
export type TaskId = string;
export type SortOption = 'title' | 'priority' | 'createdAt' | 'dueDate' | 'status';
export type SortDirection = 'asc' | 'desc';
export interface ISortOptions {
    field: SortOption;
    direction: SortDirection;
}
export interface IOperationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface ITaskStatistics {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
    cancelled: number;
    overdue: number;
    byPriority: Record<TaskPriority, number>;
}
