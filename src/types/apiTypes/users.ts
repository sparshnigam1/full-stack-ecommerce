import { getUsersQueryType } from "@/app/api/students/schema";
import { UserRolesEnum } from "..";

export interface IErrorResponse {
  message: string;
  errors?: any;
}

export interface ICreateUserAPI {
  req: {
    body: { name: string; email: string };
  };
  res:
    | {
        message: string;
        data: any;
      }
    | IErrorResponse;
}

export interface IGetUsersAPI {
  req: {
    query: getUsersQueryType;
  };
  res:
    | {
        message: string;
        errors?: any;
      }
    | IErrorResponse;
}

export interface PermissionType {
  id: string;
  name: string;
  description: string | null;
  granted?: boolean;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  role: UserRolesEnum;
  permissions?: PermissionType[];
}
