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
    "query App {\n  app {\n    version\n  }\n}\n\nquery User {\n  me {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n  }\n}": types.AppDocument,
    "query AllRange {\n  getScheduleUser {\n    startsAt\n    endsAt\n    code\n  }\n}\n\nquery InRange($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}\n\nquery BusyDays {\n  getScheduleUser {\n    startsAt\n  }\n}": types.AllRangeDocument,
    "query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery AllEventsSince($since: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $since}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n    hosts\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery NextEventsDash($now: DateTime!, $deadline: DateTime!) {\n  getScheduleUser(\n    sinceUntil: {since: $now, until: $deadline}\n    skipTake: {take: 4}\n  ) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery UserGroups {\n  me {\n    groups\n  }\n}": types.AllNextEventsDocument,
    "fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n    }\n  }\n}\n\nquery EventDetails($id: ID!) {\n  getEvent(id: $id) {\n    ...DetailedEvent\n  }\n}": types.DetailedEventFragmentDoc,
    "mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}": types.LoginDocument,
    "query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}": types.GeneralizedSearchDocument,
    "mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  me {\n    groups\n  }\n}\n\nquery GetGroupsAutoComplete($search: String!) {\n  autocompleteGroups(query: $search)\n}": types.SetGroupsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query App {\n  app {\n    version\n  }\n}\n\nquery User {\n  me {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n  }\n}"): (typeof documents)["query App {\n  app {\n    version\n  }\n}\n\nquery User {\n  me {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllRange {\n  getScheduleUser {\n    startsAt\n    endsAt\n    code\n  }\n}\n\nquery InRange($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}\n\nquery BusyDays {\n  getScheduleUser {\n    startsAt\n  }\n}"): (typeof documents)["query AllRange {\n  getScheduleUser {\n    startsAt\n    endsAt\n    code\n  }\n}\n\nquery InRange($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}\n\nquery BusyDays {\n  getScheduleUser {\n    startsAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery AllEventsSince($since: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $since}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n    hosts\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery NextEventsDash($now: DateTime!, $deadline: DateTime!) {\n  getScheduleUser(\n    sinceUntil: {since: $now, until: $deadline}\n    skipTake: {take: 4}\n  ) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery UserGroups {\n  me {\n    groups\n  }\n}"): (typeof documents)["query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery AllEventsSince($since: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $since}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n    hosts\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery NextEventsDash($now: DateTime!, $deadline: DateTime!) {\n  getScheduleUser(\n    sinceUntil: {since: $now, until: $deadline}\n    skipTake: {take: 4}\n  ) {\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n  }\n}\n\nquery UserGroups {\n  me {\n    groups\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n    }\n  }\n}\n\nquery EventDetails($id: ID!) {\n  getEvent(id: $id) {\n    ...DetailedEvent\n  }\n}"): (typeof documents)["fragment DetailedEvent on ScheduleEvent {\n  id\n  code\n  subject\n  startsAt\n  endsAt\n  room\n  groups\n  hosts\n  type\n  source {\n    id\n    constantId\n    object\n    createdAt\n    task {\n      id\n      createdAt\n      finishedAt\n      initialHash\n      finalHash\n      status\n    }\n  }\n}\n\nquery EventDetails($id: ID!) {\n  getEvent(id: $id) {\n    ...DetailedEvent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}"): (typeof documents)["mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}"): (typeof documents)["query GeneralizedSearch($input: String!) {\n  findByDescription(query: $input) {\n    id\n    startsAt\n    endsAt\n    code\n    subject\n    type\n    room\n    hosts\n    groups\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  me {\n    groups\n  }\n}\n\nquery GetGroupsAutoComplete($search: String!) {\n  autocompleteGroups(query: $search)\n}"): (typeof documents)["mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  me {\n    groups\n  }\n}\n\nquery GetGroupsAutoComplete($search: String!) {\n  autocompleteGroups(query: $search)\n}"];

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