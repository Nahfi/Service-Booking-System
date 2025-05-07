import { LuFilter } from "react-icons/lu";
import Field from "../from/Field";

const Filter = () => {
  return (
    <form>
      <div className="d-flex justify-content-start align-items-center flex-wrap gap-3 mb-4">
        <Field>
          <input
            type="search"
            id="search"
            placeholder="Search contacts"
            className="form-control h-40"
          />
        </Field>

        <Field>
          <input
            type="date"
            id="date"
            placeholder="Date"
            className="form-control h-40"
          />
        </Field>

        <Field>
          <select
            className="form-select h-40"
            id="country"
            aria-label="country"
          >
            <option defaultValue>Status</option>
            <option value="1">Active</option>
            <option value="2">Deactive</option>
            <option value="3">Pending</option>
          </select>
        </Field>
        <div className="filter-icon fs-24 d-inline-flex align-items-center">
          <LuFilter />
        </div>
      </div>
    </form>
  );
};

export default Filter;
