import PageHeader from "@/components/common/Page-header/PageHeader";
import TableWrapper from "@/components/common/table/TableWrapper";
import React, { useEffect, useMemo, useState } from "react";
import FilterWrapper from "../../../../components/common/filter/FilterWrapper";
import Field from "../../../../components/common/from/Field";
import type { InputChangeEvent } from "../../../../utils/types";
import useGetNotificationTemplates from "./api/hooks/useGetNotificationTemplates";
import NotificationTable from "./components/NotificationTable";
import type { NotificationTemplate } from "./utils/type";

const NotificationTemplates: React.FC = () => {
    const { data, refetch, isLoading } = useGetNotificationTemplates();
    const templates = useMemo<NotificationTemplate[] | null>(() => data?.data || null, [data])
    const [notificationTemplates, setNotificationTemplates] = useState<NotificationTemplate[] | null>(templates);

    useEffect(() => {
        if (templates) setNotificationTemplates(templates);
    }, [templates]);

    const searchTemplates = (e: InputChangeEvent) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = templates.filter(template =>
            template?.name.toLowerCase().includes(searchTerm)
        );
        setNotificationTemplates(filtered);
    };
    
    return (
        <>
            <PageHeader
                title={"Notification Templates"}
                breadcrumbs={[
                    {
                        title: "Notification Templates",
                    },
                ]}
            />

            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className="mb-0">
                        <div className="d-flex justify-content-start align-items-center flex-wrap gap-3">
                            <div className="flex-grow-1">
                                <Field>
                                    <input
                                        type="search"
                                        id="search"
                                        name="search"
                                        placeholder="Search contacts"
                                        className="form-control h-40"
                                        onChange={searchTemplates}
                                    />
                                </Field>
                            </div>
                        </div>
                    </FilterWrapper>
                </div>

                <TableWrapper loader={isLoading}>
                    <NotificationTable
                        templates={notificationTemplates}
                        loader={isLoading} />
                </TableWrapper>

            </div>

        </>
    );
}

export default NotificationTemplates