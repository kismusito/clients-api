import { PERMISSION } from "../../utils/enums/permissions";
import { ROL } from "../../utils/enums/roles";

export const rolPermissions = {
  [ROL.ADMINISTRATOR]: {
    clients: [
      PERMISSION.CREATE,
      PERMISSION.DELETE,
      PERMISSION.READ,
      PERMISSION.UPDATE,
    ],
  },
  [ROL.GUEST]: {
    clients: [PERMISSION.READ],
  },
};
