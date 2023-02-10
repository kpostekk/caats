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

export type SimpleEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, type: string, hosts: Array<string>, room?: string | null } & { ' $fragmentName'?: 'SimpleEventFragment' };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, email: any, isSuperuser: boolean, picture?: any | null, groups: Array<string>, nextEvent?: (
      { __typename?: 'ScheduleEvent', previous?: (
        { __typename?: 'ScheduleEvent' }
        & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
      ) | null }
      & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
    ) | null, currentEvent?: (
      { __typename?: 'ScheduleEvent' }
      & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
    ) | null } };

export type UserEventsQueryVariables = Exact<{
  since: Scalars['DateTime'];
  until: Scalars['DateTime'];
}>;


export type UserEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<(
      { __typename?: 'ScheduleEvent' }
      & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
    )> } };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null }> } };

export type EventsInRangeQueryVariables = Exact<{
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
}>;


export type EventsInRangeQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<(
      { __typename?: 'ScheduleEvent' }
      & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
    )> } };

export type UserEventsAfterQueryVariables = Exact<{
  since: Scalars['DateTime'];
}>;


export type UserEventsAfterQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<(
      { __typename?: 'ScheduleEvent' }
      & { ' $fragmentRefs'?: { 'SimpleEventFragment': SimpleEventFragment } }
    )> } };

export type UserBusyDaysQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBusyDaysQuery = { __typename?: 'Query', user: { __typename?: 'User', events: Array<{ __typename?: 'ScheduleEvent', id: string, code: string, type: string, startsAt: any }> } };

export type DetailedEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: any, createdAt: any, task: { __typename?: 'StoredTask', id: string, createdAt: any, finishedAt?: any | null, initialHash?: string | null, finalHash?: string | null, status: string, scraper?: { __typename?: 'Scraper', id: string, alias: string, lastSeen?: any | null } | null } } } & { ' $fragmentName'?: 'DetailedEventFragment' };

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventDetailsQuery = { __typename?: 'Query', event?: (
    { __typename?: 'ScheduleEvent' }
    & { ' $fragmentRefs'?: { 'DetailedEventFragment': DetailedEventFragment } }
  ) | null };

export type SimpleProfileFragment = { __typename?: 'User', id: string, name: string, isSuperuser: boolean, picture?: any | null, groups: Array<string>, email: any } & { ' $fragmentName'?: 'SimpleProfileFragment' };

export type LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authGoogle: { __typename?: 'LoginResponse', accessToken: any, user: (
      { __typename?: 'User', isSuperuser: boolean, name: string, picture?: any | null }
      & { ' $fragmentRefs'?: { 'SimpleProfileFragment': SimpleProfileFragment } }
    ) } };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'SimpleProfileFragment': SimpleProfileFragment } }
  ) };

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

export type FindGroupsQueryVariables = Exact<{
  search: Array<Array<Scalars['String']> | Scalars['String']> | Array<Scalars['String']> | Scalars['String'];
}>;


export type FindGroupsQuery = { __typename?: 'Query', groups: Array<string> };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', ongoingScrapers: Array<{ __typename?: 'WorkingScraper', alias: string, lastSeen: any, state: string, currentTask?: { __typename?: 'CurrentTask', id: string, createdAt: any, targetDate: any, status: TaskState } | null }> };

export const SimpleEventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimpleEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"room"}}]}}]} as unknown as DocumentNode<SimpleEventFragment, unknown>;
export const DetailedEventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailedEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"constantId"}},{"kind":"Field","name":{"kind":"Name","value":"object"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"initialHash"}},{"kind":"Field","name":{"kind":"Name","value":"finalHash"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scraper"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DetailedEventFragment, unknown>;
export const SimpleProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimpleProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperuser"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<SimpleProfileFragment, unknown>;
export const AppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"App"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<AppQuery, AppQueryVariables>;
export const UserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperuser"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"nextEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}}]}}]}}]}},...SimpleEventFragmentDoc.definitions]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserEventsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"since"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"until"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"since"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"until"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}}]}}]}}]}},...SimpleEventFragmentDoc.definitions]} as unknown as DocumentNode<UserEventsQuery, UserEventsQueryVariables>;
export const AllEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}}]}}]}}]}}]} as unknown as DocumentNode<AllEventsQuery, AllEventsQueryVariables>;
export const EventsInRangeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsInRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}}]}}]}}]}},...SimpleEventFragmentDoc.definitions]} as unknown as DocumentNode<EventsInRangeQuery, EventsInRangeQueryVariables>;
export const UserEventsAfterDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEventsAfter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"since"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"since"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleEvent"}}]}}]}}]}},...SimpleEventFragmentDoc.definitions]} as unknown as DocumentNode<UserEventsAfterQuery, UserEventsAfterQueryVariables>;
export const UserBusyDaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserBusyDays"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}}]}}]}}]}}]} as unknown as DocumentNode<UserBusyDaysQuery, UserBusyDaysQueryVariables>;
export const EventDetailsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailedEvent"}}]}}]}},...DetailedEventFragmentDoc.definitions]} as unknown as DocumentNode<EventDetailsQuery, EventDetailsQueryVariables>;
export const LoginDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleProfile"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperuser"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}},...SimpleProfileFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UserProfileDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimpleProfile"}}]}}]}},...SimpleProfileFragmentDoc.definitions]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const GeneralizedSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeneralizedSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findByDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<GeneralizedSearchQuery, GeneralizedSearchQueryVariables>;
export const SetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groups"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groups"}}}]}]}}]} as unknown as DocumentNode<SetGroupsMutation, SetGroupsMutationVariables>;
export const GetCurrentGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<GetCurrentGroupsQuery, GetCurrentGroupsQueryVariables>;
export const GetGroupsAutoCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupsAutoComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompleteGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}]}}]} as unknown as DocumentNode<GetGroupsAutoCompleteQuery, GetGroupsAutoCompleteQueryVariables>;
export const CreateScraperDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScraper"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScraper"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<CreateScraperMutation, CreateScraperMutationVariables>;
export const FindGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}]}}]} as unknown as DocumentNode<FindGroupsQuery, FindGroupsQueryVariables>;
export const StatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ongoingScrapers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeen"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currentTask"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"targetDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<StatusQuery, StatusQueryVariables>;