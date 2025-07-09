import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { LuEllipsisVertical, LuLanguages, LuTrash2 } from 'react-icons/lu'
import Button from '../../../../../../components/common/button/Button'
import NoDataFound from '../../../../../../components/common/NoDataFound/NoDataFound'

const LanguageTable = ({ languages, actions, loader }) => {
    const { t } = useTranslation();
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <span className="d-flex align-items-center gap-2 lh-1">
                            <b>#</b> <span>{t("name", "Name")}</span>
                        </span>
                    </th>
                    <th> {t("code", "Code")}</th>
                    <th>{t("status", "Status")}</th>
                    <th>{t("default", "Default")}</th>
                    <th>{t("created_at", "Created At")}</th>
                    <th>{t("actions", "Actions")}</th>
                </tr>
            </thead>

            <tbody>
                {languages?.length > 0 ? (
                    languages.map((language, ind) => (
                        <tr key={language?.id}>
                            <td>
                                <span className="d-flex align-items-center gap-2">
                                    <b>{ind + 1}.</b> <span>{language?.name}</span>
                                </span>
                            </td>

                            <td>
                                <span className='text-uppercase'>
                                    {language?.code}
                                </span>
                            </td>

                            <td>
                                <span className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={`lang-${language?.id}`}
                                        checked={language?.status === "active"}
                                        onChange={() =>
                                            actions?.status?.fn(language)
                                        }
                                    />
                                </span>
                            </td>

                            <td>
                                {language?.is_default ? (<span className='i-badge pill success-solid
                                    '>{t("default","Default")}</span>):("--")}
                                
                            </td>

                            <td>
                                <span>{language?.created_at}</span>
                            </td>

                            <td>
                                <div className="d-flex align-items-center justify-content-end gap-1">
                                    <Button
                                        iconBtn={true}
                                        tooltipText="Translate"
                                        icon={LuLanguages}
                                        className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                        href={`/setting/language/${language?.id}`}
                                    />

                                    <Dropdown className="icon-dropdown">
                                        <Dropdown.Toggle
                                            id="dropdown-5"
                                            className="icon-btn dark-soft btn-ghost hover btn-md fs-18 circle p-0"
                                        >
                                            <LuEllipsisVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align={`end`}>
                                            <div className="dropdown-content">
                                                {/* <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                                    actions.modal.modalUid,
                                                    "EDIT",
                                                    "Update language",
                                                    "md"
                                                )
                                                }
                                                >
                                                    <LuSquarePen />
                                                    Edit
                                                </Dropdown.Item> */}

                                                <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                                    actions.modal.modalUid,
                                                    "DELETE",
                                                    "",
                                                    "",
                                                    language?.id
                                                )
                                                }>
                                                    <LuTrash2 />
                                                    {t("delete"," Delete")}
                                                </Dropdown.Item>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </td>
                        </tr>
                    ))) : (
                        !loader && (
                            <tr>
                                <td colSpan={5}>
                                    <NoDataFound />
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </>

    )
}

export default LanguageTable