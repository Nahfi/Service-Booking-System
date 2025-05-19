import { useContext, useMemo } from "react";

import usaImg from "@/assets/images/icons/usa.png";

import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context/";
import { LuLayoutTemplate, LuMegaphone, LuUserPlus } from "react-icons/lu";
import Card, { CardBody, CardHeader } from "../../components/common/card";
import ChartWrapper from "../../components/common/chart/ChartWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import Progress from "../../components/common/progressbar/Progress";
import BaseLayout from "../../components/layouts/BaseLayout";
import OverviewCards from "./components/OverviewCards";

import { Alert } from "react-bootstrap";
import "./dashboard.scss";
const Dashboard = () => {
  const { themeSettings } = useContext(ThemeContext);
  const currentTheme = themeSettings?.theme || "light";

  const smsReport = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 350,
        theme: "light",
      },
      theme: {
        mode: currentTheme,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },

      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
    }),
    [currentTheme]
  );

  const statistics = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 350,
        theme: "light",
      },
      theme: {
        mode: currentTheme,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
        ],
      },
      series: [
        {
          data: [400, 430, 448, 470, 540, 580],
        },
      ],
    }),
    [currentTheme]
  );

  const whatsappReport = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "line",
        theme: "light",
        zoom: {
          enabled: false,
        },
      },
      theme: {
        mode: currentTheme,
      },
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: "Mobiles",
          data: [23, 33, 22, 54, 42, 76, 85, 95, 130],
        },
      ],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0,
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    }),
    [currentTheme]
  );

  const subsribersReport = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "area",
        theme: "light",
      },
      theme: {
        mode: currentTheme,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "solid",
        opacity: 0.06,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.5,
        },
        column: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },

      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
    }),
    [currentTheme]
  );

  return (
      <BaseLayout>
          <>
              <PageHeader
                  title={"Overview"}
                  shortTitle={"Monitor every activity of your business."}
              >
                  <div className="quick-action">
                      <div className="d-flex align-items-center gap-3">
                          <Button
                              href={`/roles/create`}
                              className="quick-action-btn flex-column gap-2"
                          >
                              <span className="quick-action-icon">
                                  <LuUserPlus />
                              </span>
                              <p className="quick-action-btn-level">
                                  Add Contact
                              </p>
                          </Button>

                          <Button
                              href={`/roles/create`}
                              className="quick-action-btn flex-column gap-2"
                          >
                              <span className="quick-action-icon">
                                  <LuLayoutTemplate />
                              </span>
                              <p className="quick-action-btn-level">
                                  Create Template
                              </p>
                          </Button>

                          <Button
                              href={`/campaign/choose-campaign`}
                              className="quick-action-btn flex-column gap-2"
                          >
                              <span className="quick-action-icon">
                                  <LuMegaphone />
                              </span>
                              <p className="quick-action-btn-level">
                                  Create Campaign
                              </p>
                          </Button>
                      </div>
                  </div>
              </PageHeader>

              <div className="row g-4">
                  <div className="col-12">
                      <div className="p-4 border rounded-4">
                          {/* <div className="d-flex align-items-center justify-content-between mb-3">
                              <h5 className="">Announcements</h5>
                              <Button
                                  iconBtn={true}
                                  tooltipText="Close"
                                  icon={LuX}
                                  className="danger-soft btn-ghost hover btn-md rounded-circle fs-18"
                              />
                          </div> */}
                          <Alert variant="warning">
                            <Alert.Heading as={"h6"}>
                                      Hey, nice to see you
                              </Alert.Heading>
                              <p className="mt-2 fs-14">
                                  Aww yeah, you successfully read this important
                                  alert message. This example text is going to
                                  run a bit longer so that you can see how
                                  spacing within an alert works with this kind
                                  of content.
                              </p>
                          </Alert>
                      </div>
                  </div>

                  <div className="col-12">
                      <OverviewCards />
                  </div>

                  <div className="col-xl-5 col-lg-6">
                      <Card className="h-100">
                          <CardHeader cardTitle={"SMS Sent Report"} />
                          <CardBody>
                              <ChartWrapper
                                  options={smsReport}
                                  series={smsReport.series}
                                  type="bar"
                                  height="350"
                              />
                          </CardBody>
                      </Card>
                  </div>

                  <div className="col-xl-7 col-lg-6">
                      <Card className="h-100">
                          <CardHeader cardTitle={"SMS Sent Report"} />
                          <CardBody>
                              <ChartWrapper
                                  options={statistics}
                                  series={statistics.series}
                                  type="bar"
                                  height="360"
                              />
                          </CardBody>
                      </Card>
                  </div>

                  <div className="col-xl-3 col-lg-5">
                      <Card className="h-100">
                          <CardHeader cardTitle={"SMS Sent Report"} />
                          <CardBody>
                              <div className="d-flex flex-column gap-3">
                                  {Array.from({ length: 5 }).map((_, ind) => (
                                      <Progress
                                          key={ind}
                                          percentage={70}
                                          type="linear"
                                          flagUrl={usaImg}
                                          countryName={"USA"}
                                      />
                                  ))}
                              </div>
                          </CardBody>
                      </Card>
                  </div>

                  <div className="col-xl-9 col-lg-7">
                      <Card className="h-100">
                          <CardHeader cardTitle={"SMS Sent Report"} />
                          <CardBody>
                              <ChartWrapper
                                  options={whatsappReport}
                                  series={whatsappReport.series}
                                  type="line"
                                  height="380"
                              />
                          </CardBody>
                      </Card>
                  </div>

                  <div className="col-12">
                      <Card className="h-100">
                          <CardHeader cardTitle={"SMS Sent Report"} />
                          <CardBody>
                              <ChartWrapper
                                  options={subsribersReport}
                                  series={subsribersReport.series}
                                  type="area"
                                  height="400"
                              />
                          </CardBody>
                      </Card>
                  </div>
              </div>
          </>
      </BaseLayout>
  );
};

export default Dashboard;
