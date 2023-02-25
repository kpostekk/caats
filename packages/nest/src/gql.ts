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

export type GqlCurrentTask = {
  __typename?: 'CurrentTask';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  status: GqlTaskState;
  targetDate: Scalars['Date'];
};

export type GqlEventSource = {
  __typename?: 'EventSource';
  constantId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  object: Scalars['JSON'];
  task: GqlStoredTask;
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
  /** Exchanges code from Google OAuth2 for a JWT and user. */
  authGoogle: GqlLoginResponse;
  /** Creates a token for scraper. */
  createScraper: Scalars['String'];
  /** Creates a subscription for a specified list of groups. Returns link with ICS subscription. */
  createSubscription: GqlSubscriptionLinks;
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


export type GqlMutationAuthGoogleArgs = {
  code: Scalars['String'];
};


export type GqlMutationCreateScraperArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type GqlMutationCreateSubscriptionArgs = {
  options: GqlSubscriptionOptions;
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
  /** Returns details about app. */
  app?: Maybe<GqlApp>;
  /** Details for specified event. */
  event?: Maybe<GqlScheduleEvent>;
  /** List of all available events. Not specifying target results in empty list. */
  events: Array<GqlScheduleEvent>;
  findByDescription: Array<GqlScheduleEvent>;
  /** Returns groups matching the filter. Function for custom frontend. */
  groups: Array<Scalars['String']>;
  ongoingScrapers: Array<GqlWorkingScraper>;
  scrapers: Array<GqlScraper>;
  sources: Array<GqlEventSource>;
  tasks: Array<GqlStoredTask>;
  user: GqlUser;
};


export type GqlQueryEventArgs = {
  id: Scalars['Int'];
};


export type GqlQueryEventsArgs = {
  search?: InputMaybe<GqlScheduleInput>;
  targets?: InputMaybe<GqlScheduleTargets>;
};


export type GqlQueryFindByDescriptionArgs = {
  query: Scalars['String'];
};


export type GqlQueryGroupsArgs = {
  filter?: InputMaybe<Array<Array<Scalars['String']>>>;
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
  id: Scalars['ID'];
  /** The following event. */
  next?: Maybe<GqlScheduleEvent>;
  /** The previous event. */
  previous?: Maybe<GqlScheduleEvent>;
  /** The room where the event is taking place. */
  room?: Maybe<Scalars['String']>;
  /** The source of the event. */
  source: GqlEventSource;
  startsAt: Scalars['DateTime'];
  /** The full name of the subject. */
  subject: Scalars['String'];
  /** The type of the event. */
  type: Scalars['String'];
};

export type GqlScheduleInput = {
  since?: InputMaybe<Scalars['DateTime']>;
  skip?: InputMaybe<Scalars['PositiveInt']>;
  take?: InputMaybe<Scalars['PositiveInt']>;
  until?: InputMaybe<Scalars['DateTime']>;
};

export type GqlScheduleTargets = {
  groups?: InputMaybe<Array<Scalars['String']>>;
  hosts?: InputMaybe<Array<Scalars['String']>>;
};

export type GqlScraper = {
  __typename?: 'Scraper';
  alias: Scalars['String'];
  id: Scalars['ID'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  state: Scalars['String'];
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

export type GqlStoredTask = {
  __typename?: 'StoredTask';
  createdAt: Scalars['DateTime'];
  finalHash?: Maybe<Scalars['String']>;
  finishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  initialHash?: Maybe<Scalars['String']>;
  scraper?: Maybe<GqlScraper>;
  status: Scalars['String'];
};

export type GqlSubscription = {
  __typename?: 'Subscription';
  receiveTask?: Maybe<GqlTask>;
};

export type GqlSubscriptionLinks = {
  __typename?: 'SubscriptionLinks';
  full: Scalars['String'];
  short?: Maybe<Scalars['String']>;
};

export type GqlSubscriptionOptions = {
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hosts?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  user?: InputMaybe<Scalars['Boolean']>;
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
  /** The current event for current user. */
  currentEvent?: Maybe<GqlScheduleEvent>;
  /** Email address of the user provided by Google. */
  email: Scalars['EmailAddress'];
  /** List of events for current user. */
  events: Array<GqlScheduleEvent>;
  groups: Array<Scalars['String']>;
  /** Internal ID of the user. */
  id: Scalars['ID'];
  /** Whether the user is a superuser. Superusers can manage instances and scrapers. */
  isSuperuser: Scalars['Boolean'];
  /** Full name of the user provided by Google. Can be changed by the user. */
  name: Scalars['String'];
  /** The next event for current user. */
  nextEvent?: Maybe<GqlScheduleEvent>;
  /** Picture of the user provided by Google. Can be changed by the user. */
  picture?: Maybe<Scalars['URL']>;
};


/** A CaaTS user. */
export type GqlUserEventsArgs = {
  search?: InputMaybe<GqlScheduleInput>;
};

export type GqlWorkingScraper = {
  __typename?: 'WorkingScraper';
  alias: Scalars['String'];
  currentTask?: Maybe<GqlCurrentTask>;
  id: Scalars['ID'];
  lastSeen: Scalars['DateTime'];
  state: Scalars['String'];
};
