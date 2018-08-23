// import { get } from "@utils/apiUtils";
import { isUndefined, isEmpty } from "@utils/core";
// import apiConfig from "./api.config";

const getLabel = value => {
	if (isUndefined(value)) return "";
	return value > 60 ? `${(value / 60).toFixed(2)} min` : `${value} sec`;
};

const pitchParser = (length, pace) => {
	const result = { pitchLength: {}, pitchPace: {} };
	if (!isEmpty(length))
		result.pitchLength = {
			average: length.averageLength,
			current: length.contentLength,
			expected: length.targetLength,
			averageLabel: getLabel(length.averageLength),
			currentLabel: getLabel(length.contentLength),
			expectedLabel: getLabel(length.targetLength)
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
		return Promise.resolve({
			length: {
				averageLength: 30,
				contentLength: 15,
				targetLength: 90
			},
			pace: {
				averagePace: 4.761904761904763,
				contentPace: 4.761904761904763,
				industryPace: 2.5
			}
		}).then(({ length, pace } = {}) => {
			setState({
				...state,
				pitch: { isLoading: false, data: pitchParser(length, pace) }
			});
		});
		// return get(apiConfig.getPitchData(state.app)).then(
		// 	response => {
		// 		const { length = {}, pace = {} } = response;
		
		// 		setState({
		// 			...state,
		// 			pitch: { isLoading: false, data:pitchParser(length, pace) }
		// 		});
		// 	},
		// 	error => {
		// 		setState({
		// 			...state,
		// 			pitch: { isLoading: false, error: error }
		// 		});
		// 	}
		// );
	}
});

export default actions;
