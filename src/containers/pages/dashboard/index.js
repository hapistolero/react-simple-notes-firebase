import React, { Component } from "react";
import './dashboard.css'
import { addDataToAPI, deleteDataToAPI, getDataFromAPI, updateDataToAPI } from "../../../config/redux/action";
import {connect} from 'react-redux'
class Dashboard extends Component {

    state = {
        title:'',
        content:'',
        date:'',
        textButton:'simpan',
        noteId:''
        
    }

    componentDidMount = () =>{
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

  

    updateNotes = (note) =>{
        console.log(note)
        this.setState({
            title:note.title,
            content:note.content,
            textButton:'update',
            noteId:note.id
        })
       
    }

   
    handleSaveNotes = () =>{
        const {title, content, textButton, noteId}= this.state
        const {saveNotes,updateNotes} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content:content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'simpan'){
            saveNotes(data)
        }else{
            data.noteId = noteId
            updateNotes(data)
        }
       

        console.log(data)

    }

    cancelUpdate = () =>{
        this.setState({
            title:'',
            content:'',
            textButton:'simpan'
        })
    }

    onInputChange = (e,type) =>{

        this.setState({
            [type] : e.target.value

        })

    }

    deleteNotes = (e,note) =>{
        e.stopPropagation()
        const {deleteNote} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
       deleteNote(data)
    
}
    render() {
        const {content, title, date} = this.state
        const {notes} = this.props
        console.log(notes)
        return(
            <div>
                <p>Dashboard Page</p>
                <div className="form">
                    <p>tulis catatan mu</p>
                <input placeholder="title" value={this.state.title} onChange={(e)=> this.onInputChange(e,'title')}></input>
                <textarea placeholder="isikan catatan" value={this.state.content} onChange={(e)=> this.onInputChange(e,'content')}></textarea>
                <button onClick={this.handleSaveNotes}>{this.state.textButton}</button>
                {
                    this.state.textButton === 'update' ?
                    <button onClick={this.cancelUpdate}>Cancel</button>
                    : null
                }
               
                </div>

                <hr/>
                {
                    notes.length > 0 ? (
                        <>
                        {
                            notes.map((note, i=0) =>{
                                return(
                                    <div className="card" key={note.id} onClick={()=>this.updateNotes(note)}>
                                    <p>{note.title}</p>
                                    <p>{new Date(note.date).toLocaleString()}</p>
                                    <p>{note.content}</p>
                                    <button onClick={(e)=>this.deleteNotes(e,note)}>Delete</button>
                                </div>

                                )
                            })
                        }
                        </>
                    )
                    :
                    null
                }
               
                
                
            </div>
        )
    }
}

const reduxState = (state) =>({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) =>({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getNotes : (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataToAPI(data)),
    deleteNote : (data) => dispatch(deleteDataToAPI(data))
} )

export default connect(reduxState,reduxDispatch)(Dashboard)