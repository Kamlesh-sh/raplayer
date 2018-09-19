let apiUrls = {
	getPitchData({ cname, subjectId, entityId }) {
		return {
			url: `/${cname}/entity/${entityId}/${subjectId}/pace_and_length`
		};
	}
};

export default apiUrls;

