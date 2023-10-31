import { randomUUID } from "node:crypto"
import { usersRepo } from "../repositories"
import { CreateUser } from "./User.schemas"

// Using a basic transaction-script like approach where the repo has some business logic or is ORM
// This is ok for supporting subdomains - basic domain models (anemic), not many business rules, stable functionality
// Important: Aggregates define a consistency boundary, commands are serialized for any given aggregate id
// TODO: Use aggregate factory 
export const User = {
  // queries (in CQRS this is a read model)
  getAll: usersRepo.getUsers,
  getById: (id: string) => usersRepo.getUserById(id),

  // commands
  create: (data: CreateUser) => {
    const user = { ...data, id: randomUUID() }
    usersRepo.addUser(user)
    return user
  },
  delete: async (id: string) => {
    const user = await usersRepo.getUserById(id)
    if (!user) throw Error("User not found")
    usersRepo.deleteUser(id)
  },
}
