import { useState } from "react";
import Filter from "../../../components/common/filter/Filter";
import PaginationWrapper from "../../../components/common/pagination/PaginationWrapper";
import Table from "../../../components/common/table/Table";
import SendLogTable from "./table/SendLogTable";


const SendLog = () => {
  const initialCampaignStates = Array.from({ length: 7 }, () => true);
  const [stopCampaign, setStopCampaign] = useState(initialCampaignStates);

  const handleStopCampaign = (index) => {
    setStopCampaign((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <>
      <Filter />

      <Table>
        <SendLogTable/>
      </Table>

      <div className="mt-4">
        <PaginationWrapper />
      </div>
    </>
  );
};

export default SendLog;
