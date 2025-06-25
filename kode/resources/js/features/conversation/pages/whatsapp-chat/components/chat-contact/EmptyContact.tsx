import type React from "react"
import { useTranslation } from "react-i18next"
import { LuPlus, LuUserRoundPlus } from "react-icons/lu"
import Button from "../../../../../../components/common/button/Button"
import { valueToKey } from "../../../../../../utils/helper"


const EmptyContact: React.FC = () => {
    const {t}= useTranslation()
  return (
      <div className="empty-contact">
          <span className="empty-contact-icon">
              <LuUserRoundPlus />
          </span>
          <div>
              <h6 className="mb-2">
                  {t(
                      valueToKey("Start your first conversation"),
                      "Start your first conversation"
                  )}
              </h6>
              <p>
                  {t(
                      valueToKey(
                          "Add contacts to begin chatting and stay connected with friends, family, and colleagues"
                      ),
                      "Add contacts to begin chatting and stay connected with friends, family, and colleagues"
                  )}
                  .
              </p>
          </div>

          <Button
              href={`/conversation/contact`}
              className="btn--primary btn--lg outline rounded-3"
          >
              <LuPlus className="fs-18" />
              {t(valueToKey("Add Contact"), "Add Contact")}
          </Button>
      </div>
  );
}

export default EmptyContact