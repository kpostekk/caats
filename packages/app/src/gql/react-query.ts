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

export type CurrentTask = {
  __typename?: 'CurrentTask';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  status: TaskState;
  targetDate: Scalars['Date'];
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
  /** @deprecated Field no longer supported */
  addGroup: Array<Scalars['String']>;
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: LoginResponse;
  createScraper: Scalars['String'];
  createSubscription: Scalars['String'];
  createTasksBulk: Scalars['Boolean'];
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  /** @deprecated Field no longer supported */
  setGroups: Scalars['Boolean'];
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
  /** @deprecated Field no longer supported */
  autocompleteGroups?: Maybe<Array<Scalars['String']>>;
  event?: Maybe<ScheduleEvent>;
  events: Array<ScheduleEvent>;
  /** @deprecated Field no longer supported */
  findByDescription: Array<ScheduleEvent>;
  /** @deprecated Field no longer supported */
  getGroups?: Maybe<Array<Scalars['String']>>;
  getTaskCollection: Array<Scalars['JSON']>;
  /** @deprecated Use subscription receiveTask instead. */
  getTasks: Array<Task>;
  groups: Array<Scalars['String']>;
  me: User;
  ongoingScrapers: Array<WorkingScraper>;
  scrapers: Array<Scraper>;
  sources: Array<EventSource>;
  tasks: Array<StoredTask>;
  user: User;
};


export type QueryAutocompleteGroupsArgs = {
  query: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryEventsArgs = {
  search?: InputMaybe<ScheduleInput>;
  targets?: InputMaybe<ScheduleTargets>;
};


export type QueryFindByDescriptionArgs = {
  query: Scalars['String'];
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

export type ScheduleInput = {
  since?: InputMaybe<Scalars['DateTime']>;
  skip?: InputMaybe<Scalars['PositiveInt']>;
  take?: InputMaybe<Scalars['PositiveInt']>;
  until?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduleTargets = {
  groups?: InputMaybe<Array<Scalars['String']>>;
  hosts?: InputMaybe<Array<Scalars['String']>>;
};

export type Scraper = {
  __typename?: 'Scraper';
  alias: Scalars['String'];
  id: Scalars['ID'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  state: Scalars['String'];
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
  scraper?: Maybe<Scraper>;
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
  currentEvent?: Maybe<ScheduleEvent>;
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress'];
  events: Array<ScheduleEvent>;
  groups: Array<Scalars['String']>;
  /** Internal ID of the user. */
  id: Scalars['ID'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String'];
  nextEvent?: Maybe<ScheduleEvent>;
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']>;
  scrapers: Array<Scraper>;
};


/** A CaaTS user. */
export type UserEventsArgs = {
  search?: InputMaybe<ScheduleInput>;
};

export type WorkingScraper = {
  __typename?: 'WorkingScraper';
  alias: Scalars['String'];
  currentTask?: Maybe<CurrentTask>;
  id: Scalars['ID'];
  lastSeen: Scalars['DateTime'];
  state: Scalars['String'];
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

export type SimpleEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, email: any, isSuperuser: boolean, picture?: any | null, groups: Array<string>, nextEvent?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null } | null, currentEvent?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null } | null } };

export type UserEventsQueryVariables = Exact<{
  since: Scalars['DateTime'];
  until: Scalars['DateTime'];
}>;


export type UserEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null }> } };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null }> } };

export type EventsInRangeQueryVariables = Exact<{
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
}>;


export type EventsInRangeQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null }> } };

export type UserEventsAfterQueryVariables = Exact<{
  since: Scalars['DateTime'];
}>;


export type UserEventsAfterQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null }> } };

export type UserBusyDaysQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBusyDaysQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, type: string, startsAt: any }> } };

export type DetailedEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: any, createdAt: any, task: { __typename?: 'StoredTask', id: string, createdAt: any, finishedAt?: any | null, initialHash?: string | null, finalHash?: string | null, status: string, scraper?: { __typename?: 'Scraper', id: string, alias: string, lastSeen?: any | null } | null } } };

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventDetailsQuery = { __typename?: 'Query', event?: { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: any, createdAt: any, task: { __typename?: 'StoredTask', id: string, createdAt: any, finishedAt?: any | null, initialHash?: string | null, finalHash?: string | null, status: string, scraper?: { __typename?: 'Scraper', id: string, alias: string, lastSeen?: any | null } | null } } } | null };

export type LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authGoogle: { __typename?: 'LoginResponse', accessToken: any, user: { __typename?: 'User', name: string, isSuperuser: boolean, picture?: any | null } } };

export type GeneralizedSearchQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type GeneralizedSearchQuery = { __typename?: 'Query', findByDescription: Array<{ __typename?: 'ScheduleEvent', id: string, startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null, hosts: Array<string>, groups: Array<string> }> };

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

export type CreateScraperMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type CreateScraperMutation = { __typename?: 'Mutation', createScraper: string };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', ongoingScrapers: Array<{ __typename?: 'WorkingScraper', alias: string, lastSeen: any, state: string, currentTask?: { __typename?: 'CurrentTask', id: string, createdAt: any, targetDate: any, status: TaskState } | null }> };

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
  user {
    name
    email
    isSuperuser
    picture
    groups
    nextEvent {
      ...SimpleEvent
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
      options?: UseQueryOptions<UserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserQuery, TError, TData>(
      variables === undefined ? ['User'] : ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<UserEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserEventsQuery, TError, TData>(
      ['UserEvents', variables],
      fetcher<UserEventsQuery, UserEventsQueryVariables>(client, UserEventsDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<AllEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AllEventsQuery, TError, TData>(
      variables === undefined ? ['AllEvents'] : ['AllEvents', variables],
      fetcher<AllEventsQuery, AllEventsQueryVariables>(client, AllEventsDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<EventsInRangeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EventsInRangeQuery, TError, TData>(
      ['EventsInRange', variables],
      fetcher<EventsInRangeQuery, EventsInRangeQueryVariables>(client, EventsInRangeDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<UserEventsAfterQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserEventsAfterQuery, TError, TData>(
      ['UserEventsAfter', variables],
      fetcher<UserEventsAfterQuery, UserEventsAfterQueryVariables>(client, UserEventsAfterDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<UserBusyDaysQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserBusyDaysQuery, TError, TData>(
      variables === undefined ? ['UserBusyDays'] : ['UserBusyDays', variables],
      fetcher<UserBusyDaysQuery, UserBusyDaysQueryVariables>(client, UserBusyDaysDocument, variables, headers),
      options
    );
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
      options?: UseQueryOptions<EventDetailsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EventDetailsQuery, TError, TData>(
      ['EventDetails', variables],
      fetcher<EventDetailsQuery, EventDetailsQueryVariables>(client, EventDetailsDocument, variables, headers),
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
      options?: UseQueryOptions<GeneralizedSearchQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GeneralizedSearchQuery, TError, TData>(
      ['GeneralizedSearch', variables],
      fetcher<GeneralizedSearchQuery, GeneralizedSearchQueryVariables>(client, GeneralizedSearchDocument, variables, headers),
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
    ) =>
    useMutation<CreateScraperMutation, TError, CreateScraperMutationVariables, TContext>(
      ['CreateScraper'],
      (variables?: CreateScraperMutationVariables) => fetcher<CreateScraperMutation, CreateScraperMutationVariables>(client, CreateScraperDocument, variables, headers)(),
      options
    );
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
      options?: UseQueryOptions<StatusQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StatusQuery, TError, TData>(
      variables === undefined ? ['Status'] : ['Status', variables],
      fetcher<StatusQuery, StatusQueryVariables>(client, StatusDocument, variables, headers),
      options
    );