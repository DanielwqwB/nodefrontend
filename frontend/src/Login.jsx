import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  

import 'bootstrap/dist/css/bootstrap.css';  

import Container from 'react-bootstrap/Container';  
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';  
import Button from 'react-bootstrap/Button';  
import { jwtDecode } from 'jwt-decode';

import { API_ENDPOINT } from './Api.jsx';  

function Login() {  
  const navigate = useNavigate();  

  const [user, setUser] = useState(null);  

  /* Verify if User In Session in LocalStorage */  
  useEffect(() => {  
    const fetchUser = async () => {  
      try {  
        const response = JSON.parse(localStorage.getItem('token'));  
        setUser(response.data);  
        navigate('/dashboard');  
      } catch (error) {  
        navigate('/login');  
      }  
    };  

    fetchUser();  
  }, []);  

  /* Performs Login Method */  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

try {  
    const response = await axios.post(`${API_ENDPOINT}/auth/login`, {  
      username,  
      password,  
    });  
  
    localStorage.setItem("token", JSON.stringify(response));  
    setError('');  
  
    navigate('/dashboard');  
  } catch (error) {  
    setError('Invalid username or password');  
    }  
  };

  return ( <>  
    <Navbar bg="success" data-bs-theme="dark">  
      <Container>  
        <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>  
      </Container>  
    </Navbar>  
   <br /> <br /> <br /> <br /> <br /> <br />

   <Container>  
        <Row className="justify-content-md-center">  
          <Col md={4}>  
            <div className="login_form">  
              <div className="container">  
                <div className="login-logo">  
                  {/* <img src={logo} width={'38%'} alt="Logo" />   */}
                </div>  
                <center>MCFi: A Proposed Enrollment Systems <br /> Using Serverless Computing </center>&nbsp;
                  
                <div className="card">  
                  <div className="card-body login-card-body"> 

                    <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formUsername">  
  <Form.Label> Username: </Form.Label>  
  <Form.Control className="form-control-sm rounded-0"  
    type="text"  
    placeholder="Enter Username"  
    value={username}  
    onChange={(e) => setUsername(e.target.value)} required />  
</Form.Group>  

<Form.Group controlId="formPassword">  
  <Form.Label>Password:</Form.Label>  
  <Form.Control className="form-control-sm rounded-0"  
    type="password"  
    placeholder="Enter Password"  
    value={password}  
    onChange={(e) => setPassword(e.target.value)} required />  
</Form.Group><br />  

<Form.Group controlId="formButton">  
  {error && <p style={{ color: 'red' }}>{error}</p>}  
  <Button variant="success" className="btn btn-block bg-custom btn-flat rounded-0" size="sm" block type="submit">Login</Button> 
</Form.Group>  

  </Form>  
    </div>
      </div>  
        </div>  
          </div>  
            </Col>  
              </Row>  
</Container>
   </>
  )
}
                    


export default Login