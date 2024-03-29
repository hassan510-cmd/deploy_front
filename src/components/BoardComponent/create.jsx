import axios from 'axios'
import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import Header from '../HeaderComponent/Header'
import Mainboard from '../Mainboard'
import Profile from "../ProfileComponent/Profile";
import "./assets/css/bootstrap.min.css"
import "./assets/css/main.css"


export default class CreateBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board_name: '',
            is_public: false,
            redirect_flag:false
        }
    }


    HandleBoradInputs = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })

    }
    HandleBoradCheck = (e) => {
        console.log(!e.target.checked)
        this.setState({
            [e.target.name]:e.target.checked
        })

    }

    HandleAddBorad=(e)=>{
        e.preventDefault()
        var send_data = {
            name:this.state.board_name,
            is_public:!this.state.is_public
        }

        axios.post("/boards/api/v1/boards/",send_data, 
            { headers: {"Authorization" : localStorage.getItem("Token")} }).then((response)=>{
            console.log(response)
            
            this.setState({
                redirect_flag:true
            })
            // {this.state.redirect_flag ? <Redirect to="/dashboard" /> : <MainPage />}
        })
        console.log(send_data)
        
    }
    

    render() {
        if (!this.state.redirect_flag){  
        return (
            <div>
              
                <Header/>
                    <div className='borad-container container'>
                        <h1 className='text-center'>Create board</h1>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                            <input onChange={this.HandleBoradInputs}  
                                    className="form-control" 
                                    name='board_name'  
                                    placeholder='Like "Places to Go" or "Recipes to Make"' />
                        </div>
                        <form onSubmit={this.HandleAddBorad}>
                            <div className="board-actions">
                                <div>
                                    <div className="form-check">
                                        <input onChange={this.HandleBoradCheck} 
                                                name='is_public' 
                                                className="form-check-input" 
                                                type="checkbox"   />
                                        <div className="d-flex flex-column">
                                            <label  className="form-check-label fw-bold" 
                                                    for="flexCheckDefault">keep this board secret</label>
                                            <label className='text-muted'>so only you and collaborators</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='btn btn-light'>
                                        create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
    else{
       return <Profile/>
    }
    }
}
