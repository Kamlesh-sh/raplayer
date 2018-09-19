import { h, Component } from "preact";
import { namespaceConnect } from "@utils/enhancer";
import { isUndefined, isEmpty } from "@utils/core";
import actions from "./actions";

import style from './index.scss';

class PitchWrapper extends Component {
	componentDidMount() {
		this.props.getPitchData();
	}

	render({ isLoading, error, pitchLength, pitchPace }) {
		if (isUndefined(isLoading) || isLoading || !isUndefined(error)) {
			return null;
		}
		const { state: pitchLengthState = {} } = pitchLength
		const { state: pitchPaceState = {} } = pitchPace
		return (
			<div className={style.videoDetailsWrapper}>
				{!isEmpty(this.props.pitchLength) && (
					<div className={style.submissionLengthBlock}>
						<div className={style.headingBlock}>
							<div className={style.iconStyle} />
							<div className={style.heading}>Submission Length:</div>
							<div style={{ "color": pitchLengthState.color }} className={style.headingText}>{pitchLengthState.text}</div>
							<div className={style.clear} />
						</div>
						<div className={style.descriptionBlock}>
							<div className={style.pitchLength}>{pitchLength.currentLabel}</div> 
							<div class={style.targetBlock}>
								<span className={style.dot} />
								<span className={style.target}>Target: {pitchLength.expectedLabel}</span>
								<div className={style.clear} />
							</div>
						</div>
					</div>
				)}
				{!isEmpty(this.props.pitchPace) && (
					<div className={style.pitchPaceBlock} >
						<div className={style.headingBlock}>
							<div className={style.iconStyle} />
							<div className={style.heading}>Pace of pitch:</div>
							<div style={{ "color": pitchPaceState.color }} className={style.headingText}>{pitchPaceState.text}</div>
							<div className={style.clear} />
						</div>
						<div className={style.descriptionBlock}>
							<div className={style.pitchLength}>{pitchPace.currentLabel}</div>
							<div class={style.targetBlock}>
								<span className={style.dot} />
								<span className={style.target}>Regular Conversation Rate: {pitchPace.expectedLabel}</span>
								<div className={style.clear} />
							</div>
							<div className={style.clear} />
						</div>
					</div>
				)}
				<div class={style.clear} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { data = {}, isLoading, error } = state.pitch || {};
	return {
		pitchLength: data.pitchLength,
		pitchPace: data.pitchPace,
		isLoading: isLoading,
		error: error
	};
}

export default namespaceConnect(mapStateToProps, actions)(PitchWrapper);
