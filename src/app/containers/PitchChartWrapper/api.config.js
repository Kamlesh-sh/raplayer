let apiUrls = {
	getPitchData({ cname, subjectId, entityId, learnerId }) {
		return {
			url: `/${cname}/social/mission?submissionId=${subjectId}&entityId=${entityId}&learnerId=${learnerId}`
		};
	}
};

export default apiUrls;