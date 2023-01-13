/* eslint-disable */
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
  Date: Date;
  DateTime: Date;
  EmailAddress: string;
  JSON: Record<string, unknown> | Array<unknown> | string | number | boolean | null;
  JWT: string;
  PositiveInt: number;
  URL: string;
  UUID: string;
};

export type GqlApp = {
  __typename?: 'App';
  node?: Maybe<Scalars['String']>;
  platform?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type GqlGroupInput = {
  groups: Array<Scalars['String']>;
};

export type GqlHostInput = {
  host: Scalars['String'];
};

export type GqlLoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['JWT'];
  sessionId: Scalars['UUID'];
  user: GqlUser;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  addGroup: Array<Scalars['String']>;
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: GqlLoginResponse;
  createSubscription: Scalars['String'];
  createTasksBulk: Scalars['Boolean'];
  finishTask: Scalars['Boolean'];
  /** Invalidates the JWT. Requires authentication. */
  logout: Scalars['Boolean'];
  setGroups: Scalars['Boolean'];
  updateTaskState: Scalars['Boolean'];
};


export type GqlMutationAddGroupArgs = {
  group: Scalars['String'];
};


export type GqlMutationAuthGoogleArgs = {
  code: Scalars['String'];
};


export type GqlMutationCreateSubscriptionArgs = {
  groups: Array<InputMaybe<Scalars['String']>>;
};


export type GqlMutationCreateTasksBulkArgs = {
  input: GqlTasksBulkInput;
};


export type GqlMutationFinishTaskArgs = {
  id: Scalars['ID'];
  result: GqlTaskResult;
};


export type GqlMutationSetGroupsArgs = {
  groups: Array<Scalars['String']>;
};


export type GqlMutationUpdateTaskStateArgs = {
  id: Scalars['ID'];
  state: GqlTaskState;
};

export type GqlQuery = {
  __typename?: 'Query';
  app?: Maybe<GqlApp>;
  autocompleteGroups?: Maybe<Array<Scalars['String']>>;
  getGroups?: Maybe<Array<Scalars['String']>>;
  /** Returns all schedule events for the given groups. */
  getScheduleGroups: Array<GqlScheduleEvent>;
  /** Returns all schedule events for the given host. */
  getScheduleHosts: Array<GqlScheduleEvent>;
  /** Returns all schedule events for the given user based on theirs preferences. Requires authentication. */
  getScheduleUser: Array<GqlScheduleEvent>;
  getTaskCollection: Array<Scalars['JSON']>;
  getTasks: Array<GqlTask>;
  me: GqlUser;
};


export type GqlQueryAutocompleteGroupsArgs = {
  query: Scalars['String'];
};


export type GqlQueryGetScheduleGroupsArgs = {
  groups: GqlGroupInput;
  sinceUntil?: InputMaybe<GqlSinceUntil>;
  skipTake?: InputMaybe<GqlSkipTake>;
};


export type GqlQueryGetScheduleHostsArgs = {
  host: GqlHostInput;
  sinceUntil?: InputMaybe<GqlSinceUntil>;
  skipTake?: InputMaybe<GqlSkipTake>;
};


export type GqlQueryGetScheduleUserArgs = {
  sinceUntil?: InputMaybe<GqlSinceUntil>;
  skipTake?: InputMaybe<GqlSkipTake>;
};


export type GqlQueryGetTaskCollectionArgs = {
  collection: GqlTaskCollection;
};

/** Represents a schedule event. */
export type GqlScheduleEvent = {
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
export type GqlSinceUntil = {
  since?: InputMaybe<Scalars['DateTime']>;
  until?: InputMaybe<Scalars['DateTime']>;
};

/** Represents a skip and take. Useful for pagination. */
export type GqlSkipTake = {
  /** The number of items to skip. */
  skip?: InputMaybe<Scalars['PositiveInt']>;
  /** The number of items to take. */
  take?: InputMaybe<Scalars['PositiveInt']>;
};

export type GqlTask = {
  __typename?: 'Task';
  date: Scalars['String'];
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type GqlTaskCollection =
  | 'HISTORICAL'
  | 'QUEUE';

export type GqlTaskResult = {
  hash: Scalars['String'];
  result: Array<Scalars['String']>;
};

export type GqlTaskState =
  /** The task has been cancelled by the user or system. */
  | 'CANCELLED'
  /** The task could not be finalized. */
  | 'FAILED'
  /** Data from this task were already processed by a newer task. */
  | 'OUTDATED'
  /** The task is waiting to be executed. */
  | 'PENDING'
  /** The task is currently being executed by at least one scraper. */
  | 'RUNNING'
  /** The task has been processed successfully but data source hasn't changed. */
  | 'SKIPPED'
  /** The task has been processed successfully and represents the latest version of the data. */
  | 'SUCCESS';

export type GqlTasksBulkInput = {
  count: Scalars['PositiveInt'];
  offset?: InputMaybe<Scalars['Int']>;
};

/** A CaaTS user. */
export type GqlUser = {
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
