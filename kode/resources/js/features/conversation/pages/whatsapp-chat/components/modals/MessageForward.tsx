import { LuSearch } from 'react-icons/lu';
import Button from '../../../../../../components/common/button/Button';
import SelectBox from '../../../../../../components/common/from/SelectBox';

const MessageForward = () => {
  return (
      <div>
          <SelectBox options={""} isMulti icon={<LuSearch />} />

          <div className="mt-4">
              <h6 className="mb-2">Suggested</h6>

              <ul className="ul-list">
                  {Array.from({ length: 6 }).map((item, ind) => (
                      <li
                          key={ind}
                          className="d-flex align-items-center justify-content-between gap-4 py-3"
                      >
                          <div className="d-flex align-items-center gap-3">
                              <span className="avatar avatar-md circle flex-shrink-0">
                                  <img src={userOne} alt="" className="w-100" />
                              </span>

                              <h6>Clara Mendis</h6>
                          </div>

                          <div>
                              <Button className="btn--primary btn--md outline rounded-3">
                                  Send Message
                              </Button>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
}

export default MessageForward