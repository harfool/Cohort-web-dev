import React from 'react'
import FeedbackItem from './FeedbackItem'

const FeedbackList = ({feedbacks}) => {
  return (
    <div>
      {feedbacks.length === 0 ? (<p className="text-gray-600 text-center">No feedback submitted yet.</p>) : (
        <ul className='space-y-2'>
         {feedbacks.map((fb , index)=>(
            <li>
                <FeedbackItem key={index} feedback={fb} />
            </li>
         ))}
        </ul>
      )}
    </div>
  )
}

export default FeedbackList
