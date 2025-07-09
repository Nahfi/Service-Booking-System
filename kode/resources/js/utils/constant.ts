import type { ModalConfigType } from "./types";

export const modalConfigInit: ModalConfigType = {
    modalUid:"",
    type: "",
    title: "",
    size: "",
    data: null,
};


export enum BulkActionTypes {
    RESTORE = 'restore',
    FORCE_DELETE = 'force_delete',
    DELETE = 'delete',
    STATUS = 'status',
  }


//   Role Permission
  export type PermissionKey =
      | "user"
      | "role_permission"
      | "user_message"
      | "gateway_management"
      | "language_management"
      | "settings"
      | "contact"
      | "contact_group"
      | "contact_import";

  export type PermissionValue = string[];

  export const PERMISSIONS: Record<PermissionKey, PermissionValue> = {
      user: ["view_user", "save_user", "destroy_user"],

      role_permission: ["view_role", "save_role", "destroy_role"],

      user_message: ["view_message"],

      gateway_management: ["view_gateway", "save_gateway"],

      language_management: [
          "view_language",
          "save_language",
          "destroy_language",
      ],

      settings: ["view_setting", "save_setting", "destroy_setting"],

      contact: ["view_contact", "save_contact", "destroy_contact"],

      contact_group: [
          "view_contact_group",
          "save_contact_group",
          "destroy_contact_group",
      ],

      contact_import: [
          "view_contact_import",
          "save_contact_import",
          "destroy_contact_import",
      ],
  };
