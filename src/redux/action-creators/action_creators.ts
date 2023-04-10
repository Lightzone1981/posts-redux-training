import { GET_POSTS, GET_MORE_POSTS, CHANGE_POSTS_SIZE, CHANGE_POST_COLOR, SHOW_POST, HIDE_POST, EDIT_POST, SAVE_POST } from "../action-types/action_types";
import { IPost } from "../types";


const getPosts = (posts: IPost[]) => ({
    type: GET_POSTS,
    allPosts: {
        arr: posts,
    }
});

const getMorePosts = () => ({
    type: GET_MORE_POSTS,
});

const changePostsSize = () => ({
    type: CHANGE_POSTS_SIZE,
});

const changePostColor = (id: string) => ({
    type: CHANGE_POST_COLOR,
    changingPost: {
        id
    }
});

const showPost = (id: string) => ({
    type: SHOW_POST,
    post: {
        id
    }
});

const hidePost = () => ({
    type: HIDE_POST,
});

const editPost = (id: string) => ({
    type: EDIT_POST,
    post: {
        id
    }
});

const savePost = (id: string, post:IPost) => ({
    type: SAVE_POST,
    savingPost: {
        id,
        post
    }
});

export { getPosts, getMorePosts, changePostsSize, changePostColor, showPost, hidePost, editPost, savePost};