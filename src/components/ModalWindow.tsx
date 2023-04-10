import { useDispatch, useSelector } from "react-redux";
import { IStore, IModal } from "../redux/types";
import { hidePost, savePost } from "../redux/action-creators/action_creators";
import { useState, useEffect } from "react";

const ModalWindow = (props: IModal) => {
	const { id, type } = props;
	const posts = useSelector((state: IStore) => state.posts);
	const dispatch = useDispatch();
	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const { userId, title, body, color } = posts[Number(id) - 1];
	useEffect(() => {
		setPostTitle(`${id}.${title}`);
		setPostBody(body);
	}, []);

	const handleCancelClick = () => {
		dispatch(hidePost());
	};

	const handleSaveClick = () => {
		dispatch(
			savePost(id, {
				userId,
				id,
				title: postTitle,
				body: postBody,
				color,
			})
		);
		dispatch(hidePost());
	};

	return (
		<div className="modal-wrapper">
			{type === "view" ? (
				<>
					<div className="modal-post">
						<h2 className="modal-post__title">{`${id}.${title}`}</h2>
						<p className="modal-post__body">body={body}</p>
					</div>
					<button className="modal-button" onClick={handleCancelClick}>
						Cancel
					</button>
				</>
			) : (
				<>
					<div className="modal-post">
						<label htmlFor="title" className="label">
							Post title:
						</label>
						<input
							type="text"
							className="modal-post__title-input"
							name="title"
							value={postTitle}
							onChange={(e) => setPostTitle(e.target.value)}
						/>
						<label htmlFor="body" className="label">
							Post text:
						</label>
						<textarea
							className="modal-post__body-textarea"
							rows={10}
							value={postBody}
							onChange={(e) => setPostBody(e.target.value)}
						/>
					</div>
					<div className="modal-footer">
						<button className="modal-button" onClick={handleCancelClick}>
							Cancel
						</button>
						<button className="modal-button" onClick={handleSaveClick}>
							Save
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ModalWindow;
