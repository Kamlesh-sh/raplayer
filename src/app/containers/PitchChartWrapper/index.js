import { h, Component } from "preact";
import { namespaceConnect } from "@utils/enhancer";
import { isUndefined } from "@utils/core";
import PitchChart from "@components/PitchChart";
import actions from "./actions";

class PitchChartWrapper extends Component {
	getProps = () => {
		const { pitchLength = {}, pitchPace = {} } = this.props;
		const pitchLengthProps = {
			current: pitchLength.current,
			average: pitchLength.average,
			expected: pitchLength.expected,
			chartType: "pace"
		};
		const pitchPaceProps = {
			current: pitchPace.current,
			average: pitchPace.average,
			expected: pitchPace.expected,
			chartType: "length"
		};
		return {
			pitchLength: pitchLengthProps,
			pitchPace: pitchPaceProps
		};
	};
	componentDidMount() {
		this.props.getPitchData();
	}

	render({ isLoading }) {
		if (isUndefined(isLoading) || isLoading) {
			return null;
		}
		const { pitchLength, pitchPace } = this.getProps();
		return (
			<div>
				<PitchChart {...pitchLength} style="width:325px; height:200px; float:left" />
				<PitchChart {...pitchPace} style="width:325px; height:200px; float:right" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {data={}, isLoading} = state.pitch || {};
	return {
		pitchLength: data.pitchLength,
		pitchPace: data.pitchPace,
		isLoading: isLoading
	};
}

export default namespaceConnect(mapStateToProps, actions)(PitchChartWrapper);
