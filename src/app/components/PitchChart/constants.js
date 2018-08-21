import { deepmerge } from "@utils/core";

export const CHART_TYPE = {
    PITCH_PACE: "pace",
    PITCH_LENGTH: "length"
};

export const COMMON_HIGHCHART_CONFIG = {
    title: {
        align: "left",
        style: {
            fontWeight: "normal",
            fontSize: "12px",
            color: "#949494"
        }
    },
    subtitle: {
        align: "left",
        style: {
            fontWeight: "bold",
            fontSize: "16px",
            color: "#000000"
        }
    },
    credits: {
        enabled: false
    },
    chart: {
        borderWidth: 1,
        borderColor: "#e0e0e0"
    },
    yAxis: {
        labels: {
            enabled: false
        },
        title: {
            enabled: false
        },
        lineWidth: 1,
        lineColor: "#b1b1b1",
        gridLineWidth: 0
    },
    exporting: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    legend: {
        align: "left",
        itemDistance: 5,
        itemStyle: {
            fontSize: "10px",
            fontWeight: "normal",
            cursor: "default"
        }
    },
    plotOptions: {
        series: {
            states: {
                hover: {
                    enabled: false
                }
            },
            label: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: true,
                formatter: function () {
                    if (this.x == 3) return this.point.label;
                }
            },
            events: {
                legendItemClick: function () {
                    return false;
                }
            },
            allowPointSelect: false
        },
        line: {
            dashStyle: "dash"
        },
        bar: {
            pointWidth: 20
        }
    }
};

const HIGHCHART_CONSTANT_BY_CHART_TYPE = ({
	chartType,
    userName,
    average,
    current,
    expected,
    averageLabel,
    expectedLabel,
    currentLabel
}) => {
    const highchartConstants = {};
    highchartConstants.subtitle = currentLabel;
    highchartConstants.average = {
        label: averageLabel,
        seriesName: "Avg for this submission",
        value: average
    };
    highchartConstants.expected = {
        label: expectedLabel,
        seriesName: "Expected length of submission",
        value: expected
    };
    highchartConstants.current = {
        label: currentLabel,
        value: current,
        seriesName: "Learner"
    };
    switch (chartType) {
        case CHART_TYPE.PITCH_PACE:
            highchartConstants.title = `PITCH PACE OF ${userName}`;
            highchartConstants.xAxis = {
                category: "Length"
            }
            break;
        case CHART_TYPE.PITCH_LENGTH:
            highchartConstants.title = `LENGTH OF SUBMISSION OF ${userName}`;
            highchartConstants.xAxis = {
                category: "Pace"
            }
            break;
    }
    return highchartConstants;
};

const GET_LINE_CHART_DATA = ({ value, label }) => {
    const result = [];
    for (let i = 0; i < 10; i++) {
        result.push({
            y: value,
            label: label
        });
    }
    return result;
};

export const GET_CHART_CONFIG_BY_TYPE = params => {
    const highchartConstants = HIGHCHART_CONSTANT_BY_CHART_TYPE(params);

    const config = {
        title: {
            text: highchartConstants.title
        },
        subtitle: {
            text: highchartConstants.subtitle
        },
        xAxis: [
            {
                categories: [highchartConstants.xAxis.category],
                tickWidth: 0,
                lineColor: "#b1b1b1",
                labels: {
                    style: {
                        color: "#000000"
                    }
                }
            },
            {
                opposite: true,
                visible: false
            }
        ],
        series: [
            {
                name: highchartConstants.average.seriesName,
                color: "#82c984",
                data: [],
                legendIndex: 1,
                type: "bar"
            },
            {
                name: highchartConstants.current.seriesName,
                type: "bar",
                xAxis: 0,
                color: "#ffa800",
                legendIndex: 0,
                data: [highchartConstants.current.value]
            },
            {
                name: highchartConstants.expected.seriesName,
                color: "#58a6ec",
                data: [],
                legendIndex: 2,
                type: "bar"
            },
            {
                name: highchartConstants.average.value,
                type: "line",
                showInLegend: false,
                xAxis: 1,
                color: "#82c984",
                dataLabels: {
                    align: "right",
                    color: "#82c984"
                },
                data: GET_LINE_CHART_DATA(highchartConstants.average)
            },
            {
                name: highchartConstants.expected.value,
                type: "line",
                xAxis: 1,
                showInLegend: false,
                dataLabels: {
                    align: "left",
                    color: "#58a6ec"
                },
                color: "#58a6ec",
                data: GET_LINE_CHART_DATA(highchartConstants.expected)
            }
        ]
    };
    return deepmerge(COMMON_HIGHCHART_CONFIG, config);
};
