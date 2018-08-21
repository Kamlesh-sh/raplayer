// import { get } from "@utils/apiUtils";
// import apiConfig from "./api.config";

let actions = () => ({
	getPitchData: (state, payload, setState) => {
		setState({
			...state,
			pitch: {
				isLoading: true
			}
		});
		return Promise.resolve({
			pitchLength: {
				current: 11,
				average: 10,
				expected: 12
			},
			pitchPace: {
				current: 11,
				average: 10,
				expected: 12
			}
		}).then((data = {}) => {
			setState({
				...state,
				pitch: { isLoading: false, data }
			});
		});
		// return get(apiConfig.getPitchData()).then(
		// 	response => {
		// 		if (!response.id) {
		// 			return {};
		// 		}
		// 	},
		// 	() => {}
		// );
	}
});

export default actions;
