import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
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
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: LoginResponse;
  /** Creates a token for scraper. */
  createScraper: Scalars['String'];
  /** Creates a subscription for a specified list of groups. Returns link with ICS subscription. */
  createSubscription: SubscriptionLinks;
  /** Creates many events relatively to current date. */
  createTasksBulk: Scalars['Boolean'];
  /** Allows to store scrapped content. Internal. */
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  setGroups: Scalars['Boolean'];
  /** Updates task state. Internal. */
  updateTaskState: Scalars['Boolean'];
};


export type MutationAuthGoogleArgs = {
  code: Scalars['String'];
};


export type MutationCreateScraperArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSubscriptionArgs = {
  options: SubscriptionOptions;
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
  /** Returns details about app. */
  app?: Maybe<App>;
  /** Details for specified event. */
  event?: Maybe<ScheduleEvent>;
  /** List of all available events. Not specifying target results in empty list. */
  events: Array<ScheduleEvent>;
  findByDescription: Array<ScheduleEvent>;
  /** Returns groups matching the filter. Function for custom frontend. */
  groups: Array<Scalars['String']>;
  ongoingScrapers: Array<WorkingScraper>;
  scrapers: Array<Scraper>;
  sources: Array<EventSource>;
  tasks: Array<StoredTask>;
  user: User;
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


export type QueryGroupsArgs = {
  filter?: InputMaybe<Array<Array<Scalars['String']>>>;
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
  /** The following event. */
  next?: Maybe<ScheduleEvent>;
  /** The previous event. */
  previous?: Maybe<ScheduleEvent>;
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

export type SubscriptionLinks = {
  __typename?: 'SubscriptionLinks';
  full: Scalars['String'];
  short?: Maybe<Scalars['String']>;
};

export type SubscriptionOptions = {
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hosts?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  user?: InputMaybe<Scalars['Boolean']>;
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
  /** The current event for current user. */
  currentEvent?: Maybe<ScheduleEvent>;
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress'];
  /** List of events for current user. */
  events: Array<ScheduleEvent>;
  groups: Array<Scalars['String']>;
  /** Internal ID of the user. */
  id: Scalars['ID'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String'];
  /** The next event for current user. */
  nextEvent?: Maybe<ScheduleEvent>;
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']>;
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

export type GetAppVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppVersionQuery = { __typename?: 'Query', app?: { __typename?: 'App', version: string } | null };

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


export const GetAppVersionDocument = gql`
    query getAppVersion {
  app {
    version
  }
}
    `;
export const UpdateTaskStateDocument = gql`
    mutation updateTaskState($id: ID!) {
  updateTaskState(id: $id, state: RUNNING)
}
    `;
export const SkipTaskDocument = gql`
    mutation skipTask($id: ID!) {
  updateTaskState(id: $id, state: SKIPPED)
}
    `;
export const FailTaskDocument = gql`
    mutation failTask($id: ID!) {
  updateTaskState(id: $id, state: FAILED)
}
    `;
export const FinishTaskDocument = gql`
    mutation finishTask($id: ID!, $results: TaskResult!) {
  finishTask(id: $id, result: $results)
}
    `;
export const AwaitTaskDocument = gql`
    subscription awaitTask {
  receiveTask {
    id
    date
    hash
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAppVersion(variables?: GetAppVersionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAppVersionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAppVersionQuery>(GetAppVersionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAppVersion', 'query');
    },
    updateTaskState(variables: UpdateTaskStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateTaskStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskStateMutation>(UpdateTaskStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTaskState', 'mutation');
    },
    skipTask(variables: SkipTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SkipTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SkipTaskMutation>(SkipTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'skipTask', 'mutation');
    },
    failTask(variables: FailTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FailTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FailTaskMutation>(FailTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'failTask', 'mutation');
    },
    finishTask(variables: FinishTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FinishTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FinishTaskMutation>(FinishTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'finishTask', 'mutation');
    },
    awaitTask(variables?: AwaitTaskSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AwaitTaskSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<AwaitTaskSubscription>(AwaitTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'awaitTask', 'subscription');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;