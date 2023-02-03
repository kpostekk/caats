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


export type InRangeQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', id: string, startsAt: any, endsAt: any, code: string, subject: string, type: string, room?: string | null, hosts: Array<string>, groups: Array<string> }> };

export type BusyDaysQueryVariables = Exact<{ [key: string]: never; }>;


export type BusyDaysQuery = { __typename?: 'Query', getScheduleUser: Array<{ __typename?: 'ScheduleEvent', startsAt: any }> };

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

export type DetailedEventFragment = { __typename?: 'ScheduleEvent', id: string, code: string, subject: string, startsAt: any, endsAt: any, room?: string | null, groups: Array<string>, hosts: Array<string>, type: string, source: { __typename?: 'EventSource', id: string, constantId: string, object: any, createdAt: any, task: { __typename?: 'StoredTask', id: string, createdAt: any, finishedAt?: any | null, initialHash?: string | null, finalHash?: string | null, status: string } } } & { ' $fragmentName'?: 'DetailedEventFragment' };

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EventDetailsQuery = { __typename?: 'Query', getEvent?: (
    { __typename?: 'ScheduleEvent' }
    & { ' $fragmentRefs'?: { 'DetailedEventFragment': DetailedEventFragment } }
  ) | null };

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

export const DetailedEventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailedEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"constantId"}},{"kind":"Field","name":{"kind":"Name","value":"object"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"initialHash"}},{"kind":"Field","name":{"kind":"Name","value":"finalHash"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DetailedEventFragment, unknown>;
export const AppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"App"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<AppQuery, AppQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperuser"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const AllRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<AllRangeQuery, AllRangeQueryVariables>;
export const InRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sinceUntil"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<InRangeQuery, InRangeQueryVariables>;
export const BusyDaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BusyDays"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}}]}}]}}]} as unknown as DocumentNode<BusyDaysQuery, BusyDaysQueryVariables>;
export const AllNextEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllNextEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}}]}}]}}]} as unknown as DocumentNode<AllNextEventsQuery, AllNextEventsQueryVariables>;
export const AllEventsSinceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllEventsSince"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"since"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sinceUntil"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"since"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}}]}}]}}]} as unknown as DocumentNode<AllEventsSinceQuery, AllEventsSinceQueryVariables>;
export const NextEventsCalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextEventsCal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sinceUntil"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}}]}}]}}]} as unknown as DocumentNode<NextEventsCalQuery, NextEventsCalQueryVariables>;
export const NextEventsDashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextEventsDash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"now"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScheduleUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sinceUntil"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"since"},"value":{"kind":"Variable","name":{"kind":"Name","value":"now"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"until"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"skipTake"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"4"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}}]}}]}}]} as unknown as DocumentNode<NextEventsDashQuery, NextEventsDashQueryVariables>;
export const UserGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<UserGroupsQuery, UserGroupsQueryVariables>;
export const EventDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailedEvent"}}]}}]}},...DetailedEventFragmentDoc.definitions]} as unknown as DocumentNode<EventDetailsQuery, EventDetailsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperuser"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GeneralizedSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeneralizedSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findByDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"hosts"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<GeneralizedSearchQuery, GeneralizedSearchQueryVariables>;
export const SetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groups"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groups"}}}]}]}}]} as unknown as DocumentNode<SetGroupsMutation, SetGroupsMutationVariables>;
export const GetCurrentGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"}}]}}]}}]} as unknown as DocumentNode<GetCurrentGroupsQuery, GetCurrentGroupsQueryVariables>;
export const GetGroupsAutoCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupsAutoComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompleteGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}]}}]} as unknown as DocumentNode<GetGroupsAutoCompleteQuery, GetGroupsAutoCompleteQueryVariables>;