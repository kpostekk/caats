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
    "query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    code\n    type\n  }\n}\n\nquery NextEventsDash($now: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $now}, skipTake: {take: 4}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}": types.AllNextEventsDocument,
    "mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}": types.LoginDocument,
    "mutation SetGroups($groups: [String!]!) {\n  setGroups(groups: $groups)\n}\n\nquery GetCurrentGroups {\n  me {\n    groups\n  }\n}\n\nquery GetGroupsAutoComplete($search: String!) {\n  autocompleteGroups(query: $search)\n}": types.SetGroupsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query App {\n  app {\n    version\n  }\n}\n\nquery User {\n  me {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n  }\n}"): (typeof documents)["query App {\n  app {\n    version\n  }\n}\n\nquery User {\n  me {\n    name\n    email\n    isSuperuser\n    picture\n    groups\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    code\n    type\n  }\n}\n\nquery NextEventsDash($now: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $now}, skipTake: {take: 4}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}"): (typeof documents)["query AllNextEvents {\n  getScheduleUser {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}\n\nquery NextEventsCal($start: DateTime!, $end: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $start, until: $end}) {\n    startsAt\n    code\n    type\n  }\n}\n\nquery NextEventsDash($now: DateTime!) {\n  getScheduleUser(sinceUntil: {since: $now}, skipTake: {take: 4}) {\n    startsAt\n    endsAt\n    subject\n    code\n    type\n    room\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}"): (typeof documents)["mutation Login($code: String!) {\n  authGoogle(code: $code) {\n    accessToken\n    user {\n      name\n      isSuperuser\n      picture\n    }\n  }\n}"];
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