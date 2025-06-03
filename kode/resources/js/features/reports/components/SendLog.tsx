import { useState } from "react";
import Filter from "../../../components/common/filter/Filter";
import PaginationWrapper from "../../../components/common/pagination/PaginationWrapper";
import SendLogTable from "./table/SendLogTable";

import TableWrapper from "../../../components/common/table/TableWrapper";

const SendLog: FC = () => {
    const initialCampaignStates = Array.from({ length: 7 }, () => true);
    const [stopCampaign, setStopCampaign] = useState<boolean[]>(initialCampaignStates);

    const handleStopCampaign = (index: number) => {
        setStopCampaign((prevState) =>
            prevState.map((state, i) => (i === index ? !state : state))
        );
    };

    return (
        <>
            <Filter />

            <TableWrapper>
                <SendLogTable />
            </TableWrapper>

            <div className="mt-4">
                <PaginationWrapper />
            </div>
        </>
    );
};

export default SendLog;
