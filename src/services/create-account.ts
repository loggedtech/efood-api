
import { prisma } from "../utils/database";

interface AddressCreateInput {
  zip: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

interface RestaurantCreateInput {
  name: string;
  description?: string;
  phone: string;
  domain: string;
  taxId: string;
}

interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  role: "administrator" | "manager" | "preparer" | "separator";
}

interface AccountCreateInput {
  address: AddressCreateInput;
  restaurant: RestaurantCreateInput;
  user: UserCreateInput;
}

export class CreateAccountService {
  async execute(data: AccountCreateInput) {
    return prisma.$transaction(async (trx) => {

      let address = await trx.address.findFirst({
        where: {
          zip: data.address.zip,
        },
      });

      if (!address) {
        address = await trx.address.create({
          data: {
            ...data.address,
          },
        });
      }

      let restaurant = await trx.restaurant.findFirst({
        where: {
          domain: data.restaurant.domain,
        },
      });

      if (restaurant) {
        return {
          statusCode: 400,
          error: "Bad Request",
          message: "Restaurant already exists.",
        }     
      } 

      restaurant = await trx.restaurant.findFirst({
        where: {
          taxId: data.restaurant.taxId,
        }
      }) 

      if (restaurant) {
        return {
          statusCode: 400,
          error: "Bad Request",
          message: "Restaurant already exists.",
        }     
      }

      restaurant = await trx.restaurant.create({
        data: {
          ...data.restaurant,
          addressId: address.id,
        },
      });

      let user = await trx.user.findFirst({
        where: {
          email: data.user.email,
          restaurants: {
            some: {
              restaurantId: restaurant.id,
            }
          }
        },
      })

      if (user) {
        return {
          statusCode: 400,
          error: "Bad Request",
          message: "User already exists in this restaurant.",
        }
      }

      user = await trx.user.create({
        data: {
         ...data.user,
        },
      })

      await trx.member.create({
        data: {
          userId: user.id,
          restaurantId: restaurant.id,
          role: data.user.role,
        },
      })

      return { 
        statusCode: 201,
        message: "Account created successfully." 
      };
    });
  }
}
