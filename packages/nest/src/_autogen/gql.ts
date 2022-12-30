
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
    SUCCESS = "SUCCESS",
    SKIPPED = "SKIPPED",
    FAILED = "FAILED",
    OUTDATED = "OUTDATED",
    CANCELLED = "CANCELLED"
}

export enum TaskCollection {
    QUEUE = "QUEUE",
    HISTORICAL = "HISTORICAL"
}

export interface SinceUntil {
    since?: Nullable<DateTime>;
    until?: Nullable<DateTime>;
}

export interface SkipTake {
    skip?: Nullable<PositiveInt>;
    take?: Nullable<PositiveInt>;
}

export interface GroupInput {
    groups: string[];
}

export interface HostInput {
    host: string;
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
    getScheduleUser(sinceUntil?: Nullable<SinceUntil>, skipTake?: Nullable<SkipTake>): ScheduleEvent[] | Promise<ScheduleEvent[]>;
    getScheduleGroups(groups: GroupInput, sinceUntil?: Nullable<SinceUntil>, skipTake?: Nullable<SkipTake>): ScheduleEvent[] | Promise<ScheduleEvent[]>;
    getScheduleHosts(host: HostInput, sinceUntil?: Nullable<SinceUntil>, skipTake?: Nullable<SkipTake>): ScheduleEvent[] | Promise<ScheduleEvent[]>;
    getTasks(): Task[] | Promise<Task[]>;
    getTaskCollection(collection: TaskCollection): JSON[] | Promise<JSON[]>;
    me(): User | Promise<User>;
}

export interface User {
    __typename?: 'User';
    id: string;
    email: EmailAddress;
    name: string;
    isSuperuser: boolean;
    picture?: Nullable<URL>;
    groups: string[];
}

export interface LoginResponse {
    __typename?: 'LoginResponse';
    accessToken: JWT;
    user: User;
}

export interface IMutation {
    __typename?: 'IMutation';
    authGoogle(code: string): LoginResponse | Promise<LoginResponse>;
    logout(): boolean | Promise<boolean>;
    updateTaskState(id: string, state: TaskState): boolean | Promise<boolean>;
    finishTask(id: string, result: TaskResult): boolean | Promise<boolean>;
    addGroup(group: string): string[] | Promise<string[]>;
    setGroups(groups: string[]): boolean | Promise<boolean>;
}

export interface ScheduleEvent {
    __typename?: 'ScheduleEvent';
    startsAt: DateTime;
    endsAt: DateTime;
    subject: string;
    code: string;
    type: string;
    room?: Nullable<string>;
    hosts: string[];
    groups: string[];
}

export interface Task {
    __typename?: 'Task';
    id: string;
    date: string;
    hash?: Nullable<string>;
}

export type JWT = any;
export type URL = any;
export type EmailAddress = any;
export type DateTime = any;
export type PositiveInt = any;
export type JSON = any;
export type Time = any;
export type Timestamp = any;
export type TimeZone = any;
export type UtcOffset = any;
export type Duration = any;
export type ISO8601Duration = any;
export type LocalDate = any;
export type LocalTime = any;
export type LocalEndTime = any;
export type NegativeFloat = any;
export type NegativeInt = any;
export type NonEmptyString = any;
export type NonNegativeFloat = any;
export type NonNegativeInt = any;
export type NonPositiveFloat = any;
export type NonPositiveInt = any;
export type PhoneNumber = any;
export type PositiveFloat = any;
export type PostalCode = any;
export type UnsignedFloat = any;
export type UnsignedInt = any;
export type BigInt = any;
export type Long = any;
export type Byte = any;
export type UUID = any;
export type GUID = any;
export type Hexadecimal = any;
export type HexColorCode = any;
export type HSL = any;
export type HSLA = any;
export type IP = any;
export type IPv4 = any;
export type IPv6 = any;
export type ISBN = any;
export type Latitude = any;
export type Longitude = any;
export type MAC = any;
export type Port = any;
export type RGB = any;
export type RGBA = any;
export type SafeInt = any;
export type USCurrency = any;
export type Currency = any;
export type JSONObject = any;
export type IBAN = any;
export type ObjectID = any;
export type Void = any;
export type DID = any;
export type CountryCode = any;
export type Locale = any;
export type RoutingNumber = any;
export type AccountNumber = any;
export type Cuid = any;
export type SemVer = any;
type Nullable<T> = T | null;
