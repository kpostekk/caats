import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type App = {
  __typename?: 'App'
  node?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  version: Scalars['String']
}

export type LoginResponse = {
  __typename?: 'LoginResponse'
  accessToken: Scalars['String']
  user: User
}

export type Mutation = {
  __typename?: 'Mutation'
  authGoogle: LoginResponse
  finishTask: Scalars['Boolean']
  logout: Scalars['Boolean']
  updateTaskState: Scalars['Boolean']
}

export type MutationAuthGoogleArgs = {
  code: Scalars['String']
}

export type MutationFinishTaskArgs = {
  id: Scalars['ID']
  result: TaskResult
}

export type MutationUpdateTaskStateArgs = {
  id: Scalars['ID']
  state: TaskState
}

export type Query = {
  __typename?: 'Query'
  app?: Maybe<App>
  getTasks: Array<Task>
}

export type Task = {
  __typename?: 'Task'
  date: Scalars['String']
  hash?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type TaskResult = {
  hash: Scalars['String']
  result: Array<Scalars['String']>
}

export enum TaskState {
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Pending = 'PENDING',
  Running = 'RUNNING',
  Skipped = 'SKIPPED',
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['ID']
  isSuperuser: Scalars['Boolean']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
}

export type GetTasksQueryVariables = Exact<{ [key: string]: never }>

export type GetTasksQuery = {
  __typename?: 'Query'
  getTasks: Array<{
    __typename?: 'Task'
    id: string
    date: string
    hash?: string | null
  }>
}

export type UpdateTaskStateMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type UpdateTaskStateMutation = {
  __typename?: 'Mutation'
  updateTaskState: boolean
}

export type SkipTaskMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type SkipTaskMutation = {
  __typename?: 'Mutation'
  updateTaskState: boolean
}

export type FailTaskMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type FailTaskMutation = {
  __typename?: 'Mutation'
  updateTaskState: boolean
}

export type FinishTaskMutationVariables = Exact<{
  id: Scalars['ID']
  results: TaskResult
}>

export type FinishTaskMutation = {
  __typename?: 'Mutation'
  finishTask: boolean
}

export const GetTasksDocument = gql`
  query getTasks {
    getTasks {
      id
      date
      hash
    }
  }
`
export const UpdateTaskStateDocument = gql`
  mutation updateTaskState($id: ID!) {
    updateTaskState(id: $id, state: RUNNING)
  }
`
export const SkipTaskDocument = gql`
  mutation skipTask($id: ID!) {
    updateTaskState(id: $id, state: SKIPPED)
  }
`
export const FailTaskDocument = gql`
  mutation failTask($id: ID!) {
    updateTaskState(id: $id, state: FAILED)
  }
`
export const FinishTaskDocument = gql`
  mutation finishTask($id: ID!, $results: TaskResult!) {
    finishTask(id: $id, result: $results)
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getTasks(
      variables?: GetTasksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetTasksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTasksQuery>(GetTasksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getTasks',
        'query'
      )
    },
    updateTaskState(
      variables: UpdateTaskStateMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateTaskStateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTaskStateMutation>(
            UpdateTaskStateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateTaskState',
        'mutation'
      )
    },
    skipTask(
      variables: SkipTaskMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<SkipTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SkipTaskMutation>(SkipTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'skipTask',
        'mutation'
      )
    },
    failTask(
      variables: FailTaskMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<FailTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FailTaskMutation>(FailTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'failTask',
        'mutation'
      )
    },
    finishTask(
      variables: FinishTaskMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<FinishTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FinishTaskMutation>(FinishTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'finishTask',
        'mutation'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
