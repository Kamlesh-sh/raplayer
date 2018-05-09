import { h, Component } from "preact";
import style from "./index.scss";
class SearchNavigationBar extends Component {
	constructor(props) {
		super(props);
		this.onUpClicked = this.onUpClicked.bind(this);
		this.onDownClicked = this.onDownClicked.bind(this);
		this.state = {
			currentMatchNumber: 1
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentMatchNumber != this.state.currentMatchNumber) {
			this.setState({ currentMatchNumber: nextProps.currentMatchNumber });
		}
	}

	onUpClicked() {
		if (this.state.currentMatchNumber < this.props.numberOfMatches) {
			this.setState({ currentMatchNumber: this.state.currentMatchNumber + 1 });
		}
		this.props.navigateToMatchHandler(this.state.currentMatchNumber)
	}

	onDownClicked() {
		if (this.state.currentMatchNumber > 1) {
			this.setState({ currentMatchNumber: this.state.currentMatchNumber - 1 });
		}
		this.props.navigateToMatchHandler(this.state.currentMatchNumber)
	}

	render() {
		return (
			<div className={style.searchNavBar}>
				<div className={style.resultRelatedText}>
					<div style={this.props.numberOfMatches > 0 ? { display: 'none' } : null}>No match found</div>
					<div style={this.props.numberOfMatches == 0 ? { display: 'none' } : null}>
						{this.state.currentMatchNumber} of {this.props.numberOfMatches} matches
					</div>
				</div>
				<div className={style.sortingSearch} style={this.props.numberOfMatches == 0 ? { display: 'none' } : null}>
					<div className={[style.arrow, style.up].join(" ")} onClick={this.onUpClicked} />
					<div className={[style.arrow, style.down].join(" ")} onClick={this.onDownClicked} />
					<div className={style.clear} />
				</div>
				<div className={style.clear} />
			</div>
		);
	}
}

export default SearchNavigationBar;
