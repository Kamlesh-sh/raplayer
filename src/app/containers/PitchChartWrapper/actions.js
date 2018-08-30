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
		label: `${daysLabel} ${hoursLabel} ${minutesLabel} ${secondsLabel}`,
		labelDigital: `${digitalMinute}:${digitalSecond}`
	};
};

const pitchParser = (length, pace) => {
	const result = { pitchLength: {}, pitchPace: {} };
	if (!isEmpty(length))
		result.pitchLength = {
			average: length.averageLength,
			current: length.contentLength,
			expected: length.targetLength,
			averageLabel: getLabel(length.averageLength).labelDigital,
			currentLabel: getLabel(length.contentLength).label,
			expectedLabel: getLabel(length.targetLength).labelDigital
		};
	if (!isEmpty(pace))
		result.pitchPace = {
			average: pace.averagePace,
			current: pace.contentPace,
			expected: pace.industryPace,
			averageLabel: Math.round(pace.averagePace),
			currentLabel: `${Math.round(pace.contentPace)} words/min`,
			expectedLabel: Math.round(pace.industryPace)
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
		// return Promise.resolve({
		// 	length: {
		// 		averageLength: 30,
		// 		contentLength: 65,
		// 		targetLength: 65
		// 	},
		// 	pace: {
		// 		averagePace: 4.761904761904763,
		// 		contentPace: 4.761904761904763,
		// 		industryPace: 2.5
		// 	}
		// }).then(({ length, pace } = {}) => {
		// 	setState({
		// 		...state,
		// 		pitch: { isLoading: false, data: pitchParser(length, pace) }
		// 	});
		// });
		return get(apiConfig.getPitchData(state.app)).then(
			response => {
				const { length = {}, pace = {} } = response;

				setState({
					...state,
					pitch: { isLoading: false, data:pitchParser(length, pace) }
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
