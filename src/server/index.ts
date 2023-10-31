import * as expressAdapter from "@trpc/server/adapters/express"
import * as express from "express"
import {
  createOpenApiExpressMiddleware,
  generateOpenApiDocument,
} from "trpc-openapi"
import * as swaggerUI from "swagger-ui-express"
import { Users } from "./routers/Users"

const app = express.default()

// handles trpc requests
app.use("/api/trpc", expressAdapter.createExpressMiddleware({ router: Users }))
// handles OpenAPI requessts
app.use("/api", createOpenApiExpressMiddleware({ router: Users }))

// serve Swagger UI
const usersSpec = generateOpenApiDocument(Users, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
  tags: ["users"],
})
app.use("/", swaggerUI.serve)
app.get("/", swaggerUI.setup(usersSpec))

// listen
app.listen(3000, () => {
  console.log("Server listening on 3000")
})
