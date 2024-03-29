import React from 'react';
import axios from 'axios';
import './profile.css'
import IconButton from '@mui/material/IconButton';
import Model from './Pop'
import { Link } from 'react-router-dom';
import Header from '../HeaderComponent/Header';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardsDetail: [],
            boards: [],
            pins: [],
        };
    };

    componentDidMount() {
        this.update();
        window.addEventListener("resize", this.handleResize);

        axios.get("/users/user-details/",
            { headers: { "Authorization": localStorage.getItem("Token") } })
            .then((response) => {
                this.setState({ boardsDetail: response.data.data })
            })


        axios.get("/pins/api/v1/user/boards/pins/",
            { headers: { "Authorization": localStorage.getItem("Token") } })
            .then((response) => {
                const boardss = Object.values(response.data);
                let details = [];
                details.push(boardss)
                let data = details[0];
                this.setState({ boards: data },()=>{console.log(`after set state ${this.state.boards}`)})

            })
    }
    returnImage = (image) => {
        if (image) {
            return `${image}`
        }
        return "https://images.unsplash.com/photo-1637439011095-8bd0bebc7223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"

    }

    update = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };
    renderPins(pins) {
        console.log("here is pins "+pins)
        if (pins && pins.length >= 3 ) {
            console.log("pin in if condition")
            return (
                <div className='parent' >
                    <div className=' pin1'>
                        <img className='img-fluid'
                            style={boardImg}
                            src={this.returnImage(pins[0].attachment)}
                        />
                    </div>
                    <div className=' pin2'>
                        <img className='img-fluid'
                            style={boardImg}
                            src={this.returnImage(pins[1].attachment)}
                        />
                    </div>
                    <div className=' pin3'>
                        <img className='img-fluid'
                            style={boardImg}
                            src={this.returnImage(pins[2].attachment)}

                        />
                    </div>

                </div>
            )
        } else {
            console.log("enter else ")
            return (
                <div className='parent' >
                    <div className=' pin1'>
                        <img className='img-fluid'
                            style={boardImg}
                            src="https://images.unsplash.com/photo-1637439011095-8bd0bebc7223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                        />
                    </div>
                    <div className=' pin2'>
                        <img className='img-fluid'
                            style={boardImg}
                            src="https://images.unsplash.com/photo-1637439011095-8bd0bebc7223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                        />
                    </div>
                    <div className=' pin3'>
                        <img className='img-fluid'
                            style={boardImg}
                            src="https://images.unsplash.com/photo-1637439011095-8bd0bebc7223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                        />                              </div>

                </div>
            )
        }
    }
    render() {
        const personData = this.state.boardsDetail;
        const windowWidth = this.state.width;
        return <div>
            <Header />

            <div className='container'>
                <div className='row '>
                    <Link to='/new-board' className='AddButton'>
                        <i class="fas fa-plus"></i>
                    </Link>

                    <div className='col-12 m-auto text-center d-flex justify-content-center align-items-center'>

                        <div className='mt-2' >
                            {personData.cover_image ? (
                                <div style={{
                                    width: '800px',
                                    minHeight: '250px',
                                    borderRadius: '24px',
                                    backgroundImage: `url(${personData.cover_image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }} ></div>
                            ) :
                                (
                                    <div style={{
                                        width: '800px',
                                        minHeight: '250px',
                                        borderRadius: '24px',
                                        backgroundImage: `url(https://logos-world.net/wp-content/uploads/2020/09/Pinterest-Logo.png)`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }} >

                                    </div>
                                )}
                            {personData.profile_image ? (
                                <img className='profileImg' 
                                    src={personData.profile_image}
                                />
                            ) :
                                (
                                    <img className='profileImg' 
                                        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png'
                                    />
                                )}
                            <h2 className='mt-5' style={{ fontWeight: '700' }}>{personData.username}</h2>
                            <span >@{personData.username}</span>
                            <span style={{ display: 'block' }}>{personData.bio}</span>
                        </div>


                    </div>
                    <div className='col-12 text-center mb-5'>
                        <Model />
                        <IconButton className={"MyCustomButton"}>
                            <div style={Home} >
                                <Link to="/edit-profile" className="ProfileIcons">Edit Profile</Link>
                            </div>
                        </IconButton>
                    </div>

                    {this.state.boards.map((details, key) => {
                        console.log(`details here from map board ${details}`)
                        return <Link key={key} to={'/board-details/' + details.id}
                            className='col-xxl-3 .col-lg-4 col-md-4 col-sm-8 col-12   board '
                            style={{ textDecoration: 'none', color: '#000' }} >
                            {this.renderPins(details.pins)}
                            <h6 >{details.name}</h6>
                            <span >{details.pins.length + " Pins"}</span>
                        </Link>

                    })}

                </div>
            </div>
        </div>;
    }
}

export default Profile;


const boardImg = {
    cursor: 'pointer !important'
}

const Home = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '100px'
};





