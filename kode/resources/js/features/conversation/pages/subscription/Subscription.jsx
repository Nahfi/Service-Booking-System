
import PageHeader from "../../../../components/common/Page-header/PageHeader";
import PlanItem from "../../../plans/components/PlanItem";

const Subscription = () => {
  return (
    <div className="main-content-body">
      <div className="mb-4">
        <PageHeader title="Subscription" description="Manage your profile" />
      </div>

      <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 g-4">
        {Array.from({ length: 4 }).map((plan, index) => (
          <div className="col" key={index}>
            <PlanItem />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
