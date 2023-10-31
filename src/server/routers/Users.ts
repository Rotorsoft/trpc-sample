import { CreateUserSchema, UserSchema } from "../model/User.schemas"
import { trpc } from "../trpc"
import { z } from "zod"
import { User } from "../model/User.aggregate"

export const Users = trpc.router({
  // queries (in CQRS this is a read model)
  getAllUsers: trpc.procedure
    .meta({ openapi: { method: "GET", path: "/users", tags: ["users"] } })
    .input(z.void())
    .output(z.array(UserSchema))
    .query(User.getAll),
  getById: trpc.procedure
    .meta({ openapi: { method: "GET", path: "/users/{id}", tags: ["users"] } })
    .input(z.object({ id: z.string().uuid() }))
    .output(UserSchema.optional())
    .query(({ input }) => User.getById(input.id)),

  // commands
  createUser: trpc.procedure
    .meta({ openapi: { method: "POST", path: "/users", tags: ["users"] } })
    .input(CreateUserSchema)
    .output(UserSchema)
    .mutation(({ input }) => User.create(input)),
  deleteUser: trpc.procedure
    .meta({
      openapi: { method: "DELETE", path: "/users/{id}", tags: ["users"] },
    })
    .input(z.object({ id: z.string().uuid() }))
    .output(z.void())
    .mutation(async ({ input }) => User.delete(input.id)),
})

export type Users = typeof Users
