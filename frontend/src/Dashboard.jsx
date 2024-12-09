import React, { useEffect, useState } from 'react';  
import { data, useNavigate } from 'react-router-dom';  
import axios from 'axios';  

import Container from 'react-bootstrap/Container';  
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';  
import Button from 'react-bootstrap/Button';  
import { jwtDecode } from 'jwt-decode';  
import  Tab  from 'react-bootstrap/Tab';
import  Tabs from 'react-bootstrap/Tabs';
import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';  

import Swal  from 'sweetalert2';

import  Modal  from 'react-bootstrap/Modal';
import  ModalBody  from 'react-bootstrap/ModalBody';
import  ModalFooter  from 'react-bootstrap/ModalFooter';

function Dashboard() {  

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

   // 1.: DISPLAY USERS  
   const [users, setUsers] = useState([]);  
   const userData = JSON.parse(localStorage.getItem('token'));  
   const token = userData.data.token;
 
   const headers = {  
     accept: 'application/json',  
     Authorization: token  
   }  
   
   useEffect(() => {  
    fetchUsers()  
   }, [])  
   
   const fetchUsers = async () => {  
     await axios.get(`${API_ENDPOINT}/user`, { headers: headers }).then(({data})=>{  
       setUsers(data)  
     })  
   }  

   /* 2. DELETE USER */  
  const deleteUser = async (id) => {  

    const isConfirm = await Swal.fire({  
      title: 'Are you sure?',  
      text: "You won't be able to revert this!",  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonColor: '#3085d6',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Yes, delete it!'  
    }).then((result) => {  
      return result.isConfirmed  
    });  

  if (!isConfirm) {  
    return;  
  }  
  
  await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers: headers }).then(({ data }) => {  
    Swal.fire({  
      icon: "success",  
      text: "Successfully Deleted" 
    })
    fetchUsers()
  }).catch(({ response: { data } }) => {  
    Swal.fire({  
      text: data.message,  
      icon: "error"
    }) 
  })
}

  /* 3. CREATE USER */  
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () =>  setShow(true);

 const [fullName, setFullName] = useState("")
 const [username, setUsername] = useState("")
 const [password , setPassword] = useState("")
 const [validationError ,setValidationError] = useState ({})

const createUser = async (e) => {

  e.preventDefault();

  const formData = new FormData()

  formData.append('fullname', fullName)
  formData.append('username', username)
  formData.append('password', password)

  await axios.post(`${API_ENDPOINT}/user`,{fullName, username, password},  { headers: headers }).then(({data})=>{  
    Swal.fire({  
      icon: "success",  
      text: "Successfully Deleted" 
    })
  
    fetchUsers();

   }).catch(({response})=>{
    if(response.status===422){
      setValidationError(response.data.errors)
    }else{
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })
    }
   })
}


/* Read Users */
const [selectedUser, setSelectedUser] = useState(null);
const [show1, setShow1] = useState (false);
const handleClose1 = () => setShow1(false);
const handleShow1 = (row_users) => {
  setSelectedUser(row_users);
  setShow1(true);
}


  return (  <>
  <Navbar bg="success" data-bs-theme="dark">  
    <Container>  
      <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>  
      <Nav className="me-auto">  
        <Nav.Link href="#users">Users</Nav.Link>  
        <Nav.Link href="#departments">Departments</Nav.Link>  
        <Nav.Link href="#courses">Courses</Nav.Link>  
      </Nav>  

      <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="ms-auto">  
          <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">  
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>  
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>  
            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>  
          </NavDropdown>  
        </Nav>  
      </Navbar.Collapse>  
    </Container>  
  </Navbar>  
<br />

{/* Show data */}

 <div className="container">

 <div className='col-12'>  
<Button variant='btn btn-success mb-2 float-end btn-sm me-2' onClick={handleShow}>Create User</Button>  
</div>

 <table className='table table-bordered'>  
<thead>  
  <tr>  
    <th style={{padding: 1, margin: 0}}>ID</th>  
    <th style={{padding: 1, margin: 0}}>Username</th>  
    <th style={{padding: 1, margin: 0}}>Password</th>  
    <th style={{padding: 1, margin: 0}}>
      <center>Action</center>
      </th>  
  </tr>  
</thead>  

<tbody>  
  {  
    users.length > 0 && (  
    users.map((row_users, key) => (  
      <tr key={row_users.user_id}>  
        <td style={{padding: 1, margin: 0}}>{row_users.user_id}</td>  
        <td style={{padding: 1, margin: 0}}>{row_users.username}</td>  
        <td style={{padding: 1, margin: 0}}>{row_users.fullname}</td>  
        <td style={{padding: 1, margin: 0}}>  
          <center>  
          <Button variant='secondary' size='sm' onClick={() => handleShow1(row_users)}>Read</Button>
            <Button variant='danger' size='sm' onClick={() => deleteUser(row_users.user_id)}>Delete</Button>  
          </center>  
        </td>  
      </tr>  
     ))  
   )
  }  
</tbody> 
</table>  
</div>

<Modal show={show} onHide={handleClose}>  

  <Modal.Header closeButton>  
    <Modal.Title>Create User</Modal.Title>  
  </Modal.Header>  

  <Modal.Body>  

    <Form onSubmit={createUser}>  
      <Row>  
        <Col>  
          <Form.Group controlId="Name">  
            <Form.Label>Fullname</Form.Label>  
            <Form.Control type="text" value={fullName} onChange={(event)=>{setFullName(event.target.value)}} required />  
          </Form.Group>  
        </Col>  
      </Row>  

      <Row>  
        <Col>  
          <Form.Group controlId="Username">  
            <Form.Label>Username</Form.Label>  
            <Form.Control type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}} required />  
          </Form.Group>  
        </Col>  
      </Row>  

      <Row>  
        <Col>  
          <Form.Group controlId="Password">  
            <Form.Label>Password</Form.Label>  
            <Form.Control type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />  
          </Form.Group>  
        </Col>  
      </Row>  

      <Button variant="primary" className="mt-2" size="sm" type="submit">Save</Button>  
    </Form>  

  </Modal.Body>  

</Modal>

<Modal show={show1} onHide={handleClose1}>  
  <Modal.Header closeButton>  
    <Modal.Title>Row Details</Modal.Title>  
  </Modal.Header>  

  <Modal.Body>  
    {selectedUser ? (  
      <div>  
        <p><strong>ID:</strong> {selectedUser.user_id}</p>  
        <p><strong>Fullname:</strong> {selectedUser.fullname}</p>  
        <p><strong>Username:</strong> {selectedUser.username}</p>  
      </div>  
    ) : (  
      <p>No data available</p>  
    )}  
  </Modal.Body>  

  <Modal.Footer>  
    <Button variant="secondary" onClick={handleClose1}>  
      Close  
    </Button>  
  </Modal.Footer>  
</Modal>


  </>
);  
}  

export default Dashboard;