interface IPost {
	userId: string;
	id: string;
	title: string;
	body: string;
	color?: string;
}

interface IStore {
	posts: IPost[];
	visiblePostsCount: number;
	postsSize: string;
	showPost: any;
	editPost: any;
}

interface IModal {
	id: string;
	type: string;
}

export type { IPost, IStore, IModal };
