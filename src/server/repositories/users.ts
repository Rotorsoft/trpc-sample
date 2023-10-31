import { User } from "../model/User.schemas"

const users = new Map<string, User>()

// Watch for leaked business logic, if using CRUD, should only encapsulate CRUD operations on entities inside aggregate
// cluster, protected by transaction boundary
export const usersRepo = {
  getUsers: () => Promise.resolve([...users.values()]),
  getUserById: (id: string) => Promise.resolve(users.get(id)),
  addUser: (user: User) => {
    users.set(user.id, user)
    return Promise.resolve()
  },
  deleteUser: (id: string) => {
    users.delete(id)
    return Promise.resolve()
  },
}
