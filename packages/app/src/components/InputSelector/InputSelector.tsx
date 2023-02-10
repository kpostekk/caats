import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { HiExclamation, HiPlus, HiTrash } from 'react-icons/hi'
import { useSet } from 'react-use'

export type InputSelectorProps = {
  onChange?: (value: string[]) => void
}

export function InputSelector(props: InputSelectorProps) {
  const [inputs, { add, remove }] = useSet<string>()

  useEffect(() => {
    props.onChange?.(Array.from(inputs.values()))
  }, [inputs])

  const savedInputs = useMemo(() => {
    return Array.from(inputs.values()).sort()
  }, [inputs])

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-4">
      {inputs.size ? (
        <div className="flex flex-wrap gap-2">
          {savedInputs.map((input, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-lg border-2 border-black px-4 py-2 text-xl"
            >
              {!input.match(/^[0-9]+[cwl]$/) && (
                <HiExclamation className="text-warning" />
              )}
              {input}
              <AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8, rotate: '20deg' }}
                  animate={{ opacity: 1, rotate: '0deg' }}
                  transition={{
                    type: 'spring',
                    duration: 0.2,
                    stiffness: 600,
                    damping: 20,
                  }}
                  className="cursor-pointer"
                  key={input + index}
                  onClick={() => remove(input)}
                >
                  <HiTrash />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex grow gap-2">
        <input
          ref={ref}
          placeholder="17c"
          className="input input-bordered w-40 border-2 border-black"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              add(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
        />
        <button
          onClick={() => {
            if (ref.current) {
              add(ref.current.value)
              ref.current.value = ''
            }
          }}
          className="btn flex items-center gap-2"
        >
          <HiPlus /> Dodaj
        </button>
      </div>
    </div>
  )
}
