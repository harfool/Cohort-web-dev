import React, { useState } from 'react'

const FeedbackForm = ({onAddFeedback}) => {

    const [name , setName] = useState("")
    const [message , setMessage] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!name || !message) {
            return alert("all field are required")
        }

        onAddFeedback({
            id : Date.now(),
            name ,
            message
        })
        setName("")
        setMessage("")
    }
  return (
    <div>
      <form onSubmit={handleSubmit}
        className='bg-gray-100 p-4 rounded shadow mb-4' >
        <div className="mb-2">
          <label htmlFor="name" className='block text-sm font-medium'>Name</label>
          <input type="text"
          name='name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
            className='border p-2 w-full'
          />
        </div>

        <div className="mb-2">
            <label htmlFor="message"
            className='block text-sm font-medium'
            >Feedback</label>
            <textarea name="message" 
            value={message}
            className='border p-2 w-full'
            onChange={(e)=>setMessage(e.target.value)}
            ></textarea>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        type='submit'
        >
            Submit Feedback
        </button>

      </form>
    </div>
  )
}

export default FeedbackForm
