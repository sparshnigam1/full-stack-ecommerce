import "@/db/objection";
import { UserRolesEnum } from "@/types";
import { uuidv7 } from "uuidv7";
import User from "../models/application/users";

export const createUserQuery = async (params: {
  first_name: string;
  last_name?: string | null;
  email: string;
  phone_number: string;
  gender?: string | null;
  date_of_birth?: string | null;
  country_of_citizenship?: string | null;
  technologies: string[];
  role: UserRolesEnum;
}) => {
  const query = User.query().insert({
    id: uuidv7(),
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    phone_number: params.phone_number,
    gender: params.gender,
    date_of_birth: params.date_of_birth,
    country_of_citizenship: params.country_of_citizenship,
    technologies: params.technologies,
    role: params.role,
  });
  // logBus.debug(query.toKnexQuery().toSQL());

  return query;
};
