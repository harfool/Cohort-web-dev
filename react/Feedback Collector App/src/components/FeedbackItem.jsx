import React from 'react'

const FeedbackItem = ({feedback}) => {
  return (
    <>
      <li className='border p-3 rounded shadow-sm bg-white'>
        <p className='font-semibold'>
            {feedback.name}
        </p>
        <p className='text-sm text-gray-700' >
            {feedback.message}
        </p>
      </li>
    </>
  )
}

export default FeedbackItem
