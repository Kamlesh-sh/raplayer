import { h, Component } from "preact";
import style from "./index.scss";
import { actions } from "../../actions";
import { toHHMMSS, getColorMap, parseText, insertAtCursor } from "@utils/core";
import { namespaceConnect } from "@utils/enhancer";
import { ConfirmAlert } from "@components/ConfirmAlertBox";
import {
	STRING_DELETE_COMMENT,
	STRING_DELETED_COMMENT_CANT_BE_RESTORED,
	STRING_DELETE,
	STRING_CANCEL,
	MAX_CHAR_LIMIT_COMMENT
} from "@config/constants";
import EmojiPicker from "@components/EmojiPicker";
import Loader from "@components/Loader";

class CommentBox extends Component {
	constructor() {
		super();
		this.textAreaChangeHandler = this.textAreaChangeHandler.bind(this);
		this.editClickHandler = this.editClickHandler.bind(this);
		this.deleteClickHandler = this.deleteClickHandler.bind(this);
		this.closeSelf = this.closeSelf.bind(this);
		this.emojiOnSelectHandler = this.emojiOnSelectHandler.bind(this);
		this.postCommentHandler = this.postCommentHandler.bind(this);
		let intialState = {
			disableSaveButton: true,
			isSubmitting: false
		};
		this.setState(intialState);
	}
	emojiOnSelectHandler(selectedEmoji) {
		if (this.commentTextArea.value.length < MAX_CHAR_LIMIT_COMMENT) {
			insertAtCursor(this.commentTextArea, selectedEmoji);
			let text = this.commentTextArea.value;
			this.props.showCommentBox({
				text
			});
			this.commentTextArea.focus();
			this.setState({
				disableSaveButton: false
			});
		}
	}

	textAreaChangeHandler(e) {
		let text = e.target.value;
		text = text && text.trim();
		this.setState({
			disableSaveButton: text ? false : true
		});
		this.props.showCommentBox({
			text: e.target.value
		});
	}

	closeSelf() {
		this.props.hideCommentBox();
	}

	editClickHandler() {
		this.props.showCommentBox({
			readOnly: false
		});
		this.setState({
			disableSaveButton: false
		});
		this.commentTextArea.addEventListener(
			"keydown",
			this.autosize.bind(this)
		);
		this.commentTextArea.focus();
	}

	componentDidMount() {
		this.autosize();
		if (!this.props.readOnly) {
			this.commentTextArea.addEventListener(
				"keydown",
				this.autosize.bind(this)
			);
			this.commentTextArea.focus();
		}
	}

	deleteClickHandler(event) {
		event.stopPropagation();
		let props = this.props;
		ConfirmAlert({
			title: STRING_DELETE_COMMENT,
			message: STRING_DELETED_COMMENT_CANT_BE_RESTORED,
			confirmLabel: STRING_DELETE,
			cancelLabel: STRING_CANCEL,
			popupSelector: this.props.popupSelector,
			onConfirm: () => {
				this.props.deleteComment({
					commentObj: props,
					isCommentBox: true
				});
				this.props.hideCommentBox();
			},
			onCancel: () => {}
		});
	}

	postCommentHandler() {
		if (this.state.disableSaveButton) {
			return;
		}
		let text =
			this.commentTextArea.value && this.commentTextArea.value.trim();
		if (!text) {
			return;
		}
		this.setState({
			disableSaveButton: true
		});
		this.setState({
			isSubmitting: true
		});
		if (this.props.id) {
			this.props.editComment({
				commentObj: {
					id: this.props.id,
					text: text,
					time: this.props.time
				},
				isCommentBox: true
			});
			return;
		}

		this.props.postComment({
			text,
			time: this.props.time
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.showError) {
			clearTimeout(this.timer);
			this.setState({
				disableSaveButton: false,
				isSubmitting: false
			});
			this.timer = setTimeout(() => {
				this.props.hideCommentBoxError();
			}, 3000);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
		this.commentTextArea.removeEventListener("keydown", this.autosize);
	}

	autosize() {
		let el = this.commentTextArea;
		if (!el) {
			return;
		}
		setTimeout(function() {
			el.style.cssText = "height:auto; padding:0";
			el.style.cssText = "height:" + el.scrollHeight + "px";
		}, 0);
	}

	commentDidUpdate() {
		this.autosize();
	}

	shouldComponentUpdate(nextProps, nextState) {
		let {
			xPos,
			time,
			commentText,
			readOnly,
			downArrowXPos,
			edit,
			showError,
			author,
			fullScreen
		} = this.props;
		let { isSubmitting, disableSaveButton } = this.state;
		if (
			xPos !== nextProps.xPos ||
			time !== nextProps.time ||
			commentText !== nextProps.commentText ||
			readOnly !== nextProps.readOnly ||
			downArrowXPos !== nextProps.downArrowXPos ||
			edit !== nextProps.edit ||
			showError !== nextProps.showError ||
			author !== nextProps.author ||
			fullScreen !== nextProps.fullScreen ||
			isSubmitting !== nextState.isSubmitting ||
			disableSaveButton !== nextState.disableSaveButton
		) {
			return true;
		}

		return false;
	}

	render(
		{
			xPos,
			time,
			commentText,
			readOnly,
			downArrowXPos,
			edit,
			showError,
			author,
			fullScreen
		},
		{ disableSaveButton, isSubmitting }
	) {
		let divStyle = {
				left: xPos
			},
			timestampReadable = toHHMMSS(time),
			downArrowStyle,
			timeStampColor;
		var opts = {};
		if (readOnly) {
			opts["readOnly"] = "readOnly";
		}
		if (downArrowXPos) {
			downArrowStyle = {
				left: downArrowXPos + "px"
			};
		}
		let colorMap = getColorMap();
		if (author && author.id && colorMap[author.id]) {
			timeStampColor = {
				backgroundColor: colorMap[author.id]
			};
		}
		if (fullScreen) {
			divStyle.position = "fixed !important";
		}

		return (
			<div style={divStyle} className={style.acBox}>
				<div className={style.downArrow} style={downArrowStyle} />
				<div className={style.acBoxContent}>
					<div className={style.acBoxContentInfo}>
						<span className={style.time} style={timeStampColor}>
							{timestampReadable}
						</span>
					</div>
					{edit &&
						this.props.id &&
						disableSaveButton && (
							<div className={style.acControlTopRight}>
								<span
									onClick={this.editClickHandler}
									title="edit"
									className={style.edit}
								/>
								<span
									onClick={this.deleteClickHandler}
									title="delete"
									className={style.delete}
								/>
							</div>
						)}
					<textarea
						className={style.acBoxText}
						onChange={this.textAreaChangeHandler}
						onKeyUp={this.textAreaChangeHandler}
						maxlength={MAX_CHAR_LIMIT_COMMENT}
						{...opts}
						rows="1"
						ref={input => {
							this.commentTextArea = input;
						}}
						value={parseText(commentText)}
					/>
					<div
						className={
							style.acBoxControls +
							" " +
							(readOnly ? style.hide : style.show)
						}
					>
						<EmojiPicker
							toLeft="true"
							onSelect={this.emojiOnSelectHandler}
						/>
						{!isSubmitting && (
							<span
								title="save"
								className={[
									style.acActionButton,
									style.save,
									disableSaveButton ? style.disable : ""
								].join(" ")}
								onClick={this.postCommentHandler}
							/>
						)}
						{isSubmitting && <Loader />}
						<span
							title="discard"
							className={[
								style.acActionButton,
								style.cancel
							].join(" ")}
							onClick={this.closeSelf}
						/>
					</div>
					{showError && (
						<div className={[style.error, style.floatR].join(" ")}>
							Something went wrong.Please try again..
						</div>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		xPos: state.commentBox.data.xPos,
		time: state.commentBox.data.time,
		author: state.commentBox.data.author,
		commentText: state.commentBox.data.text,
		readOnly: state.commentBox.data.readOnly,
		id: state.commentBox.data.id,
		downArrowXPos: state.commentBox.data.downArrowXPos,
		showError: state.commentBox.error,
		fullScreen: state.media.fullScreen
	};
}

export default namespaceConnect(mapStateToProps, actions)(CommentBox);