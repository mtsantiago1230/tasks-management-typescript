import { ITask, ICreateTask, IUpdateTask, ITaskFilters, ISortOptions, ITaskStatistics, TaskId, IOperationResult } from './types';
export declare class TaskManager {
    private tasks;
    private static instance;
    private constructor();
    static getInstance(): TaskManager;
    private generateId;
    createTask(taskData: ICreateTask): IOperationResult<ITask>;
    getTaskById(id: TaskId): IOperationResult<ITask>;
    getAllTasks(): ITask[];
    updateTask(id: TaskId, updates: IUpdateTask): IOperationResult<ITask>;
    deleteTask(id: TaskId): IOperationResult<void>;
    searchTasks(filters: ITaskFilters, sortOptions?: ISortOptions): ITask[];
    getStatistics(): ITaskStatistics;
    completeTask(id: TaskId): IOperationResult<ITask>;
    startTask(id: TaskId): IOperationResult<ITask>;
    cancelTask(id: TaskId): IOperationResult<ITask>;
    private initializeSampleTasks;
}
