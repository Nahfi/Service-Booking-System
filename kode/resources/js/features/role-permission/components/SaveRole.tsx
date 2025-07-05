import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/common/button/Button';
import Card from '../../../components/common/card/Card';
import CardBody from '../../../components/common/card/CardBody';
import Field from '../../../components/common/from/Field';
import SwitchWrapper from '../../../components/common/from/SwitchWrapper';
import { PERMISSIONS } from '../../../utils/constant';
import { valueToKey } from '../../../utils/helper';
import useSaveRoles from '../api/hooks/useSaveRoles';
import { formatPermissions } from '../utils/helper';

const SaveRole = ({role}) => {
    const { t } = useTranslation();

    const { mutate: saveRole, isPending } = useSaveRoles();

    const permissions = PERMISSIONS;
    let checkedPermissions = [];


    console.log(1000);
    

    const [formattedPermissions, setPermissions] = useState(
        formatPermissions(permissions, checkedPermissions)
    );


    const [selectAll, setSelectAll] = useState(false);
    // Helper function to check if all permissions are selected
    const areAllPermissionsSelected = (permissionsSections) => {
        return permissionsSections.every(section =>
            section.permissions.every(permission => permission.enabled)
        );
    };

    // Update selectAll state when permissions change
    useEffect(() => {
        const allSelected = areAllPermissionsSelected(formattedPermissions);
        setSelectAll(allSelected);
    }, [formattedPermissions]);
    
    const togglePermission = (sectionIndex, permissionIndex) => {
        setPermissions((prevSections) => {
            const updatedSections = [...prevSections];
            updatedSections[sectionIndex].permissions[permissionIndex].enabled =
                !updatedSections[sectionIndex].permissions[permissionIndex].enabled;
            return updatedSections;
        });
    };

    const toggleAllPermissions = () => {
        const newSelectAllState = !selectAll;
        setSelectAll(newSelectAllState);
        setPermissions((prevSections) =>
            prevSections.map((section) => ({
                ...section,
                permissions: section.permissions.map((permission) => ({
                    ...permission,
                    enabled: newSelectAllState,
                })),
            }))
        );
    };

    const resetForm = () => {
        setPermissions(formatPermissions(permissions, checkedPermissions));
        setSelectAll(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData.entries());

        const permissionPostData = formattedPermissions.reduce((acc, section) => {
            const enabledPermissions = section.permissions
                .filter((permission) => permission.enabled)
                .map((permission) => permission.id);
            if (enabledPermissions.length > 0) {
                acc[valueToKey(section.title, "_")] = enabledPermissions;
            }
            return acc;
        }, {});

        let postData = {
            permissions: permissionPostData,
            name: inputs.name,
        };

        if (role && role?.id) postData.id = role?.id;

        saveRole(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Saved");
                    e.target.reset();

                    if (!postData?.id) {
                        resetForm();
                    }
                }
            },
        });

    }
    

    return (
        <Card>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <div className="row g-3">
                            <div className="col-md-8">
                                <Field label="Role Name" required>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter role name"
                                        name="name"
                                        defaultValue={role?.name}
                                        required
                                    />
                                </Field>
                            </div>
                            <div className="col-md-4">
                                <Field label="Check All">
                                        <SwitchWrapper
                                        label={" Select All Permissions"}
                                        id={"check_all"}
                                        name={"check_all"}
                                        checked={selectAll}
                                        onSwitch={toggleAllPermissions}
                                        />
                                </Field>
                            </div>
                        </div>
                    </div>

                    {formattedPermissions.map((permission, sectionIndex) => {
                        return (
                            <div
                                className="form-element"
                                key={`${permission?.title}-${sectionIndex}`}
                            >
                                <div className="row g-3">
                                    <div className="col-xxl-2 col-xl-3">
                                        <h6 className="title--sm mt-2">{permission?.title}</h6>
                                    </div>

                                    <div className="col-xxl-10 col-xl-9">
                                        <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-sm-2 row-cols-1 g-md-3 g-3">
                                            {permission?.permissions.map(
                                                (permissionObj, permissionIndex) => (
                                                    <div className="col" key={permissionObj?.id}>
                                                        <SwitchWrapper
                                                            label={permissionObj.label}
                                                            id={permissionObj?.id}
                                                            checked={permissionObj.enabled}
                                                            onSwitch={() =>
                                                                togglePermission(sectionIndex, permissionIndex)
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                    <div className="text-end mt-4">
                        <Button
                            type="submit"
                            className="btn--primary btn--lg rounded-3"
                            isLoading={isPending}
                        >
                            {t(valueToKey("Submit"), "Submit")}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default SaveRole;