import Button from '@/components/common/button/Button';
import { useTranslation } from 'react-i18next';
import { LuSquarePen } from 'react-icons/lu';
import NoDataFound from '../../../../../components/common/NoDataFound/NoDataFound';
import { keyToValue, valueToKey } from '../../../../../utils/helper';
import { getNotificationTemplateBadgeClass } from '../utils/helper';

interface NotificationTableProps {
    templates: NotificationTemplate[] | undefined;
    loader: boolean;
}

const NotificationTable: React.FC<NotificationTableProps> = ({ templates, loader }) => {
    const { t } = useTranslation()
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <span className="d-flex align-items-center gap-2">
                            <b>#</b> {t(valueToKey("Name"), "Name")}
                        </span>
                    </th>
                    <th>{t(valueToKey("Type"), "Type")}</th>
                    <th>{t(valueToKey("Subject"), "Subject")}</th>
                    <th>{t(valueToKey("Actions"), "Actions")}</th>
                </tr>
            </thead>

            <tbody>
                {
                    templates?.length > 0 ? (
                        templates.map((template, ind) => (
                            <tr key={template?.id}>
                                <td>
                                    <span className="d-flex align-items-center gap-2 lh-1">
                                        <b>{ind + 1}.</b> <span>{template?.name}</span>
                                    </span>
                                </td>

                                <td>
                                    <span className={`i-badge pill 
                                    ${getNotificationTemplateBadgeClass(
                                        template?.type
                                        )}-soft
                                    `}>
                                        {keyToValue(template?.type)}
                                    </span>
                                </td>

                                <td>
                                    <span>{template?.subject}</span>
                                </td>

                                <td>
                                    <div className="d-flex align-items-center justify-content-end gap-2">
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Edit Template"
                                            icon={LuSquarePen}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                            href={`/setting/notification-templates/${template?.id}/edit`}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        !loader && (
                            <tr>
                                <td colSpan={4}>
                                    <NoDataFound />
                                </td>
                            </tr>
                        )
                    )

                }
            </tbody>
        </>
    );
};

export default NotificationTable