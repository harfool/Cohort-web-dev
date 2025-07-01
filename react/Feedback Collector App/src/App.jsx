import React from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import { useState } from 'react'
const App = () => {
 
  const [feedbacks , setFeedbacks] = useState([])

  const handleAddFeedback = (newFeedback) =>{
    setFeedbacks((prev)=> [...prev , newFeedback])
  }

  return (
    <div className='p-6 max-w-xl mx-auto'>
   <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Feedback Collector 📝</h1>
   <FeedbackForm onAddFeedback={handleAddFeedback} />
   <FeedbackList feedbacks={feedbacks} />
    </div>
  )
}

export default App
