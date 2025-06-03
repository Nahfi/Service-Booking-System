import { ReactElement, ReactNode, useMemo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { generateUUID } from "../../../utils/helper";


type TooltipWrapperProps = {
    children: ReactElement; // OverlayTrigger requires a single element
    content: ReactNode;
    placement?: "top" | "right" | "bottom" | "left";
};


function TooltipWrapper({
    children,
    content,
    placement = "top",
}: TooltipWrapperProps) {
    const tooltipId = useMemo(() => generateUUID(), []);

    const renderTooltip = (props:any) => (
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
