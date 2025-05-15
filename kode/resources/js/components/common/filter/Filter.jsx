import { LuFilter } from "react-icons/lu";
import Button from "../button/Button";
import Field from "../from/Field";

const Filter = ({ ...props }) => {
  const attributes = {
      ...props,
      className: `filter-form ${props.className || ""}`,
  };
  return (
      <form {...attributes}>
          <div className="d-flex justify-content-start align-items-center flex-wrap gap-3">
              <div className="flex-grow-1">
                  <Field>
                      <input
                          type="search"
                          id="search"
                          placeholder="Search contacts"
                          className="form-control h-40"
                      />
                  </Field>
              </div>

              <div className="flex-grow-1">
                  <Field>
                      <input
                          type="date"
                          id="date"
                          placeholder="Date"
                          className="form-control h-40"
                      />
                  </Field>
              </div>

              <div className="flex-grow-1">
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
              </div>
              <Button className="fs-24 flex-shrink-0">
                  <LuFilter />
              </Button>
          </div>
      </form>
  );
};

export default Filter;
