/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query App {\n  app {\n    version\n  }\n}\n\nfragment SimpleEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  type\n  hosts\n  room\n}\n\nquery User {\n  user {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n    nextEvent {\n      ...SimpleEvent\n      previous {\n        ...SimpleEvent\n      }\n    }\n    currentEvent {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEvents($since: DateTime!, $until: DateTime!) {\n  user {\n    events(search: {since: $since, until: $until}) {\n      ...SimpleEvent\n    }\n  }\n}": types.AppDocument,
    "query AllEvents {\n  user {\n    events {\n      startsAt\n      endsAt\n      code\n      subject\n      type\n      room\n    }\n  }\n}\n\nquery EventsInRange($start: DateTime!, $end: DateTime!) {\n  user {\n    events(search: {since: $start, until: $end}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEventsAfter($since: DateTime!) {\n  user {\n    events(search: {since: $since}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserBusyDays {\n  user {\n    events {\n      id\n      code\n      type\n      startsAt\n    }\n  }\n}": types.AllEventsDocument,
    "fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n      scraper {\n        id\n        alias\n        lastSeen\n      }\n    }\n  }\n}\n\nquery EventDetails($id: Int!) {\n  event(id: $id) {\n    ...DetailedEvent\n  }\n}": types.DetailedEventFragmentDoc,
    "fragment SimpleProfile on User {\n  id\n  name\n  isSuperuser\n  picture\n  groups\n  email\n}\n\nmutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      ...SimpleProfile\n      isSuperuser\n      name\n      picture\n    }\n  }\n}\n\nquery UserProfile {\n  user {\n    ...SimpleProfile\n  }\n}": types.SimpleProfileFragmentDoc,
    "query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}": types.GeneralizedSearchDocument,
    "mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  user {\n    groups\n  }\n}\n\nmutation CreateScraper($name: String) {\n  createScraper(name: $name)\n}\n\nquery FindGroups($search: [[String!]!]!) {\n  groups(filter: $search)\n}\n\nmutation CreateSubscription {\n  createSubscription(options: {user: true}) {\n    short\n  }\n}": types.SetGroupsDocument,
    "query Status {\n  ongoingScrapers {\n    alias\n    lastSeen\n    state\n    currentTask {\n      id\n      createdAt\n      targetDate\n      status\n    }\n  }\n}": types.StatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query App {\n  app {\n    version\n  }\n}\n\nfragment SimpleEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  type\n  hosts\n  room\n}\n\nquery User {\n  user {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n    nextEvent {\n      ...SimpleEvent\n      previous {\n        ...SimpleEvent\n      }\n    }\n    currentEvent {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEvents($since: DateTime!, $until: DateTime!) {\n  user {\n    events(search: {since: $since, until: $until}) {\n      ...SimpleEvent\n    }\n  }\n}"): (typeof documents)["query App {\n  app {\n    version\n  }\n}\n\nfragment SimpleEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  type\n  hosts\n  room\n}\n\nquery User {\n  user {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n    nextEvent {\n      ...SimpleEvent\n      previous {\n        ...SimpleEvent\n      }\n    }\n    currentEvent {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEvents($since: DateTime!, $until: DateTime!) {\n  user {\n    events(search: {since: $since, until: $until}) {\n      ...SimpleEvent\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllEvents {\n  user {\n    events {\n      startsAt\n      endsAt\n      code\n      subject\n      type\n      room\n    }\n  }\n}\n\nquery EventsInRange($start: DateTime!, $end: DateTime!) {\n  user {\n    events(search: {since: $start, until: $end}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEventsAfter($since: DateTime!) {\n  user {\n    events(search: {since: $since}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserBusyDays {\n  user {\n    events {\n      id\n      code\n      type\n      startsAt\n    }\n  }\n}"): (typeof documents)["query AllEvents {\n  user {\n    events {\n      startsAt\n      endsAt\n      code\n      subject\n      type\n      room\n    }\n  }\n}\n\nquery EventsInRange($start: DateTime!, $end: DateTime!) {\n  user {\n    events(search: {since: $start, until: $end}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserEventsAfter($since: DateTime!) {\n  user {\n    events(search: {since: $since}) {\n      ...SimpleEvent\n    }\n  }\n}\n\nquery UserBusyDays {\n  user {\n    events {\n      id\n      code\n      type\n      startsAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n      scraper {\n        id\n        alias\n        lastSeen\n      }\n    }\n  }\n}\n\nquery EventDetails($id: Int!) {\n  event(id: $id) {\n    ...DetailedEvent\n  }\n}"): (typeof documents)["fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n      scraper {\n        id\n        alias\n        lastSeen\n      }\n    }\n  }\n}\n\nquery EventDetails($id: Int!) {\n  event(id: $id) {\n    ...DetailedEvent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SimpleProfile on User {\n  id\n  name\n  isSuperuser\n  picture\n  groups\n  email\n}\n\nmutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      ...SimpleProfile\n      isSuperuser\n      name\n      picture\n    }\n  }\n}\n\nquery UserProfile {\n  user {\n    ...SimpleProfile\n  }\n}"): (typeof documents)["fragment SimpleProfile on User {\n  id\n  name\n  isSuperuser\n  picture\n  groups\n  email\n}\n\nmutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      ...SimpleProfile\n      isSuperuser\n      name\n      picture\n    }\n  }\n}\n\nquery UserProfile {\n  user {\n    ...SimpleProfile\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}"): (typeof documents)["query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  user {\n    groups\n  }\n}\n\nmutation CreateScraper($name: String) {\n  createScraper(name: $name)\n}\n\nquery FindGroups($search: [[String!]!]!) {\n  groups(filter: $search)\n}\n\nmutation CreateSubscription {\n  createSubscription(options: {user: true}) {\n    short\n  }\n}"): (typeof documents)["mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  user {\n    groups\n  }\n}\n\nmutation CreateScraper($name: String) {\n  createScraper(name: $name)\n}\n\nquery FindGroups($search: [[String!]!]!) {\n  groups(filter: $search)\n}\n\nmutation CreateSubscription {\n  createSubscription(options: {user: true}) {\n    short\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Status {\n  ongoingScrapers {\n    alias\n    lastSeen\n    state\n    currentTask {\n      id\n      createdAt\n      targetDate\n      status\n    }\n  }\n}"): (typeof documents)["query Status {\n  ongoingScrapers {\n    alias\n    lastSeen\n    state\n    currentTask {\n      id\n      createdAt\n      targetDate\n      status\n    }\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;