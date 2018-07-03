import { h, Component } from "preact";
import { actions } from "../../actions";
import { namespaceConnect } from "@utils/enhancer";
import TranscriptionSearchContainer from "@containers/TranscriptionSearchContainer";
import TranscriptionFilterContainer from "@containers/TranscriptionFilterContainer";
import CommentPane from "@components/CommentPane";
import style from "./index.scss";
import {
	TIMESTAMPED_TRANSCRIPT_DIV_ID_PREFIX,
	STRING_TRANSCRIPTION_NOT_ENABLED,
	STRING_TRANSCRIPTION_FAILED,
	STRING_TRANSCRIPTION_IN_PROGRESS,
	STRING_FETCHING_TRANSCRIPTION_DATA,
	STRING_FETCHING_TRANSCRIPTION_DATA_FAILED
} from "@config/constants";
import event from "@config/trackEvents";
import { track } from "@api/api";


class TranscriptionContainer extends Component {
	constructor(props) {
		super(props);
		this.onTranscriptionCardClickHandler = this.onTranscriptionCardClickHandler.bind(this);
	}

	componentDidMount() {
		this.props.getTranscriptionData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentMatchNumber != this.props.currentMatchNumber && nextProps.currentMatchNumber > 0) {
			let transcriptIndex = nextProps.matchedTranscriptIndices[nextProps.currentMatchNumber - 1];
			let elementId = "#" + TIMESTAMPED_TRANSCRIPT_DIV_ID_PREFIX + this.props.searchedTranscripts[transcriptIndex].id;
			let elem = this.base.querySelector(elementId);
			elem.scrollIntoViewIfNeeded();
		}
	}

	onTranscriptionCardClickHandler(cardObj) {
		let videoElem;
		videoElem = document.getElementById(this.props.targetPlayerId);
		videoElem.currentTime = cardObj.time;
		videoElem = document.getElementById(this.props.secondaryTargetPlayerId);
		if(videoElem){
			videoElem.currentTime = cardObj.time;
		}
		track(event.TRANSCRIPTION_CARD_CLICKED, {});
	}

	render() {
		const { loading, error, transcriptionStatus} = this.props;
		return (
			<div className={style.heightCalcTranscription}>
				<div className={[style.rightContainor, !loading && !error ? style.show : style.hide].join(" ")} >
					<div className={[transcriptionStatus == "SUCCESS" ? style.show : style.hide].join(" ")}>
						<div className={style.transcriptionSearch}>
							<TranscriptionSearchContainer
								namespace={this.props.namespace}
							/>
							<TranscriptionFilterContainer
								namespace={this.props.namespace}
							/>
							<div className={style.clear} />
						</div>
						<div className={[this.props.searchWords.length == 0 ? style.heightCalcComment : style.heightCalcTagAdded].join(" ")}>
							<CommentPane
								comments={this.props.searchedTranscripts}
								targetPlayerId={this.props.targetPlayerId}
								commentDivIdPrefix={TIMESTAMPED_TRANSCRIPT_DIV_ID_PREFIX}
								onPaneCardClickHandler={this.onTranscriptionCardClickHandler}
							/>
						</div>
					</div>
					<div className={[transcriptionStatus == "NOT_ENABLED" ? style.show : style.hide].join(" ")} >
						{STRING_TRANSCRIPTION_NOT_ENABLED}
					</div>
					<div className={[transcriptionStatus == "FAILED" ? style.show : style.hide].join(" ")} >
						<div className={[style.textalignC, style.F18, style.color66].join(" ")}>
							<div className={style.transcriptionfailed} />
							<div className={style.transcriptionFailedMessage} dangerouslySetInnerHTML={{__html: STRING_TRANSCRIPTION_FAILED}} />
						</div>
					</div>
					<div className={[transcriptionStatus == "STARTED" || transcriptionStatus == "NOT_STARTED" ? style.show : style.hide].join(" ")} >
						<div className={style.transcriptionOnItsWay}>
							<div className={[style.transcription_truck, style.marginT120, style.display_IB].join(" ")} />
							<div className={style.transcriptionProgressMessage}>{STRING_TRANSCRIPTION_IN_PROGRESS}</div>
						</div>
					</div>
				</div>
				<div className={[style.rightContainor, loading ? style.show : style.hide].join(" ")} >
					{STRING_FETCHING_TRANSCRIPTION_DATA}
				</div>
				<div className={[style.rightContainor, !loading && error ? style.show : style.hide].join(" ")} >
					{STRING_FETCHING_TRANSCRIPTION_DATA_FAILED}
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		searchedTranscripts: state.transcriptionPane.searchedTranscripts,
		matchedTranscriptIndices: state.transcriptionPane.matchedTranscriptIndices,
		currentMatchNumber: state.transcriptionPane.searchBar.currentMatchNumber,
		searchWords: state.transcriptionPane.searchBar.searchWords,
		transcriptionStatus: state.transcriptionPane.transcriptionStatus,
		loading: state.transcriptionPane.loading,
		error: state.transcriptionPane.error
	};
}

export default namespaceConnect(mapStateToProps, actions)(TranscriptionContainer);
