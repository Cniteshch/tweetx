import {
    NEW_POST,
    POST_ERROR,
    LOADING,
    GET_POST,
    GET_MY_POST,
    GET_USERS,
    USERS_ERROR,
    FOLLOW,
    UNFOLLOW,
    FOLLOW_ERROR,
    FETCH_USER_DATA
} from '../actions/types';
const INITIAL_STATE = {
    loading: true,
    users: [],
    followers: [],
    followings: [],
    shouldUpdate: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case NEW_POST:
           //let selfPosts = state.myPosts.unshift(action.payload.post)
            let Allposts = state.posts
            Allposts.unshift(action.payload.post)
            console.log( Allposts, 'pos')
            return {
                ...state,
                posts: Allposts, 
                shouldUpdate : !state.shouldUpdate
            };

        case GET_MY_POST:
            return {
                ...state,
                myPosts: action.payload.posts,
                    error: false,
                    loading: false
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                    error: false
            };

        case FETCH_USER_DATA:
            return {
                ...state,
                myPosts: action.payload.posts,
                    followings: action.payload.followings,
                    followers: action.payload.followers,
                    error: false,
                    loading: false
            };

        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case FOLLOW_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case USERS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            };
        case GET_POST:
            return {
                ...state,
                posts: action.payload.posts,
                error: false,
                loading: false
            };
        case FOLLOW:
            return {
                ...state,
            };
        case UNFOLLOW:
            return {
                ...state,
            };
        default:
    }
    return state;
}