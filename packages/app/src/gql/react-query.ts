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
  createSubscription: Scalars['String'];
  createTasksBulk: Scalars['Boolean'];
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  setGroups: Scalars['Boolean'];
  updateTaskState: Scalars['Boolean'];
};


export type MutationAddGroupArgs = {
  group: Scalars['String'];
};


export type MutationAuthGoogleArgs = {
  code: Scalars['String'];
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
  getEventHistory: Array<ScheduleEvent>;
  getGroups?: Maybe<Array<Scalars['String']>>;
  /** Returns all schedule events for the given groups. */
  getScheduleGroups: Array<ScheduleEvent>;
  /** Returns all schedule events for the given host. */
  getScheduleHosts: Array<ScheduleEvent>;
  /** Returns all schedule events for the given user based on theirs preferences. Requires authentication. */
  getScheduleUser: Array<ScheduleEvent>;
  getTaskCollection: Array<Scalars['JSON']>;
  getTasks: Array<Task>;
  me: User;
};


export type QueryAutocompleteGroupsArgs = {
  query: Scalars['String'];
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
  skip?: InputMaybe<Scalars['PositiveInt']>;
  /** The number of items to take. */
  take?: InputMaybe<Scalars['PositiveInt']>;
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

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, email: any, isSuperuser: boolean, picture?: any | null, groups: Array<string> } };

export type AllRangeQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRangeQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string }> };

export type InRangeQueryVariables = Exact<{
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
}>;


export type InRangeQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null, hosts: Array<string>, groups: Array<string> }> };

export type AllNextEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNextEventsQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, subject: string, code: string, type: string, room?: string | null }> };

export type AllEventsSinceQueryVariables = Exact<{
  since: Scalars['DateTime'];
}>;


export type AllEventsSinceQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, subject: string, code: string, type: string, room?: string | null, hosts: Array<string> }> };

export type NextEventsCalQueryVariables = Exact<{
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
}>;


export type NextEventsCalQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null }> };

export type NextEventsDashQueryVariables = Exact<{
  now: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
}>;


export type NextEventsDashQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null }> };

export type UserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGroupsQuery = { __typename?: 'Query', me: { __typename?: 'User', groups: Array<string> } };

export type LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authGoogle: { __typename?: 'LoginResponse', accessToken: any, user: { __typename?: 'User', name: string, isSuperuser: boolean, picture?: any | null } } };

export type SetGroupsMutationVariables = Exact<{
  groups: Array<Scalars['String']> | Scalars['String'];
}>;


export type SetGroupsMutation = { __typename?: 'Mutation', setGroups: boolean };

export type GetCurrentGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentGroupsQuery = { __typename?: 'Query', me: { __typename?: 'User', groups: Array<string> } };

export type GetGroupsAutoCompleteQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetGroupsAutoCompleteQuery = { __typename?: 'Query', autocompleteGroups?: Array<string> | null };


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
export const UserDocument = `
    query User {
  me {
    name
    email
    isSuperuser
    picture
    groups
  }
}
    `;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserQuery, TError, TData>(
      variables === undefined ? ['User'] : ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
      options
    );
export const AllRangeDocument = `
    query AllRange {
  getScheduleUser {
    startsAt
    endsAt
    code
  }
}
    `;
export const useAllRangeQuery = <
      TData = AllRangeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllRangeQueryVariables,
      options?: UseQueryOptions<AllRangeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllRangeQuery, TError, TData>(
      variables === undefined ? ['AllRange'] : ['AllRange', variables],
      fetcher<AllRangeQuery, AllRangeQueryVariables>(client, AllRangeDocument, variables, headers),
      options
    );
export const InRangeDocument = `
    query InRange($start: DateTime!, $end: DateTime!) {
  getScheduleUser(sinceUntil: {since: $start, until: $end}) {
    startsAt
    endsAt
    code
    subject
    type
    room
    hosts
    groups
  }
}
    `;
export const useInRangeQuery = <
      TData = InRangeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: InRangeQueryVariables,
      options?: UseQueryOptions<InRangeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<InRangeQuery, TError, TData>(
      ['InRange', variables],
      fetcher<InRangeQuery, InRangeQueryVariables>(client, InRangeDocument, variables, headers),
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
export const AllEventsSinceDocument = `
    query AllEventsSince($since: DateTime!) {
  getScheduleUser(sinceUntil: {since: $since}) {
    startsAt
    endsAt
    subject
    code
    type
    room
    hosts
  }
}
    `;
export const useAllEventsSinceQuery = <
      TData = AllEventsSinceQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: AllEventsSinceQueryVariables,
      options?: UseQueryOptions<AllEventsSinceQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllEventsSinceQuery, TError, TData>(
      ['AllEventsSince', variables],
      fetcher<AllEventsSinceQuery, AllEventsSinceQueryVariables>(client, AllEventsSinceDocument, variables, headers),
      options
    );
export const NextEventsCalDocument = `
    query NextEventsCal($start: DateTime!, $end: DateTime!) {
  getScheduleUser(sinceUntil: {since: $start, until: $end}) {
    startsAt
    endsAt
    code
    subject
    type
    room
  }
}
    `;
export const useNextEventsCalQuery = <
      TData = NextEventsCalQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NextEventsCalQueryVariables,
      options?: UseQueryOptions<NextEventsCalQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NextEventsCalQuery, TError, TData>(
      ['NextEventsCal', variables],
      fetcher<NextEventsCalQuery, NextEventsCalQueryVariables>(client, NextEventsCalDocument, variables, headers),
      options
    );
export const NextEventsDashDocument = `
    query NextEventsDash($now: DateTime!, $deadline: DateTime!) {
  getScheduleUser(
    sinceUntil: {since: $now, until: $deadline}
    skipTake: {take: 4}
  ) {
    startsAt
    endsAt
    code
    subject
    type
    room
  }
}
    `;
export const useNextEventsDashQuery = <
      TData = NextEventsDashQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NextEventsDashQueryVariables,
      options?: UseQueryOptions<NextEventsDashQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NextEventsDashQuery, TError, TData>(
      ['NextEventsDash', variables],
      fetcher<NextEventsDashQuery, NextEventsDashQueryVariables>(client, NextEventsDashDocument, variables, headers),
      options
    );
export const UserGroupsDocument = `
    query UserGroups {
  me {
    groups
  }
}
    `;
export const useUserGroupsQuery = <
      TData = UserGroupsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserGroupsQueryVariables,
      options?: UseQueryOptions<UserGroupsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserGroupsQuery, TError, TData>(
      variables === undefined ? ['UserGroups'] : ['UserGroups', variables],
      fetcher<UserGroupsQuery, UserGroupsQueryVariables>(client, UserGroupsDocument, variables, headers),
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
export const SetGroupsDocument = `
    mutation SetGroups($groups: [String!]!) {
  setGroups(groups: $groups)
}
    `;
export const useSetGroupsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetGroupsMutation, TError, SetGroupsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetGroupsMutation, TError, SetGroupsMutationVariables, TContext>(
      ['SetGroups'],
      (variables?: SetGroupsMutationVariables) => fetcher<SetGroupsMutation, SetGroupsMutationVariables>(client, SetGroupsDocument, variables, headers)(),
      options
    );
export const GetCurrentGroupsDocument = `
    query GetCurrentGroups {
  me {
    groups
  }
}
    `;
export const useGetCurrentGroupsQuery = <
      TData = GetCurrentGroupsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCurrentGroupsQueryVariables,
      options?: UseQueryOptions<GetCurrentGroupsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCurrentGroupsQuery, TError, TData>(
      variables === undefined ? ['GetCurrentGroups'] : ['GetCurrentGroups', variables],
      fetcher<GetCurrentGroupsQuery, GetCurrentGroupsQueryVariables>(client, GetCurrentGroupsDocument, variables, headers),
      options
    );
export const GetGroupsAutoCompleteDocument = `
    query GetGroupsAutoComplete($search: String!) {
  autocompleteGroups(query: $search)
}
    `;
export const useGetGroupsAutoCompleteQuery = <
      TData = GetGroupsAutoCompleteQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetGroupsAutoCompleteQueryVariables,
      options?: UseQueryOptions<GetGroupsAutoCompleteQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetGroupsAutoCompleteQuery, TError, TData>(
      ['GetGroupsAutoComplete', variables],
      fetcher<GetGroupsAutoCompleteQuery, GetGroupsAutoCompleteQueryVariables>(client, GetGroupsAutoCompleteDocument, variables, headers),
      options
    );