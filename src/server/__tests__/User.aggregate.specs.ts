import { User } from "../model/User.aggregate"
import { User as Schema } from "../model/User.schemas"
import { randomUUID } from "node:crypto"

describe("User", () => {
  it("should create", async () => {
    const user = await User.create({ name: "abc" })
    expect(user.name).toBe("abc")
  })

  it("should delete", async () => {
    let user: Schema | undefined = await User.create({ name: "xyz" })
    await User.delete(user.id)
    user = await User.getById(user.id)
    expect(user).toBeUndefined()
  })

  it("should fail delete", async () => {
    expect(User.delete(randomUUID())).rejects.toThrow("User not found")
  })
})
