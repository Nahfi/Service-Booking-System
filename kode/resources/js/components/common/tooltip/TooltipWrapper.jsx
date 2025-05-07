import { useMemo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { generateUUID } from "../../../utils/helper";

function TooltipWrapper({ children, content, placement = "top" }) {
  const tooltipId = useMemo(() => generateUUID(), []);

  const renderTooltip = (props) => (
    <Tooltip id={tooltipId} {...props}>
      {content}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

export default TooltipWrapper;
