
import { Tooltip, TooltipWrapper } from "react-tooltip";
const TooltipContainer = ({ children, id, content="" }) => {
  return (
    <>
      <TooltipWrapper tooltipId={id}>{children}</TooltipWrapper>
      <Tooltip id={id} content={content} />
    </>
  );
};

export default TooltipContainer