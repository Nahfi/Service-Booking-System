import React from "react";
import Chart, { Props as ChartProps } from "react-apexcharts";

const ChartWrapper: React.FC<ChartProps> = ({ ...props }) => {
    return <Chart className="chart-height" {...props} />;
};

export default ChartWrapper;
