import React from 'react'
import CounterStore from './store.js'

const Counter = () => {
    const {count , increment , decrement ,reset} = CounterStore()
  return (
    <>
      count : {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </>
  )
}

export default Counter
