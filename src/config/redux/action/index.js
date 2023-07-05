import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../../firebase";
import { getDatabase, push, ref, set, onValue, remove } from "firebase/database";

export const actionUserName = () => (dispatch)=>{
    
    setTimeout(()=>{
        return dispatch({type:'CHANGE_USER', value:'Anjay'})
    },2000)

}

export const registerUserApi = (data) =>(dispatch) =>{
    const auth = getAuth();
    dispatch({type:'CHANGE_LOADING', value:true})
    return(
       
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
          
            dispatch({type:'CHANGE_LOADING', value:false})
            dispatch({type:'CHANGE_STATUS', value:'Berhasil Registrasi'})
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            dispatch({type:'CHANGE_LOADING', value:false})
            dispatch({type:'CHANGE_STATUS', value:`Gagal Registrasi  -${errorMessage}`})
           
            
            // ..
        })
    )
}

export const loginUserApi = (data) =>(dispatch) =>{
  
        const auth = getAuth();
        dispatch({type:'CHANGE_LOADING', value:true})
        return(
           
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
              
                const userData ={
                    email:userCredential.user.email,
                    uid:userCredential.user.uid,
                    emailVerified:userCredential.user.emailVerified,
                    refreshToken: userCredential.user.refreshToken
                
                }
    
                dispatch({type:'CHANGE_LOADING', value:false})
                dispatch({type:'CHANGE_STATUS', value:'Berhasil Login'})
                dispatch({type:'CHANGE_ISLOGIN', value:true})
                dispatch({type:'CHANGE_USER', value:userData})
               
                return userData
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                dispatch({type:'CHANGE_LOADING', value:false})
                dispatch({type:'CHANGE_STATUS', value:`Gagal Login  -${errorMessage}`})
                dispatch({type:'CHANGE_ISLOGIN', value:false})
               
                return false
                // ..
            })
        )
        
    

}

export const addDataToAPI = (data)=> (dispatch)=>{
    const db = getDatabase()
    push(ref(db, 'notes/' + data.userId), {
        title:data.title,
        content:data.content,
        date:data.date
      });
}

export const getDataFromAPI = (userId) => (dispatch) =>{
    const db = getDatabase();
    const urlNotes = ref(db, 'notes/' + userId );
    onValue(urlNotes, (snapshot) => {
    const data = snapshot.val();
    
    const dataArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      }));
    dispatch({type:'SET_NOTES',value:dataArray})
   
    return data
    });
}

export const updateDataToAPI = (data)=> (dispatch)=>{
    const db = getDatabase()
    set(ref(db, `notes/${data.userId}/${data.noteId}`), {
        title:data.title,
        content:data.content,
        date:data.date
      }).then(() => {
        return true
      })
      .catch((error) => {
        // Handle errors appropriately
        console.log("Error updating data to API:", error);
        return false
      });;
}

export const deleteDataToAPI = (data)=> (dispatch)=>{
    const db = getDatabase()
    remove(ref(db, `notes/${data.userId}/${data.noteId}`)).then(() => {
        return true
      })
      .catch((error) => {
        // Handle errors appropriately
        console.log("Error updating data to API:", error);
        return false
      });;
}