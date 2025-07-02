import FilterWrapper from "../../../components/common/filter/FilterWrapper"
import TableWrapper from "../../../components/common/table/TableWrapper"
import CampaignTable from "./tables/CampaignTable"

const SmsCampaign = () => {
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

export default SmsCampaign