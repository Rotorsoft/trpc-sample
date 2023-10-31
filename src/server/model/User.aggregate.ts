import { randomUUID } from "node:crypto"
import { usersRepo } from "../repositories"
import { CreateUser } from "./User.schemas"

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
