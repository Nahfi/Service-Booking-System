import FilterWrapper from "../../../components/common/filter/FilterWrapper"
import TableWrapper from "../../../components/common/table/TableWrapper"
import CampaignTable from "./tables/CampaignTable"

const WhatsappCampaign = () => {
    return (
        <>
            <FilterWrapper />
            <div>
                <TableWrapper>
                    <CampaignTable />
                </TableWrapper>
            </div>
        </>
    )
}

export default WhatsappCampaign