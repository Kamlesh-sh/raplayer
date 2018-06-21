import { h, Component } from "preact";
import { actions } from "../../actions";
import { namespaceConnect } from "@utils/enhancer";
import style from "./index.scss";
import filterImage from "images/filter.svg";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import { track } from "@api/api";
import trackEvents from "@config/trackEvents";

class FilterContainer extends Component {
	constructor(props) {
		super(props);
		this.onOptionsChangedHandler = this.onOptionsChangedHandler.bind(this);
		this.getOptionsFromEvalParams = this.getOptionsFromEvalParams.bind(this);
		this.onFilterClickHandler = this.onFilterClickHandler.bind(this);
		this.hideFilters = this.hideFilters.bind(this);
		this.state = {
			showFilters: false,
		};
	}

	onOptionsChangedHandler({ selectedOptions, option, selected }) {
		if (selected) {
			track(trackEvents.SEARCH_IN_TRANSCRIPTION, {
				evaluation_parameter_name: option.label,
				source: 'filter'
			});
		}
		let selectedEvalParamIds = selectedOptions.map(option => option.value);
		let selectedEvalParams = this.props.evalParams.filter(evalParam => selectedEvalParamIds.includes(evalParam.evalParamId))
		this.props.updateTranscriptionSearchWords({ selectedEvalParams });
	}

	getOptionsFromEvalParams(evalParams) {
		let options = evalParams.map((evalParam) => {
			return { label: evalParam.evalParam.name, value: evalParam.evalParamId }
		});
		return options;
	}

	onFilterClickHandler() {
		this.setState({ showFilters: !this.state.showFilters });
	}

	hideFilters() {
		this.setState({ showFilters: false });
	}

	render() {
		let dropdownOptions = this.getOptionsFromEvalParams(this.props.evalParams);
		let selectedOptions = this.getOptionsFromEvalParams(this.props.selectedEvalParams);
		return (
			<div className={style.selectFilter} onBlur={this.hideFilters} tabIndex="0">
				<div className={[selectedOptions.length > 0 ? style.counter : style.hide].join(" ")}>{selectedOptions.length}</div>
				<div className={style.filterIconHolder} onClick={this.onFilterClickHandler}>
					<img src={filterImage} style="height:18px;" />
				</div>
				<div className={[!this.state.showFilters ? style.hide : null].join(" ")} style="width:300px;">
					<MultiSelectDropdown
						options={dropdownOptions}
						selectedOptions={selectedOptions}
						onOptionsChangedHandler={this.onOptionsChangedHandler}
					/>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		evalParams: state.transcriptionPane.filter.evaluationParameters,
		selectedEvalParams: state.transcriptionPane.filter.selectedEvalParams
	};
}

export default namespaceConnect(mapStateToProps, actions)(FilterContainer);
