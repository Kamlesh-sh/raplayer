import { h, Component } from "preact";
import style from "./index.scss";

class MultiSelectDropdown extends Component {
	constructor(props) {
		super(props);
		this.onOptionClick = this.onOptionClick.bind(this);
		this.isOptionSelected = this.isOptionSelected.bind(this);
		this.state = {
			selectedOptions: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ selectedOptions: nextProps.selectedOptions });
	}

	onOptionClick(option) {
		let selectedOptions = [...this.state.selectedOptions];
		let selected;

		if (this.isOptionSelected(option)) {
			selectedOptions = selectedOptions.filter(selectedOption => selectedOption.value != option.value);
			selected = false;
		}
		else {
			selectedOptions = [...selectedOptions, option];
			selected = true;
		}

		this.setState({ selectedOptions: selectedOptions });
		this.props.onOptionsChangedHandler({ selectedOptions: this.state.selectedOptions, option, selected });
	}

	isOptionSelected(option) {
		return this.state.selectedOptions.some(selectedOption => option.value === selectedOption.value);
	}

	render() {
		let options = this.props.options && Array.isArray(this.props.options) ? this.props.options : [];
		return (
		<div className={style.dropdownMenu}>
			<ul>
				<li>
					<div className={style.menuItemHeading}>Evaluation parameters</div>
				</li>

				{options.map(option => (
					<li onClick={() => this.onOptionClick(option)}>
						<div className={[style.checkbox, this.isOptionSelected(option) ? style.checkedbox : null].join(" ")} />
						<div className={[style.menuItem, style.ellipsis].join(" ")}>{option.label}</div>
						<div className={style.clear} />
					</li>
				))}
			</ul>
		</div>
		);
	}
}
export default MultiSelectDropdown;
