import { h, Component } from "preact";
import Highcharts from "highcharts/highcharts.js";

import { GET_CHART_CONFIG_BY_TYPE } from "./constants";

class PitchChart extends Component {
	getChartContainerId = () =>
		`${this.props.chartType}-${this.props.containerId}`;
	componentDidMount() {
		const {
			average,
			current,
			expected,
			chartType,
			expectedLabel,
			averageLabel,
			currentLabel,
			userName
		} = this.props;
		const config = GET_CHART_CONFIG_BY_TYPE({
			chartType,
			expected,
			expectedLabel,
			averageLabel,
			currentLabel,
			average,
			current,
			userName
		});
		return Highcharts.chart(this.getChartContainerId(), config);
	}
	render({ style }) {
		const id = this.getChartContainerId();
		return <div style={style} id={id} />;
	}
}
window.Highcharts = Highcharts;

export default PitchChart;
