import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ScheduleEvent } from '../../gql/graphql'

export type TimelineEventProps = {
  startsAt: Date
  endsAt: Date
  relativeTo: Date
  scale: number
} & Pick<ScheduleEvent, 'type' | 'room' | 'id' | 'code'>

export function TimelineEvent(props: TimelineEventProps) {
  return (
    <div
      className={classNames(
        'absolute z-20 ml-10 w-3/4 overflow-y-auto overflow-x-hidden rounded-lg border-2 border-black bg-white group hover:shadow-xl duration-100'
      )}
      style={{
        top:
          (props.startsAt.getTime() - props.relativeTo.getTime()) *
          props.scale +
          8,
        height:
          (props.endsAt.getTime() - props.startsAt.getTime()) * props.scale,
      }}
      key={props.startsAt.getTime()}
    >
      <div
        className={classNames(
          'absolute z-0 h-full w-2 group-hover:w-4/5 duration-200 ease-in-out',
          !['Ćwiczenia', 'Wykład'].includes(props.type) &&
          'bg-slate-300 group-hover:bg-slate-900',
          props.type === 'Ćwiczenia' && 'bg-sky-300 group-hover:bg-sky-900',
          props.type === 'Wykład' && 'bg-rose-300 group-hover:bg-rose-900'
        )}
      />
      <div className="absolute z-10 grid h-full select-none place-content-center py-1 pl-4 group-hover:text-white">
        <h4 className="link-hover text-2xl font-semibold">
          <Link to={`/app/event/${props.id}`}>{props.code}</Link>
        </h4>

        <p className="text-sm">
          {props.startsAt.toLocaleTimeString(undefined, { timeStyle: 'short' })}
          {' - '}
          {props.endsAt.toLocaleTimeString(undefined, { timeStyle: 'short' })}
        </p>
        {props.room && <span className="text-xs">{props.room}</span>}
        <span className="text-xs">{props.type}</span>
      </div>
    </div>
  )
}
