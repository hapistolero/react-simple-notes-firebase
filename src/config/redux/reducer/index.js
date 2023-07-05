const initialState ={
    popup:false,
    islogin:false,
    isLoading:false,
    status:'',
    user:{
      
    },
    notes:[]

  }
  
  const  reducer = (state=initialState , action) =>{
    if(action.type === 'CHANGE_POPUP'){
      return{
        ...state,
        popup: action.value
      }
    }
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        isLogin: action.value
      }
    }
    if(action.type === 'CHANGE_USER'){
      return {
        ...state,
        user: action.value
      }
    }
    if(action.type === 'CHANGE_LOADING'){
      return {
        ...state,
        isLoading: action.value
      }
    }
    if(action.type === 'CHANGE_STATUS'){
      return {
        ...state,
        status: action.value
      }
    }
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        islogin: action.value
      }
    }
    if(action.type === 'SET_NOTES'){
      return {
        ...state,
        notes: action.value
      }
    }
    return state
  }

  export default  reducer