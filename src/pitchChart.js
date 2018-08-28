import { h, render } from "preact";
import { getStore } from "./app/store";
import { Provider } from "unistore/preact";
import "promise-polyfill/src/polyfill";
import "whatwg-fetch";
import App from "./app/containers/PitchChartWrapper";

let count = 0;

// const App = ()=><div>dasdasdas</div>

class PitchChart {
	constructor(props = {}) {
		this.props = props;
	}

	setup() {
		let { targetChartContainer } = this.props;
		let namespace = "pitch_" + count++;
		let store = getStore(namespace, {
			app: this.props.app || {}
		});
		let containerEl = document.getElementById(targetChartContainer);
		if(!containerEl) return;
		try {
			this.root = render(
				<Provider store={store}>
					<App {...this.props} namespace={namespace} />
				</Provider>,
				containerEl
			);
		} catch (ex) {
			console.log(ex); //eslint-disable-line
		}
		window.store = store;
	}

	destroy() {
		let { targetChartContainer } = this.props;
		let containerEl = document.getElementById(targetChartContainer);
		if(!containerEl) return;
		render("", containerEl, this.root);
		containerEl.innerHTML = "";
		return this;
	}
}

export default PitchChart;
