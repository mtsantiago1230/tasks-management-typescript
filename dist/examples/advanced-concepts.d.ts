import { TaskPriority, TaskStatus, ITask } from '../types';
declare function createArray<T>(length: number, value: T): T[];
declare class Container<T> {
    private items;
    add(item: T): void;
    get(index: number): T | undefined;
    getAll(): T[];
}
type TaskId = string | number;
declare function processTaskId(id: TaskId): string;
declare enum TaskCategory {
    URGENT = "urgent",
    IMPORTANT = "important",
    NORMAL = "normal",
    LOW = "low"
}
declare module '../types' {
    interface ITask {
        category?: TaskCategory;
        estimatedTime?: number;
    }
}
declare function isHighPriority(task: ITask): task is ITask & {
    priority: TaskPriority.HIGH | TaskPriority.URGENT;
};
declare function fetchTaskFromAPI(id: string): Promise<ITask>;
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
declare function handleResult(result: Result<ITask>): void;
type TaskInfo = [string, TaskPriority, TaskStatus];
declare function createTaskFromTuple(info: TaskInfo): ITask;
export declare function demonstrateAdvancedConcepts(): void;
export { createArray, Container, processTaskId, isHighPriority, fetchTaskFromAPI, handleResult, createTaskFromTuple };
