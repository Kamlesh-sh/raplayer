import { h, Component } from "preact";
import { namespaceConnect } from "@utils/enhancer";
import { isUndefined, isEmpty } from "@utils/core";
import PitchChart from "@components/PitchChart";
import actions from "./actions";

class PitchChartWrapper extends Component {
	getProps = () => {
		const { pitchLength = {}, pitchPace = {} } = this.props;
		const pitchLengthProps = {
			...pitchLength,
			chartType: "length"
		};
		const pitchPaceProps = {
			...pitchPace,
			chartType: "pace"
		};
		return {
			pitchLength: pitchLengthProps,
			pitchPace: pitchPaceProps
		};
	};
	componentDidMount() {
		this.props.getPitchData();
	}

	render({ isLoading, error, userName }) {
		if (isUndefined(isLoading) || isLoading || !isUndefined(error)) {
			return null;
		}
		const { pitchLength, pitchPace } = this.getProps();
		return (
			<div>
				{!isEmpty(this.props.pitchLength) && (
					<PitchChart
						{...pitchLength}
						userName={userName}
						style="width:324px; height:250px; float:left"
					/>
				)}
				{!isEmpty(this.props.pitchPace) && (
					<PitchChart
						{...pitchPace}
						userName={userName}
						style="width:324px; height:250px; float:right"
					/>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { data = {}, isLoading, error } = state.pitch || {};
	const { userName } = state.app;
	return {
		pitchLength: data.pitchLength,
		pitchPace: data.pitchPace,
		isLoading: isLoading,
		error: error,
		userName
	};
}

export default namespaceConnect(mapStateToProps, actions)(PitchChartWrapper);
