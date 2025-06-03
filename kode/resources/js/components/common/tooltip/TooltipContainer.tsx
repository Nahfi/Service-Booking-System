
import { FC, ReactNode } from "react";

import { Tooltip, TooltipWrapper } from "react-tooltip";

type TooltipContainerProps = {
    children: ReactNode;
    id: string;
    content?: string;
};

const TooltipContainer: FC<TooltipContainerProps> = ({
    children,
    id,
    content = "",
}) => {
    return (
        <>
            <TooltipWrapper tooltipId={id}>{children}</TooltipWrapper>
            <Tooltip id={id} content={content} />
        </>
    );
};

export default TooltipContainer