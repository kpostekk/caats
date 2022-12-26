
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface App {
    __typename?: 'App';
    version: string;
    node?: Nullable<string>;
    platform?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    app(): Nullable<App> | Promise<Nullable<App>>;
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
}

type Nullable<T> = T | null;
