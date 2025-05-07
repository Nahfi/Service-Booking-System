import Chart from "react-apexcharts";


const ChartWrapper = ({...props }) => {
  return (
    <Chart className="chart-height" {...props} />
  );
};

export default ChartWrapper;
