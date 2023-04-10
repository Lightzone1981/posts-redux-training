import {
	GET_POSTS,
	GET_MORE_POSTS,
	CHANGE_POSTS_SIZE,
	CHANGE_POST_COLOR,
	SHOW_POST,
	HIDE_POST,
	EDIT_POST,
	SAVE_POST,
} from "../action-types/action_types";
import { IStore, IPost } from "../types";

const initialState = {
	posts: [],
	visiblePostsCount: 3,
	postsSize: "small",
	showPost: null,
	editPost: null,
};

export default (state: IStore = initialState, action: any) => {
	switch (action.type) {
		case GET_POSTS: {
			const { arr } = action.allPosts;
			const postsWithColors = arr.map((el: IPost) => {
				return {
					...el,
					color: "#E2E45F",
				};
			});

			return {
				...state,
				posts: [...postsWithColors],
			};
		}

		case GET_MORE_POSTS: {
			let count = state.visiblePostsCount;
			count += state.postsSize === "small" ? 3 : 2;
			if (count > state.posts.length) count = state.posts.length;

			return {
				...state,
				visiblePostsCount: count,
			};
		}

		case CHANGE_POSTS_SIZE: {
			let count = state.visiblePostsCount;
			let size = state.postsSize;
			if (size === "small") {
				if (count % 2 !== 0) count = Math.floor(count / 2) * 2;
				if (count < 2) count = 2;
				size = "big";
			} else {
				size = "small";
				if (count % 3 !== 0 && count < state.posts.length)
					count = Math.floor(count / 3) * 3;
				if (count < 3) count = 3;
			}

			return {
				...state,
				visiblePostsCount: count,
				postsSize: size,
			};
		}

		case CHANGE_POST_COLOR: {
			const { id } = action.changingPost;
			const posts = state.posts.map((el: IPost) => {
				if (String(el.id) === id) {
					switch (el.color) {
						case "#E2E45F":
							el.color = "#4EAA22";
							break;
						case "#4EAA22":
							el.color = "#0E89A4";
							break;
						case "#0E89A4":
							el.color = "#E2E45F";
					}
				}
				return el;
			});
			return {
				...state,
				posts,
			};
		}

		case SHOW_POST: {
			const { id } = action.post;

			return {
				...state,
				showPost: id,
			};
		}

		case HIDE_POST: {
			return {
				...state,
				showPost: null,
				editPost: null,
			};
		}

		case EDIT_POST: {
			const { id } = action.post;

			return {
				...state,
				editPost: id,
			};
		}

		case SAVE_POST: {
			const { id, post } = action.savingPost;
			const posts = state.posts.map((el: IPost) => {
				if (String(el.id) === post.id) {
					return post;
				} else return el;
			});

			return {
				...state,
				posts,
			};
		}

		default: {
			return state;
		}
	}
};
