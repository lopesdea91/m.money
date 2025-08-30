import Highcharts, { type Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ChartContent({ options }: { options: Partial<Options> }) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        credits: {
          ...options.credits,
          enabled: false,
        },
        chart: {
          ...options.chart,
          reflow: true,
        },
        // yAxis: {
        //   min: 0,
        //   title: {
        //     text: "",
        //   },
        // },
        title: {
          ...options.chart,
          text: "",
        },
        plotOptions: {
          ...options.plotOptions,
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: [
              {
                enabled: true,
                distance: -20,
                format: "{point.percentage:.1f}%",
                style: {
                  // fontSize: "0.75em",
                  textOutline: "none",
                  opacity: 0.7,
                },
                filter: {
                  operator: ">",
                  property: "percentage",
                  value: 2,
                },
              },
            ],
          },
          column: {
            ...options.plotOptions?.column,
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: options.series,
      }}
    />
  );
}

export { ChartContent };
