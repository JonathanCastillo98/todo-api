import { SetMetadata } from "@nestjs/common";
import { AUTHORIZE_KEY } from "../constants/key-decorators";
import { ROLES } from "src/constants/roles";


interface RolesOptions {
    allowSameUser?: boolean;
    roles: Array<keyof typeof ROLES>;
  }
  
  export const Autorize = ({ roles, allowSameUser = false }: RolesOptions) =>
    SetMetadata(AUTHORIZE_KEY, { roles, allowSameUser });