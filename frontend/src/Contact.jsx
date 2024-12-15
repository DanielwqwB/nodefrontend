import React, { useEffect, useState } from 'react';  
import { Link, useNavigate} from 'react-router-dom';  
import { Container, Navbar, Nav, Alert } from 'react-bootstrap';  
import NavDropdown from 'react-bootstrap/NavDropdown';
import image from './assets/cross.png';  
import './Contact.css';

import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './Api';  

const styles = {  
    container: {  
        maxWidth: '600px',  
        margin: 'auto',  
        padding: '20px',  
        border: '1px solid #ccc',  
        borderRadius: '5px',  
        backgroundColor: '#f9f9f9',  
    },  
    form: {  
        display: 'flex',  
        flexDirection: 'column',  
    },  
    formGroup: {  
        marginBottom: '15px',  
    },  
    input: {  
        padding: '10px',  
        borderRadius: '4px',  
        border: '1px solid #ccc',  
        fontSize: '16px',  
    },  
    button: {  
        padding: '10px',  
        backgroundColor: '#007bff',  
        color: '#fff',  
        border: 'none',  
        borderRadius: '4px',  
        cursor: 'pointer',  
        fontSize: '16px',  
    },  
    socialLogos: {  
        marginTop: '20px',  
        display: 'flex',  
        justifyContent: 'space-around',  
    },  
    icon: {  
        width: '30px',  
        height: '30px',  
    },  
};  

function Contact() {  
    const [user, setUser] = useState(null);  
    const navigate = useNavigate();  
  
    /* Verify if User In-Session in LocalStorage */  
    useEffect(() => {  
      const fetchDecodedUserID = async () => {  
        try {  
          const response = JSON.parse(localStorage.getItem('token'));  
          setUser(response.data);  
  
          const decoded_token = jwtDecode(response.data.token);
          setUser(decoded_token);
  
        } catch (error) {  
  
          navigate('/login');  
        }  
      };  
  
      fetchDecodedUserID();  
    }, []);  
  
    /* Performs Logout Method */  
    const handleLogout = async () => {  
  
      try {  
        localStorage.removeItem('token');  
        navigate('/login');  
  
      } catch (error) {  
        console.error('Logout failed:', error);  
      }  
    }; 

    const [name, setName] = useState('');  
    const [email, setEmail] = useState('');  
    const [message, setMessage] = useState('');  
    const [success, setSuccess] = useState(false);  
    const [error, setError] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        try {  
            console.log("Name:", name, "Email:", email, "Message:", message);  
            setName('');  
            setEmail('');  
            setMessage('');  
            setSuccess(true);  
            setError('');  
        } catch (err) {  
            console.error(err);  
            setError('There was an error submitting your message. Please try again later.');  
            setSuccess(false);  
        }  
    };  

    return (  
        <>  
            <Navbar bg="primary" data-bs-theme="dark">  
                <Container>  
                    <Navbar.Brand>  
                        <div className="logo">  
                            <img src={image} alt="Logo" /> CLINIC LOGBOOK  
                        </div>  
                    </Navbar.Brand>&nbsp; &nbsp; &nbsp; &nbsp;  
                    <Nav className="me-auto">  
                        <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>&nbsp; &nbsp;  
                        <Nav.Link as={Link} to="/HospitalReservation">Booking</Nav.Link>&nbsp; &nbsp;  
                        <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>&nbsp; &nbsp;  
                    </Nav>  

                    <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="ms-auto">  
          <NavDropdown title={user ? `Hi! ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">  
            <NavDropdown.Item href="#" >Profile</NavDropdown.Item>  
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>  
            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>  
          </NavDropdown>  
        </Nav>  
      </Navbar.Collapse>  
                </Container>  
            </Navbar>  
            <Container className="mt-4">  
                <div style={styles.container}>  
                    <h2>Contact Us</h2>  
                    {success && <Alert variant="success">Your message has been sent successfully!</Alert>}  
                    {error && <Alert variant="danger">{error}</Alert>}  
                    <form onSubmit={handleSubmit} style={styles.form}>  
                        <div style={styles.formGroup}>  
                            <label htmlFor="name">Name:</label>  
                            <input  
                                type="text"  
                                id="name"  
                                name="name"  
                                value={name}  
                                onChange={(e) => setName(e.target.value)}  
                                required  
                                style={styles.input}  
                            />  
                        </div>  
                        <div style={styles.formGroup}>  
                            <label htmlFor="email">Email:</label>  
                            <input  
                                type="email"  
                                id="email"  
                                name="email"  
                                value={email}  
                                onChange={(e) => setEmail(e.target.value)}  
                                required  
                                style={styles.input}  
                            />  
                        </div>  
                        <div style={styles.formGroup}>  
                            <label htmlFor="message">Message:</label>  
                            <textarea  
                                id="message"  
                                name="message"  
                                value={message}  
                                onChange={(e) => setMessage(e.target.value)}  
                                required  
                                style={{ ...styles.input, height: '100px' }}  
                            />  
                        </div>  
                        <button type="submit" style={styles.button}>Submit</button>  

                        <div style={styles.socialLogos}>  
                            <b> OR CONTACT ME THRU:</b>  
                            <a href="https://www.facebook.com/me.xxBASE24MANxx" target="_blank" rel="noopener noreferrer">  
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style={styles.icon} />  
                            </a>  
                            <a href="https://www.instagram.com/elfdaniii/" target="_blank" rel="noopener noreferrer">  
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style={styles.icon} />  
                            </a>  
                            <a href="https://x.com/ElFdANII" target="_blank" rel="noopener noreferrer">  
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg" alt="Twitter Logo" style={styles.icon} />  
                            </a>  
                        </div>  
                    </form>  
                </div>  
            </Container>  
        </>  
    );  
}  

export default Contact;