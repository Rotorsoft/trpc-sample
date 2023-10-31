import { User } from "../model/User.schemas"

const users = new Map<string, User>()

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
