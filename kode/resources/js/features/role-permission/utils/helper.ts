import { keyToValue } from "../../../utils/helper";

export const formatPermissions = (
    permissionsData,
    checkedPermissions = null
) => {
    return Object.entries(permissionsData).map(([key, permissions]) => {
        return {
            title: keyToValue(key),
            permissions: permissions.map((permission) => ({
                id: permission,
                label: keyToValue(permission),
                enabled: checkedPermissions?.includes(permission),
            })),
        };
    });
};
