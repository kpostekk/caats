import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  EmailAddress: { input: any; output: any; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  JWT: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  URL: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type App = {
  __typename?: 'App';
  node?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  version: Scalars['String']['output'];
};

export type CurrentTask = {
  __typename?: 'CurrentTask';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: TaskState;
  targetDate: Scalars['Date']['output'];
};

export type EventSource = {
  __typename?: 'EventSource';
  constantId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  object: Scalars['JSON']['output'];
  task: StoredTask;
};

export type GroupInput = {
  groups: Array<Scalars['String']['input']>;
};

export type HostInput = {
  host: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['JWT']['output'];
  sessionId: Scalars['UUID']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: LoginResponse;
  /** Creates a token for scraper. */
  createScraper: Scalars['String']['output'];
  /** Creates a subscription for a specified list of groups. Returns link with ICS subscription. */
  createSubscription: SubscriptionLinks;
  /** Creates many events relatively to current date. */
  createTasksBulk: Scalars['Boolean']['output'];
  /** Allows to store scrapped content. Internal. */
  finishTask: Scalars['Boolean']['output'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean']['output'];
  setGroups: Scalars['Boolean']['output'];
  /** Updates task state. Internal. */
  updateTaskState: Scalars['Boolean']['output'];
};


export type MutationAuthGoogleArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateScraperArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSubscriptionArgs = {
  options: SubscriptionOptions;
};


export type MutationCreateTasksBulkArgs = {
  input: TasksBulkInput;
};


export type MutationFinishTaskArgs = {
  id: Scalars['ID']['input'];
  result: TaskResult;
};


export type MutationSetGroupsArgs = {
  groups: Array<Scalars['String']['input']>;
};


export type MutationUpdateTaskStateArgs = {
  id: Scalars['ID']['input'];
  state: TaskState;
};

export type Query = {
  __typename?: 'Query';
  /** Returns details about app. */
  app?: Maybe<App>;
  /** Details for specified event. */
  event?: Maybe<ScheduleEvent>;
  /** List of all available events. Not specifying target results in empty list. */
  events: Array<ScheduleEvent>;
  findByDescription: Array<ScheduleEvent>;
  /** Returns groups matching the filter. Function for custom frontend. */
  groups: Array<Scalars['String']['output']>;
  ongoingScrapers: Array<WorkingScraper>;
  scrapers: Array<Scraper>;
  sources: Array<EventSource>;
  tasks: Array<StoredTask>;
  user: User;
};


export type QueryEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEventsArgs = {
  search?: InputMaybe<ScheduleInput>;
  targets?: InputMaybe<ScheduleTargets>;
};


export type QueryFindByDescriptionArgs = {
  query: Scalars['String']['input'];
};


export type QueryGroupsArgs = {
  filter?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Represents a schedule event. */
export type ScheduleEvent = {
  __typename?: 'ScheduleEvent';
  /** The short code of the subject. */
  code: Scalars['String']['output'];
  endsAt: Scalars['DateTime']['output'];
  /** Groups that are attending this event. */
  groups: Array<Scalars['String']['output']>;
  /** Hosts that are attending this event. */
  hosts: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The following event. */
  next?: Maybe<ScheduleEvent>;
  /** The previous event. */
  previous?: Maybe<ScheduleEvent>;
  /** The room where the event is taking place. */
  room?: Maybe<Scalars['String']['output']>;
  /** The source of the event. */
  source: EventSource;
  startsAt: Scalars['DateTime']['output'];
  /** The full name of the subject. */
  subject: Scalars['String']['output'];
  /** The type of the event. */
  type: Scalars['String']['output'];
};

export type ScheduleInput = {
  since?: InputMaybe<Scalars['DateTime']['input']>;
  skip?: InputMaybe<Scalars['PositiveInt']['input']>;
  take?: InputMaybe<Scalars['PositiveInt']['input']>;
  until?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduleTargets = {
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  hosts?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Scraper = {
  __typename?: 'Scraper';
  alias: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  state: Scalars['String']['output'];
};

/** Represents a time range. */
export type SinceUntil = {
  since?: InputMaybe<Scalars['DateTime']['input']>;
  until?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Represents a skip and take. Useful for pagination. */
export type SkipTake = {
  /** The number of items to skip. */
  skip?: InputMaybe<Scalars['PositiveInt']['input']>;
  /** The number of items to take. */
  take?: InputMaybe<Scalars['PositiveInt']['input']>;
};

export type StoredTask = {
  __typename?: 'StoredTask';
  createdAt: Scalars['DateTime']['output'];
  finalHash?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  initialHash?: Maybe<Scalars['String']['output']>;
  scraper?: Maybe<Scraper>;
  status: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  receiveTask?: Maybe<Task>;
};

export type SubscriptionLinks = {
  __typename?: 'SubscriptionLinks';
  full: Scalars['String']['output'];
  short?: Maybe<Scalars['String']['output']>;
};

export type SubscriptionOptions = {
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hosts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Task = {
  __typename?: 'Task';
  date: Scalars['String']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export enum TaskCollection {
  Historical = 'HISTORICAL',
  Queue = 'QUEUE'
}

export type TaskResult = {
  hash: Scalars['String']['input'];
  result: Array<Scalars['String']['input']>;
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
  count: Scalars['PositiveInt']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** A CaaTS user. */
export type User = {
  __typename?: 'User';
  /** The current event for current user. */
  currentEvent?: Maybe<ScheduleEvent>;
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress']['output'];
  /** List of events for current user. */
  events: Array<ScheduleEvent>;
  groups: Array<Scalars['String']['output']>;
  /** Internal ID of the user. */
  id: Scalars['ID']['output'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean']['output'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String']['output'];
  /** The next event for current user. */
  nextEvent?: Maybe<ScheduleEvent>;
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']['output']>;
};


/** A CaaTS user. */
export type UserEventsArgs = {
  search?: InputMaybe<ScheduleInput>;
};

export type WorkingScraper = {
  __typename?: 'WorkingScraper';
  alias: Scalars['String']['output'];
  currentTask?: Maybe<CurrentTask>;
  id: Scalars['ID']['output'];
  lastSeen: Scalars['DateTime']['output'];
  state: Scalars['String']['output'];
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

export type SimpleEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, email: any, isSuperuser: boolean, picture?: any | null, groups: Array<string>, nextEvent?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null, previous?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null } | null } | null, currentEvent?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null } | null } };

export type UserEventsQueryVariables = Exact<{
  since: Scalars['DateTime']['input'];
  until: Scalars['DateTime']['input'];
}>;


export type UserEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null }> } };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', startsAt: string, endsAt: string, code: string, subject: string, type: string, room?: string | null }> } };

export type EventsInRangeQueryVariables = Exact<{
  start: Scalars['DateTime']['input'];
  end: Scalars['DateTime']['input'];
}>;


export type EventsInRangeQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null }> } };

export type UserEventsAfterQueryVariables = Exact<{
  since: Scalars['DateTime']['input'];
}>;


export type UserEventsAfterQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, type: string, hosts: Array<string>, room?: string | null }> } };

export type UserBusyDaysQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBusyDaysQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, type: string, startsAt: string }> } };

export type DetailedEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: Record<string, unknown>, createdAt: string, task: { __typename?: 'StoredTask', id: string, createdAt: string, finishedAt?: string | null, initialHash?: string | null, finalHash?: string | null, status: string, scraper?: { __typename?: 'Scraper', id: string, alias: string, lastSeen?: string | null } | null } } };

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type EventDetailsQuery = { __typename?: 'Query', event?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: string, endsAt: string, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: Record<string, unknown>, createdAt: string, task: { __typename?: 'StoredTask', id: string, createdAt: string, finishedAt?: string | null, initialHash?: string | null, finalHash?: string | null, status: string, scraper?: { __typename?: 'Scraper', id: string, alias: string, lastSeen?: string | null } | null } } } | null };

export type SimpleProfileFragment = { __typename?: 'User', id: string, name: string, isSuperuser: boolean, picture?: any | null, groups: Array<string>, email: any };

export type LoginMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authGoogle: { __typename?: 'LoginResponse', accessToken: any, user: { __typename?: 'User', isSuperuser: boolean, name: string, picture?: any | null, id: string, groups: Array<string>, email: any } } };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, isSuperuser: boolean, picture?: any | null, groups: Array<string>, email: any } };

export type GeneralizedSearchQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type GeneralizedSearchQuery = { __typename?: 'Query', findByDescription: Array<{ __typename?: 'ScheduleEvent', id: string, startsAt: string, endsAt: string, code: string, subject: string, type: string, room?: string | null, hosts: Array<string>, groups: Array<string> }> };

export type SetGroupsMutationVariables = Exact<{
  groups: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type SetGroupsMutation = { __typename?: 'Mutation', setGroups: boolean };

export type GetCurrentGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentGroupsQuery = { __typename?: 'Query', user: { __typename?: 'User', groups: Array<string> } };

export type CreateScraperMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateScraperMutation = { __typename?: 'Mutation', createScraper: string };

export type FindGroupsQueryVariables = Exact<{
  search: Array<Array<Scalars['String']['input']> | Scalars['String']['input']> | Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type FindGroupsQuery = { __typename?: 'Query', groups: Array<string> };

export type CreateSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'SubscriptionLinks', short?: string | null } };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', ongoingScrapers: Array<{ __typename?: 'WorkingScraper', alias: string, lastSeen: string, state: string, currentTask?: { __typename?: 'CurrentTask', id: string, createdAt: string, targetDate: string, status: TaskState } | null }> };


export const SimpleEventFragmentDoc = `
    fragment SimpleEvent on ScheduleEvent {
  id
  code
  subject
  startsAt
  endsAt
  type
  hosts
  room
}
    `;
export const DetailedEventFragmentDoc = `
    fragment DetailedEvent on ScheduleEvent {
  id
  code
  subject
  startsAt
  endsAt
  room
  groups
  hosts
  type
  source {
    id
    constantId
    object
    createdAt
    task {
      id
      createdAt
      finishedAt
      initialHash
      finalHash
      status
      scraper {
        id
        alias
        lastSeen
      }
    }
  }
}
    `;
export const SimpleProfileFragmentDoc = `
    fragment SimpleProfile on User {
  id
  name
  isSuperuser
  picture
  groups
  email
}
    `;
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
      options?: Omit<UseQueryOptions<AppQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AppQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<AppQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['App'] : ['App', variables],
    queryFn: fetcher<AppQuery, AppQueryVariables>(client, AppDocument, variables, headers),
    ...options
  }
    )};

export const UserDocument = `
    query User {
  user {
    name
    email
    isSuperuser
    picture
    groups
    nextEvent {
      ...SimpleEvent
      previous {
        ...SimpleEvent
      }
    }
    currentEvent {
      ...SimpleEvent
    }
  }
}
    ${SimpleEventFragmentDoc}`;

export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserQueryVariables,
      options?: Omit<UseQueryOptions<UserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<UserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['User'] : ['User', variables],
    queryFn: fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
    ...options
  }
    )};

export const UserEventsDocument = `
    query UserEvents($since: DateTime!, $until: DateTime!) {
  user {
    events(search: {since: $since, until: $until}) {
      ...SimpleEvent
    }
  }
}
    ${SimpleEventFragmentDoc}`;

export const useUserEventsQuery = <
      TData = UserEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserEventsQueryVariables,
      options?: Omit<UseQueryOptions<UserEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserEventsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<UserEventsQuery, TError, TData>(
      {
    queryKey: ['UserEvents', variables],
    queryFn: fetcher<UserEventsQuery, UserEventsQueryVariables>(client, UserEventsDocument, variables, headers),
    ...options
  }
    )};

export const AllEventsDocument = `
    query AllEvents {
  user {
    events {
      startsAt
      endsAt
      code
      subject
      type
      room
    }
  }
}
    `;

export const useAllEventsQuery = <
      TData = AllEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AllEventsQueryVariables,
      options?: Omit<UseQueryOptions<AllEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllEventsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<AllEventsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AllEvents'] : ['AllEvents', variables],
    queryFn: fetcher<AllEventsQuery, AllEventsQueryVariables>(client, AllEventsDocument, variables, headers),
    ...options
  }
    )};

export const EventsInRangeDocument = `
    query EventsInRange($start: DateTime!, $end: DateTime!) {
  user {
    events(search: {since: $start, until: $end}) {
      ...SimpleEvent
    }
  }
}
    ${SimpleEventFragmentDoc}`;

export const useEventsInRangeQuery = <
      TData = EventsInRangeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EventsInRangeQueryVariables,
      options?: Omit<UseQueryOptions<EventsInRangeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EventsInRangeQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<EventsInRangeQuery, TError, TData>(
      {
    queryKey: ['EventsInRange', variables],
    queryFn: fetcher<EventsInRangeQuery, EventsInRangeQueryVariables>(client, EventsInRangeDocument, variables, headers),
    ...options
  }
    )};

export const UserEventsAfterDocument = `
    query UserEventsAfter($since: DateTime!) {
  user {
    events(search: {since: $since}) {
      ...SimpleEvent
    }
  }
}
    ${SimpleEventFragmentDoc}`;

export const useUserEventsAfterQuery = <
      TData = UserEventsAfterQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserEventsAfterQueryVariables,
      options?: Omit<UseQueryOptions<UserEventsAfterQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserEventsAfterQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<UserEventsAfterQuery, TError, TData>(
      {
    queryKey: ['UserEventsAfter', variables],
    queryFn: fetcher<UserEventsAfterQuery, UserEventsAfterQueryVariables>(client, UserEventsAfterDocument, variables, headers),
    ...options
  }
    )};

export const UserBusyDaysDocument = `
    query UserBusyDays {
  user {
    events {
      id
      code
      type
      startsAt
    }
  }
}
    `;

export const useUserBusyDaysQuery = <
      TData = UserBusyDaysQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserBusyDaysQueryVariables,
      options?: Omit<UseQueryOptions<UserBusyDaysQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserBusyDaysQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<UserBusyDaysQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserBusyDays'] : ['UserBusyDays', variables],
    queryFn: fetcher<UserBusyDaysQuery, UserBusyDaysQueryVariables>(client, UserBusyDaysDocument, variables, headers),
    ...options
  }
    )};

export const EventDetailsDocument = `
    query EventDetails($id: Int!) {
  event(id: $id) {
    ...DetailedEvent
  }
}
    ${DetailedEventFragmentDoc}`;

export const useEventDetailsQuery = <
      TData = EventDetailsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: EventDetailsQueryVariables,
      options?: Omit<UseQueryOptions<EventDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<EventDetailsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<EventDetailsQuery, TError, TData>(
      {
    queryKey: ['EventDetails', variables],
    queryFn: fetcher<EventDetailsQuery, EventDetailsQueryVariables>(client, EventDetailsDocument, variables, headers),
    ...options
  }
    )};

export const LoginDocument = `
    mutation Login($code: String!) {
  authGoogle(code: $code) {
    accessToken
    user {
      ...SimpleProfile
      isSuperuser
      name
      picture
    }
  }
}
    ${SimpleProfileFragmentDoc}`;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      {
    mutationKey: ['Login'],
    mutationFn: (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
    ...options
  }
    )};

export const UserProfileDocument = `
    query UserProfile {
  user {
    ...SimpleProfile
  }
}
    ${SimpleProfileFragmentDoc}`;

export const useUserProfileQuery = <
      TData = UserProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserProfileQueryVariables,
      options?: Omit<UseQueryOptions<UserProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserProfileQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<UserProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserProfile'] : ['UserProfile', variables],
    queryFn: fetcher<UserProfileQuery, UserProfileQueryVariables>(client, UserProfileDocument, variables, headers),
    ...options
  }
    )};

export const GeneralizedSearchDocument = `
    query GeneralizedSearch($input: String!) {
  findByDescription(query: $input) {
    id
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

export const useGeneralizedSearchQuery = <
      TData = GeneralizedSearchQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GeneralizedSearchQueryVariables,
      options?: Omit<UseQueryOptions<GeneralizedSearchQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GeneralizedSearchQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GeneralizedSearchQuery, TError, TData>(
      {
    queryKey: ['GeneralizedSearch', variables],
    queryFn: fetcher<GeneralizedSearchQuery, GeneralizedSearchQueryVariables>(client, GeneralizedSearchDocument, variables, headers),
    ...options
  }
    )};

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
    ) => {
    
    return useMutation<SetGroupsMutation, TError, SetGroupsMutationVariables, TContext>(
      {
    mutationKey: ['SetGroups'],
    mutationFn: (variables?: SetGroupsMutationVariables) => fetcher<SetGroupsMutation, SetGroupsMutationVariables>(client, SetGroupsDocument, variables, headers)(),
    ...options
  }
    )};

export const GetCurrentGroupsDocument = `
    query GetCurrentGroups {
  user {
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
      options?: Omit<UseQueryOptions<GetCurrentGroupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCurrentGroupsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetCurrentGroupsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCurrentGroups'] : ['GetCurrentGroups', variables],
    queryFn: fetcher<GetCurrentGroupsQuery, GetCurrentGroupsQueryVariables>(client, GetCurrentGroupsDocument, variables, headers),
    ...options
  }
    )};

export const CreateScraperDocument = `
    mutation CreateScraper($name: String) {
  createScraper(name: $name)
}
    `;

export const useCreateScraperMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateScraperMutation, TError, CreateScraperMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateScraperMutation, TError, CreateScraperMutationVariables, TContext>(
      {
    mutationKey: ['CreateScraper'],
    mutationFn: (variables?: CreateScraperMutationVariables) => fetcher<CreateScraperMutation, CreateScraperMutationVariables>(client, CreateScraperDocument, variables, headers)(),
    ...options
  }
    )};

export const FindGroupsDocument = `
    query FindGroups($search: [[String!]!]!) {
  groups(filter: $search)
}
    `;

export const useFindGroupsQuery = <
      TData = FindGroupsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindGroupsQueryVariables,
      options?: Omit<UseQueryOptions<FindGroupsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindGroupsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<FindGroupsQuery, TError, TData>(
      {
    queryKey: ['FindGroups', variables],
    queryFn: fetcher<FindGroupsQuery, FindGroupsQueryVariables>(client, FindGroupsDocument, variables, headers),
    ...options
  }
    )};

export const CreateSubscriptionDocument = `
    mutation CreateSubscription {
  createSubscription(options: {user: true}) {
    short
  }
}
    `;

export const useCreateSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateSubscriptionMutation, TError, CreateSubscriptionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateSubscriptionMutation, TError, CreateSubscriptionMutationVariables, TContext>(
      {
    mutationKey: ['CreateSubscription'],
    mutationFn: (variables?: CreateSubscriptionMutationVariables) => fetcher<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(client, CreateSubscriptionDocument, variables, headers)(),
    ...options
  }
    )};

export const StatusDocument = `
    query Status {
  ongoingScrapers {
    alias
    lastSeen
    state
    currentTask {
      id
      createdAt
      targetDate
      status
    }
  }
}
    `;

export const useStatusQuery = <
      TData = StatusQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: StatusQueryVariables,
      options?: Omit<UseQueryOptions<StatusQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StatusQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<StatusQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Status'] : ['Status', variables],
    queryFn: fetcher<StatusQuery, StatusQueryVariables>(client, StatusDocument, variables, headers),
    ...options
  }
    )};
