import { UserRolesEnum } from "@/types";
import BaseModel from "src/db/models/BaseModel";

export default class User extends BaseModel {
  static tableName = "users";

  // Columns
  //   id?: string;
  first_name!: string;
  last_name!: string | null;
  email!: string;
  phone_number!: string;
  gender!: string | null;
  date_of_birth!: string | null;
  country_of_citizenship!: string | null;
  technologies!: string[];
  role!: UserRolesEnum;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "email", "phone_number"],

      properties: {
        id: { type: "string", format: "uuid" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string", format: "email" },
        phone_number: { type: "string", pattern: "^\\+[1-9]\\d{1,14}$" },
        gender: { type: "string" },
        date_of_birth: { type: "string" },
        country_of_citizenship: { type: "string" },
        technologies: {
          type: "array",
          items: {
            type: "string",
            minLength: 1,
          },
        },
        role: {
          type: "string",
          enum: Object.values(UserRolesEnum),
        },
      },
    };
  }
}
