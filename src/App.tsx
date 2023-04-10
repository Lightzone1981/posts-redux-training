import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { getPosts, getMorePosts, changePostsSize } from './redux/action-creators/action_creators';
import Post from './components/Post';
import './App.css';
import { useEffect, useRef } from 'react';
import { IStore, IPost, IModal } from './redux/types';
import ModalWindow from './components/ModalWindow';

function App() {

  const dispatch = useDispatch();
  const URL = 'https://jsonplaceholder.typicode.com/posts'
  
  async function getAllPosts() {
    try {
      const res = await fetch(URL)
      const data = await res.json()
      dispatch(getPosts(data));
    } catch (error) {
      alert(error)
    }
  }
  
  useEffect(() => {
    getAllPosts()
  }, [])
  
  const posts = useSelector((state: IStore) => state.posts);
  const postsCount = useSelector((state: IStore) => state.visiblePostsCount);
  const postsSize = useSelector((state: IStore) => state.postsSize);
  const showPost = useSelector((state: IStore) => state.showPost);
  const editPost = useSelector((state: IStore) => state.editPost);
  const container = useRef<any>()

  const scrollDown = () => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

  const handleShowMoreClick = ()=>{
    dispatch(getMorePosts())
    scrollDown()
  }

  const handleChangePostsSize = ()=>{
    dispatch(changePostsSize())
    scrollDown()
  }

  return (
    <>
    <div className="wrapper">
      <header className="header">
        <h1 className="main-title">Posts template</h1>
        <button className="card-size-button" onClick={handleChangePostsSize}>{postsSize==='small'? `Make big cards`:`Make small cards`}</button>
      </header>  
      
      <div className="posts-grid-container" ref={container } data-postsize={postsSize}>
        {posts.length?
          posts.map((el: IPost, index: number) =>{
            if(index<postsCount) 
            return <Post key={index} id={el.id} userId={el.userId} title={el.title} body={el.body} color={el.color} />})
        :<p className="loader">
          loading...</p>
        }
      </div>
      <footer className="main-footer">
        {postsCount < posts.length? <button className="show-more-button" onClick={handleShowMoreClick}>Show more</button>:<></> }
      </footer>
    </div>
      {showPost? <ModalWindow id={showPost} type='view' />: <></>}
      {editPost? <ModalWindow id={editPost} type='edit' />: <></>}
    </>
  );
}

export default App;
