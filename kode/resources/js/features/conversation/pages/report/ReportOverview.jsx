import usaImg from "@/assets/images/icons/usa.png";
import { useContext, useMemo } from "react";
import Card, { CardBody, CardHeader } from "../../../../components/common/card";
import ChartWrapper from "../../../../components/common/chart/ChartWrapper";
import Filter from "../../../../components/common/filter/Filter";
import Progress from "../../../../components/common/progressbar/Progress";
import { ThemeContext } from "../../../../context";
// import { ThemeContext } from "../../../../context/index";
// import Card from "../../../common/card/Card";
// import ChartWrapper from "../../../common/chart/ChartWrapper";
// import Filter from "../../filter/Filter";
// import Progress from "./../../../common/progressbar/Progress";

const ReportOverview = () => {
  const { themeSettings } = useContext(ThemeContext);

  const audienceGrowth = useMemo(
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
        mode: themeSettings?.theme || "light",
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
    [themeSettings.theme]
  );

  return (
    <>
      <Filter />
      <div className="row g-4">
        <div className="col-xl-5">
          <Card className="h-100">
            <div className="campaign-status-card">
              <div className="campaign-status">
                <Progress percentage={80} type="linear" color={"bg--success"} />
                <div className="row align-items-center mt-3">
                  <div className="col-6">
                    <div className="campaign-status-wrapper">
                      <span className="campaign-status-dots flex-shrink-0 bg--success"></span>
                      <div className="campaign-status-content">
                        <p>
                          <span className="text-success me-1">Sent</span> 80%
                        </p>
                        <p>235 Contacts</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="campaign-status-wrapper">
                      <span className="campaign-status-dots flex-shrink-0 bg--warning"></span>
                      <div className="campaign-status-content">
                        <p>
                          <span className="text-warning  me-1">Unsent</span> 20%
                        </p>
                        <p>235 Contacts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="campaign-status">
                <Progress percentage={70} type="linear" color={"bg--info"} />
                <div className="row align-items-center mt-3">
                  <div className="col-6">
                    <div className="campaign-status-wrapper">
                      <span className="campaign-status-dots flex-shrink-0 bg--info"></span>
                      <div className="campaign-status-content">
                        <p>
                          <span className="text-info  me-1">Delivered</span> 70%
                        </p>
                        <p>235 Contacts</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="campaign-status-wrapper">
                      <span className="campaign-status-dots flex-shrink-0 bg--danger"></span>
                      <div className="campaign-status-content">
                        <p>
                          <span className="text-danger  me-1">Failed</span> 30%
                        </p>
                        <p>235 Contacts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-xl-7">
          <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1 g-4">
            {Array.from({ length: 4 }).map((_, ind) => (
              <div className="col" key={ind}>
                <Card>
                  <div className="overview-card align-items-center">
                    <div className="content">
                      <span>Total Sent</span>
                      <h4>14.5k</h4>
                    </div>

                    <div className="progress-wrapper">
                      <Progress
                        percentage={70}
                        type="circle"
                        color={`text-warning`}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-4">
          <Card cardTitle={"Top Countries"} className="h-100">
            <div className="row row-cols-xl-2 g-3 mb-4">
              <div className="col">
                <div className="country-status-card">
                  <p>Total Countries</p>
                  <h6>2105</h6>
                </div>
              </div>

              <div className="col">
                <div className="country-status-card">
                  <p>Active Countries</p>
                  <h6>75.25%</h6>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              {Array.from({ length: 4 }).map((_, ind) => (
                <Progress
                  key={ind}
                  percentage={30}
                  type="linear"
                  flagUrl={usaImg}
                  countryName={"Canada"}
                  color={"bg--warning-light"}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="col-xl-8">
          <Card>
            <CardHeader cardTitle={"Your Audience Growth"} />
            <CardBody>
              <ChartWrapper
                options={audienceGrowth}
                series={audienceGrowth.series}
                type="line"
                height="380"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportOverview;
