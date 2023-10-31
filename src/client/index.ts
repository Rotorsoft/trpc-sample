import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { Users } from "../server/model/User.aggregate"

const trpc = createTRPCProxyClient<Users>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
})

async function main() {
  /**
   * Inferring types
   */
  const users = await trpc.getAllUsers.query()
  //    ^?
  console.log("Users:", users)

  const createdUser = await trpc.createUser.mutate({ name: "test user" })
  //    ^?
  console.log("Created user:", createdUser)

  const user = await trpc.getById.query({ id: createdUser.id })
  //    ^?
  console.log("User 1:", user)
}

main().catch(console.error)
