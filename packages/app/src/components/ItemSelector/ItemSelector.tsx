import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'
import { useSet } from 'react-use'

export type ItemSelectorProps<TValue> = {
  items: TValue[]
  labels: string[] | ((item: TValue) => string)
  singleSelect?: boolean
  onChange?: (values: TValue[]) => void
}

export function ItemSelector<T>(props: ItemSelectorProps<T>) {
  const [selectedIndexes, { add, has, remove, reset }] = useSet<number>()

  useEffect(() => {
    props.onChange?.(
      Array.from(selectedIndexes.values()).map((index) => props.items[index])
    )
  }, [selectedIndexes])

  return (
    <div className="flex flex-wrap gap-1 p-2">
      {props.items.map((item, index) => (
        <div
          onClick={() => {
            if (props.singleSelect) {
              reset()
              add(index)
              return
            }
            has(index) ? remove(index) : add(index)
          }}
          key={index}
          className={classNames(
            'flex cursor-pointer select-none items-center gap-1 rounded-lg border-2 border-black py-1 px-4 font-semibold',
            has(index) && 'bg-black text-white'
          )}
        >
          <AnimatePresence>
            {has(index) && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: 'keyframes',
                  ease: 'easeInOut',
                  duration: 0.2,
                }}
              >
                <HiCheck />
              </motion.div>
            )}
          </AnimatePresence>
          {typeof props.labels === 'function'
            ? props.labels(item)
            : props.labels[index]}
        </div>
      ))}
    </div>
  )
}
