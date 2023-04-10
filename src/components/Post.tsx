import { useDispatch, useSelector } from "react-redux";
import { IPost, IStore } from "../redux/types";
import {
	changePostColor,
    showPost,
    editPost
} from "../redux/action-creators/action_creators";

const Post = ({ id, userId, title, body, color }: IPost) => {
	const dispatch = useDispatch();
	const posts = useSelector((state: IStore) => state.posts);
	const postsCount = useSelector((state: IStore) => state.visiblePostsCount);
	const postsSize = useSelector((state: IStore) => state.postsSize);

	const handleChangeColor = (e: any) => {
		dispatch(changePostColor(e.target.id));
	};

	const handleViewButton = (e: any) => {
		dispatch(showPost(e.target.id));
    };
    
    const handleEditPost = (e: any) => {
		dispatch(editPost(e.target.id));
	};

	return (
		<div className="post" id={id} style={{ backgroundColor: color }}>
			<h2 className="post__title">{`${id}. ${title}`}</h2>
			<h3 className="post__user">{`user:${userId}`}</h3>
			<p className="post__text">{body}</p>
			<footer className="post__footer">
				<button
					className="view-button"
					id={id}
					onClick={(e) => {
						handleViewButton(e);
					}}>
					View
				</button>
				<button
					className="color-button"
					id={id}
					onClick={(e) => {
						handleChangeColor(e);
					}}>
					Change Color
				</button>
				<button
					className="edit-button"
					id={id}
					onClick={(e) => {
						handleEditPost(e);
					}}>
					Edit
				</button>
			</footer>
		</div>
	);
};
export default Post;
