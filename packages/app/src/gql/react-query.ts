import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO String of Date and Time. */
  DateTime: any;
  EmailAddress: any;
  JSON: any;
  JWT: any;
  PositiveInt: any;
  URL: any;
};

export type App = {
  __typename?: 'App';
  node?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  version: Scalars['String'];
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
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: LoginResponse;
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  updateTaskState: Scalars['Boolean'];
};


export type MutationAuthGoogleArgs = {
  code: Scalars['String'];
};


export type MutationFinishTaskArgs = {
  id: Scalars['ID'];
  result: TaskResult;
};


export type MutationUpdateTaskStateArgs = {
  id: Scalars['ID'];
  state: TaskState;
};

export type Query = {
  __typename?: 'Query';
  app?: Maybe<App>;
  /** Returns all schedule events for the given groups. */
  getScheduleGroups: Array<ScheduleEvent>;
  /** Returns all schedule events for the given host. */
  getScheduleHosts: Array<ScheduleEvent>;
  /** Returns all schedule events for the given user based on theirs preferences. Requires authentication. */
  getScheduleUser: Array<ScheduleEvent>;
  getTaskCollection: Array<Scalars['JSON']>;
  getTasks: Array<Task>;
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
  /** The room where the event is taking place. */
  room?: Maybe<Scalars['String']>;
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
  skip?: InputMaybe<Scalars['Int']>;
  /** The number of items to take. */
  take?: InputMaybe<Scalars['Int']>;
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

/** A CaaTS user. */
export type User = {
  __typename?: 'User';
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress'];
  /** Internal ID of the user. */
  id: Scalars['ID'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String'];
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']>;
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

export type AllNextEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNextEventsQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, subject: string, code: string, type: string, room?: string | null }> };

export type LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authGoogle: { __typename?: 'LoginResponse', accessToken: any, user: { __typename?: 'User', name: string, isSuperuser: boolean, picture?: any | null } } };


export const AppDocument = `
    query App {
  app {
    version
  }
}
    `;
export const useAppQuery = <
      TData = AppQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AppQueryVariables,
      options?: UseQueryOptions<AppQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AppQuery, TError, TData>(
      variables === undefined ? ['App'] : ['App', variables],
      fetcher<AppQuery, AppQueryVariables>(client, AppDocument, variables, headers),
      options
    );
export const AllNextEventsDocument = `
    query AllNextEvents {
  getScheduleUser {
    startsAt
    endsAt
    subject
    code
    type
    room
  }
}
    `;
export const useAllNextEventsQuery = <
      TData = AllNextEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllNextEventsQueryVariables,
      options?: UseQueryOptions<AllNextEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllNextEventsQuery, TError, TData>(
      variables === undefined ? ['AllNextEvents'] : ['AllNextEvents', variables],
      fetcher<AllNextEventsQuery, AllNextEventsQueryVariables>(client, AllNextEventsDocument, variables, headers),
      options
    );
export const LoginDocument = `
    mutation Login($code: String!) {
  authGoogle(code: $code) {
    accessToken
    user {
      name
      isSuperuser
      picture
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );