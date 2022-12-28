
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum TaskState {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    FINISHED = "FINISHED",
    SKIPPED = "SKIPPED",
    FAILED = "FAILED"
}

export interface TaskResult {
    result: string[];
    hash: string;
}

export interface App {
    __typename?: 'App';
    version: string;
    node?: Nullable<string>;
    platform?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    app(): Nullable<App> | Promise<Nullable<App>>;
    getTasks(): Task[] | Promise<Task[]>;
}

export interface User {
    __typename?: 'User';
    id: string;
    email: string;
    name: string;
    isSuperuser: boolean;
    picture?: Nullable<string>;
}

export interface LoginResponse {
    __typename?: 'LoginResponse';
    accessToken: string;
    user: User;
}

export interface IMutation {
    __typename?: 'IMutation';
    authGoogle(code: string): LoginResponse | Promise<LoginResponse>;
    logout(): boolean | Promise<boolean>;
    updateTaskState(id: string, state: TaskState): boolean | Promise<boolean>;
    finishTask(id: string, result: TaskResult): boolean | Promise<boolean>;
}

export interface Task {
    __typename?: 'Task';
    id: string;
    date: string;
    hash?: Nullable<string>;
}

type Nullable<T> = T | null;
