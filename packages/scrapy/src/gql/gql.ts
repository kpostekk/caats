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
    "query getAppVersion {\n  app {\n    version\n  }\n}\n\nquery getTasks {\n  getTasks {\n    id\n    date\n    hash\n  }\n}\n\nmutation updateTaskState($id: ID!) {\n  updateTaskState(id: $id, state: RUNNING)\n}\n\nmutation skipTask($id: ID!) {\n  updateTaskState(id: $id, state: SKIPPED)\n}\n\nmutation failTask($id: ID!) {\n  updateTaskState(id: $id, state: FAILED)\n}\n\nmutation finishTask($id: ID!, $results: TaskResult!) {\n  finishTask(id: $id, result: $results)\n}": types.GetAppVersionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAppVersion {\n  app {\n    version\n  }\n}\n\nquery getTasks {\n  getTasks {\n    id\n    date\n    hash\n  }\n}\n\nmutation updateTaskState($id: ID!) {\n  updateTaskState(id: $id, state: RUNNING)\n}\n\nmutation skipTask($id: ID!) {\n  updateTaskState(id: $id, state: SKIPPED)\n}\n\nmutation failTask($id: ID!) {\n  updateTaskState(id: $id, state: FAILED)\n}\n\nmutation finishTask($id: ID!, $results: TaskResult!) {\n  finishTask(id: $id, result: $results)\n}"): (typeof documents)["query getAppVersion {\n  app {\n    version\n  }\n}\n\nquery getTasks {\n  getTasks {\n    id\n    date\n    hash\n  }\n}\n\nmutation updateTaskState($id: ID!) {\n  updateTaskState(id: $id, state: RUNNING)\n}\n\nmutation skipTask($id: ID!) {\n  updateTaskState(id: $id, state: SKIPPED)\n}\n\nmutation failTask($id: ID!) {\n  updateTaskState(id: $id, state: FAILED)\n}\n\nmutation finishTask($id: ID!, $results: TaskResult!) {\n  finishTask(id: $id, result: $results)\n}"];

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