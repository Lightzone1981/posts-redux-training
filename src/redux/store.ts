import { createStore } from 'redux';
import todo_reducer from './reducers/posts_reducer';

export default createStore(todo_reducer);