import React, { useState, useEffect, useRef } from 'react'

type CounterProps = {
  initialCount: number
}

const dispatch = (eventName: string, count?: number) => {
  if (!count) {
    const event = new CustomEvent(eventName)
    window.dispatchEvent(event)
    return
  }
  const event = new CustomEvent(eventName, { detail: { count } })
  window.dispatchEvent(event)
}

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  useEffect(() => {
    dispatch('onCounterMount')
    return () => {
      dispatch('onCounterUnmount')
    }
  }, [])

  useEffect(() => {
    dispatch('onCounterUpdate', count)
  }, [count])

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={handleIncrement}>Incrementar +</button>
    </div>
  )
}
