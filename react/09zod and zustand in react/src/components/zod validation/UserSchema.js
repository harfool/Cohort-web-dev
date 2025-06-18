import { z } from 'zod'

const UserSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "userName must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

export default UserSchema
