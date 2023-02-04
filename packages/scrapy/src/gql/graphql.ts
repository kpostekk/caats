/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  EmailAddress: any;
  JSON: any;
  JWT: any;
  PositiveInt: any;
  URL: any;
  UUID: any;
};

export type App = {
  __typename?: 'App';
  node?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type EventSource = {
  __typename?: 'EventSource';
  constantId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  object: Scalars['JSON'];
  task: StoredTask;
};

export type GroupInput = {
  groups: Array<Scalars['String']>;
};

export type HostInput = {
  host: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['JWT'];
  sessionId: Scalars['UUID'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGroup: Array<Scalars['String']>;
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: LoginResponse;
  createScraper: Scalars['String'];
  createSubscription: Scalars['String'];
  createTasksBulk: Scalars['Boolean'];
  /** @deprecated Use subscription receiveTask instead. */
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  setGroups: Scalars['Boolean'];
  /** @deprecated Use subscription receiveTask instead. */
  updateTaskState: Scalars['Boolean'];
};


export type MutationAddGroupArgs = {
  group: Scalars['String'];
};


export type MutationAuthGoogleArgs = {
  code: Scalars['String'];
};


export type MutationCreateScraperArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSubscriptionArgs = {
  groups: Array<InputMaybe<Scalars['String']>>;
};


export type MutationCreateTasksBulkArgs = {
  input: TasksBulkInput;
};


export type MutationFinishTaskArgs = {
  id: Scalars['ID'];
  result: TaskResult;
};


export type MutationSetGroupsArgs = {
  groups: Array<Scalars['String']>;
};


export type MutationUpdateTaskStateArgs = {
  id: Scalars['ID'];
  state: TaskState;
};

export type Query = {
  __typename?: 'Query';
  app?: Maybe<App>;
  autocompleteGroups?: Maybe<Array<Scalars['String']>>;
  findByDescription: Array<ScheduleEvent>;
  getEvent?: Maybe<ScheduleEvent>;
  getEventHistory: Array<ScheduleEvent>;
  getGroups?: Maybe<Array<Scalars['String']>>;
  /** Returns all schedule events for the given groups. */
  getScheduleGroups: Array<ScheduleEvent>;
  /** Returns all schedule events for the given host. */
  getScheduleHosts: Array<ScheduleEvent>;
  /** Returns all schedule events for the given user based on theirs preferences. Requires authentication. */
  getScheduleUser: Array<ScheduleEvent>;
  getTaskCollection: Array<Scalars['JSON']>;
  /** @deprecated Use subscription receiveTask instead. */
  getTasks: Array<Task>;
  me: User;
};


export type QueryAutocompleteGroupsArgs = {
  query: Scalars['String'];
};


export type QueryFindByDescriptionArgs = {
  query: Scalars['String'];
};


export type QueryGetEventArgs = {
  id: Scalars['ID'];
};


export type QueryGetEventHistoryArgs = {
  constantId: Scalars['String'];
};


export type QueryGetScheduleGroupsArgs = {
  groups: GroupInput;
  sinceUntil?: InputMaybe<SinceUntil>;
  skipTake?: InputMaybe<SkipTake>;
};


export type QueryGetScheduleHostsArgs = {
  host: HostInput;
  sinceUntil?: InputMaybe<SinceUntil>;
  skipTake?: InputMaybe<SkipTake>;
};


export type QueryGetScheduleUserArgs = {
  sinceUntil?: InputMaybe<SinceUntil>;
  skipTake?: InputMaybe<SkipTake>;
};


export type QueryGetTaskCollectionArgs = {
  collection: TaskCollection;
};

/** Represents a schedule event. */
export type ScheduleEvent = {
  __typename?: 'ScheduleEvent';
  /** The short code of the subject. */
  code: Scalars['String'];
  endsAt: Scalars['DateTime'];
  /** Groups that are attending this event. */
  groups: Array<Scalars['String']>;
  /** Hosts that are attending this event. */
  hosts: Array<Scalars['String']>;
  id: Scalars['ID'];
  /** The room where the event is taking place. */
  room?: Maybe<Scalars['String']>;
  /** The source of the event. */
  source: EventSource;
  startsAt: Scalars['DateTime'];
  /** The full name of the subject. */
  subject: Scalars['String'];
  /** The type of the event. */
  type: Scalars['String'];
};

/** Represents a time range. */
export type SinceUntil = {
  since?: InputMaybe<Scalars['DateTime']>;
  until?: InputMaybe<Scalars['DateTime']>;
};

/** Represents a skip and take. Useful for pagination. */
export type SkipTake = {
  /** The number of items to skip. */
  skip?: InputMaybe<Scalars['PositiveInt']>;
  /** The number of items to take. */
  take?: InputMaybe<Scalars['PositiveInt']>;
};

export type StoredTask = {
  __typename?: 'StoredTask';
  createdAt: Scalars['DateTime'];
  finalHash?: Maybe<Scalars['String']>;
  finishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  initialHash?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  receiveTask?: Maybe<Task>;
};

export type Task = {
  __typename?: 'Task';
  date: Scalars['String'];
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export enum TaskCollection {
  Historical = 'HISTORICAL',
  Queue = 'QUEUE'
}

export type TaskResult = {
  hash: Scalars['String'];
  result: Array<Scalars['String']>;
};

export enum TaskState {
  /** The task has been cancelled by the user or system. */
  Cancelled = 'CANCELLED',
  /** The task could not be finalized. */
  Failed = 'FAILED',
  /** Data from this task were already processed by a newer task. */
  Outdated = 'OUTDATED',
  /** The task is waiting to be executed. */
  Pending = 'PENDING',
  /** The task is currently being executed by at least one scraper. */
  Running = 'RUNNING',
  /** The task has been processed successfully but data source hasn't changed. */
  Skipped = 'SKIPPED',
  /** The task has been processed successfully and represents the latest version of the data. */
  Success = 'SUCCESS'
}

export type TasksBulkInput = {
  count: Scalars['PositiveInt'];
  offset?: InputMaybe<Scalars['Int']>;
};

/** A CaaTS user. */
export type User = {
  __typename?: 'User';
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress'];
  groups: Array<Scalars['String']>;
  /** Internal ID of the user. */
  id: Scalars['ID'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String'];
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']>;
};

export type GetAppVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppVersionQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id: string, date: string, hash?: string | null }> };

export type UpdateTaskStateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UpdateTaskStateMutation = { __typename?: 'Mutation', updateTaskState: boolean };

export type SkipTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SkipTaskMutation = { __typename?: 'Mutation', updateTaskState: boolean };

export type FailTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FailTaskMutation = { __typename?: 'Mutation', updateTaskState: boolean };

export type FinishTaskMutationVariables = Exact<{
  id: Scalars['ID'];
  results: TaskResult;
}>;


export type FinishTaskMutation = { __typename?: 'Mutation', finishTask: boolean };

export type AwaitTaskSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AwaitTaskSubscription = { __typename?: 'Subscription', receiveTask?: { __typename?: 'Task', id: string, date: string, hash?: string | null } | null };


export const GetAppVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAppVersion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetAppVersionQuery, GetAppVersionQueryVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateTaskStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"EnumValue","value":"RUNNING"}}]}]}}]} as unknown as DocumentNode<UpdateTaskStateMutation, UpdateTaskStateMutationVariables>;
export const SkipTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"skipTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"EnumValue","value":"SKIPPED"}}]}]}}]} as unknown as DocumentNode<SkipTaskMutation, SkipTaskMutationVariables>;
export const FailTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"failTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"EnumValue","value":"FAILED"}}]}]}}]} as unknown as DocumentNode<FailTaskMutation, FailTaskMutationVariables>;
export const FinishTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"finishTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"results"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskResult"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"result"},"value":{"kind":"Variable","name":{"kind":"Name","value":"results"}}}]}]}}]} as unknown as DocumentNode<FinishTaskMutation, FinishTaskMutationVariables>;
export const AwaitTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"awaitTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receiveTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]} as unknown as DocumentNode<AwaitTaskSubscription, AwaitTaskSubscriptionVariables>;