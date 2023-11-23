import { UseMutationResult } from '@tanstack/react-query'
import { FaSpinner } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'

type MutationResponseProps = {
  mutation: UseMutationResult<any, any, any, any>
  messages?: Partial<{
    success: string
    loading: string
    error: string
  }>
}

export function MutationResponse(props: MutationResponseProps) {
  if (props.mutation.isSuccess) {
    return (
      <div className="alert alert-success">
        <div>
          <HiCheckCircle />
          {props.messages?.success ?? 'Zapisano!'}
        </div>
      </div>
    )
  }

  if (props.mutation.isPending) {
    return (
      <div className="alert alert-info">
        <div>
          <FaSpinner />
          {props.messages?.loading ?? 'Zapisywanie...'}
        </div>
      </div>
    )
  }

  return null
}
