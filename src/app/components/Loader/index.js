import { h } from 'preact';
import style from "./index.scss";

const Loader = () => {
	return (
		<div class={style.ldsRing}>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default Loader;