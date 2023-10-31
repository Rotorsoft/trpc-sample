import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = z.object({
  name: z.string(),
})

export type CreateUser = z.infer<typeof CreateUserSchema>
