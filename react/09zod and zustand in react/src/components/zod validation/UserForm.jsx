import React from 'react'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'


import UserSchema from './UserSchema.js'
import "./Userform.css"
const UserForm = () => {
    const {
        register ,
        handleSubmit,
        formState : {errors}
     } = useForm({resolver : zodResolver(UserSchema)})
     const onSubmit = (data) =>{
        console.log("form data" , data)
     }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
  <input 
    {...register("userName")}
    placeholder='UserName'
    type="text"
  />
  {errors.userName && <p>{errors.userName.message}</p>}

  <input
    {...register("email")}
    placeholder='Email'
    // type="email"
  />
  {errors.email && <p>{errors.email.message}</p>}

  <input
    {...register("password")}
    placeholder='Password'
    type="password"
  />
  {errors.password && <p>{errors.password.message}</p>}

  <button type='submit'>Submit</button>
</form>

    </>
  )
}

export default UserForm
