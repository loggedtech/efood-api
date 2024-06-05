import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateAccountService } from "../services/create-account";

export async function routes(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post("/accounts",
    {
      schema: {
        body: z.object({
          address: z.object({
            zip: z.string(),
            street: z.string(),
            number: z.string(),
            complement: z.string().optional(),
            district: z.string(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
          }),
          restaurant: z.object({
            name: z.string(),
            description: z.string().optional(),
            phone: z.string(),
            domain: z.string(),
            taxId: z.string(),
          }),
          user: z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            role: z
              .enum(["administrator", "manager", "preparer", "separator"])
              .default("manager"),
          }),
        }),

        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
          default: z.object({
            statusCode: z.number(),
            error: z.string(),
            message: z.string(),
          }),
        }
      }
    },
async (request, reply) => {{
  const { address, restaurant, user } = request.body
  const account = new CreateAccountService()

  const response = await account.execute({ address, restaurant, user })

  return reply.status(response.statusCode).send(response)
}})
  }