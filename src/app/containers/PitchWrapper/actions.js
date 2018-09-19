import { get } from "@utils/apiUtils";
import { isUndefined, isEmpty, splitSeconds } from "@utils/core";
import apiConfig from "./api.config";

const getLabel = value => {
	if (isUndefined(value)) return "";
	const { days, hours, minutes, seconds } = splitSeconds(value);
	const daysLabel = days > 0 ? `${days} days` : "";
	const hoursLabel = hours > 0 ? `${hours} hours` : "";
	const minutesLabel = minutes > 0 ? `${minutes} min` : "";
	const secondsLabel = seconds > 0 ? `${seconds} sec` : "";
	const digitalMinute = minutes < 10 ? `0${minutes}` : minutes;
	const digitalSecond = seconds < 10 ? `0${seconds}` : seconds;
	return {
		label: `${daysLabel} ${hoursLabel} ${minutesLabel} ${secondsLabel}`.trim(),
		labelDigital: `${digitalMinute}:${digitalSecond}`.trim(	)
	};
};

const stateColorMap = {
	LENGTH: {
		1: {
			color: "#E57373",
			text: "Too Short"
		},
		2: {
			color: "#FFA421",
			text: "Short"
		}, 3: {
			color: "#58B75B",
			text: "Appropriate"
		}, 4: {
			color: "#FFA421",
			text: "Long"
		}, 5: {
			color: "#E57373",
			text: "Too Long"
		}
	},
	PACE: {
		1: {
			color: "#FFA421",
			text: "Fast"
		},
		2: {
			color: "#FFA421",
			text: "Slow"
		}, 
		3: {
			color: "#58B75B",
			text: "Appropriate"
		}
	}
}

const getState = (type, value) => {
	const state = stateColorMap[type.toUpperCase()] || {};
	return state[value]
}

const pitchParser = (length, pace) => {
	const result = { pitchLength: {}, pitchPace: {} };
	if (!isEmpty(length))
		result.pitchLength = {
			state: getState('length', length.bin),
			current: length.value,
			expected: length.target,
			currentLabel: getLabel(length.value).label,
			expectedLabel: getLabel(length.target).labelDigital
		};
	if (!isEmpty(pace))
		result.pitchPace = {
			state: getState('pace', pace.bin),
			current: pace.value,
			expected: pace.targetRange,
			currentLabel: `${Math.round(pace.value)} words/min`,
			expectedLabel: `${pace.targetRange.join(" - ")}WPM`
		};
	return result;
};

let actions = () => ({
	getPitchData: (state, payload, setState) => {
		setState({
			...state,
			pitch: {
				isLoading: true
			}
		});
		// return Promise.resolve({"length":{"bin":5,"value":324,"target":120},"pace":{"bin":3,"value":168,"targetRange":[120,160]}}).then(({ length, pace } = {}) => {
		// 	setState({
		// 		...state,
		// 		pitch: { isLoading: false, data: pitchParser(length||{}, pace||{}) }
		// 	});
		// });


			return get(apiConfig.getPitchData(state.app)).then(
				response => {
					const { length = {}, pace = {} } = response;

					setState({
						...state,
						pitch: { isLoading: false, data: pitchParser(length||{}, pace||{}) }
					});
				},
				error => {
					setState({
						...state,
						pitch: { isLoading: false, error: error }
					});
				}
			);
		
	}
});

export default actions;
