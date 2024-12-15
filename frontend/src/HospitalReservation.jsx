import Swal from 'sweetalert2'; // Import SweetAlert2
import './HospitalReservation.css'

import React, { useEffect, useState } from 'react';  
import { Link, useNavigate} from 'react-router-dom';  
import { Container, Navbar, Nav, Alert } from 'react-bootstrap';  
import NavDropdown from 'react-bootstrap/NavDropdown';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './Api';  

import image from './assets/cross.png'

const ServiceCard = ({ serviceName, serviceDate, serviceTime, doctor, price, buttonLabel, onReserve }) => {
  return (
    <div className="service-card">
      <div className="service-info">
        <h3>{serviceName}</h3>
        <p>Date: {serviceDate}</p>
        <p>Time: {serviceTime}</p>
        <p>Doctor: {doctor}</p>
        <p>Price: {price}</p>
      </div>
      <button className="service-button" onClick={onReserve}>{buttonLabel}</button>
    </div>
  );
};

const HospitalReservation = () => {
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
  const [patientName, setPatientName] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("2024-12-18");
  const [appointmentTime, setAppointmentTime] = useState("09:00 AM");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientName || !patientContact) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please provide your name and contact details.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Appointment Confirmed',
      text: `Your appointment on ${appointmentDate} at ${appointmentTime} has been confirmed.`,
    });

    console.log("Appointment submitted!", {
      patientName,
      patientContact,
      appointmentDate,
      appointmentTime,
    });
  };

  const services = [
    {
      serviceName: 'General Check-up',
      serviceDate: 'Mon 12/18',
      serviceTime: '09:00 AM - 10:00 AM',
      doctor: 'Dr. Smith',
      price: 'P500',
      buttonLabel: 'Reserve Now',
    },
    {
      serviceName: 'Dental Cleaning',
      serviceDate: 'Tue 12/19',
      serviceTime: '10:30 AM - 11:30 AM',
      doctor: 'Dr. Johnson',
      price: 'P700',
      buttonLabel: 'Reserve Now',
    },
    {
      serviceName: 'Physical Therapy',
      serviceDate: 'Wed 12/20',
      serviceTime: '01:00 PM - 02:00 PM',
      doctor: 'Dr. Lee',
      price: 'P1,200',
      buttonLabel: 'Reserve Now',
    },
    {
      serviceName: 'X-ray',
      serviceDate: 'Wed 12/20',
      serviceTime: '01:00 PM - 02:00 PM',
      doctor: 'Dr. Poy',
      price: 'P1,200',
      buttonLabel: 'Reserve Now',
    },
    {
      serviceName: 'Check Up',
      serviceDate: 'Wed 12/20',
      serviceTime: '01:00 PM - 02:00 PM',
      doctor: 'Dr. Daniel',
      price: 'P1,200',
      buttonLabel: 'Reserve Now',
    },
    {
      serviceName: 'Dental ',
      serviceDate: 'Wed 12/20',
      serviceTime: '01:00 PM - 02:00 PM',
      doctor: 'Dr. Mark',
      price: 'P1,200',
      buttonLabel: 'Reserve Now',
    },

  ];

  const handleServiceReserve = (serviceName) => {
    Swal.fire({
      icon: 'info',
      title: 'Reservation Successful',
      text: `You have reserved the service: ${serviceName}`,
    });
  };

  return (
    <div>
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

      <div className="dashboard-background"></div>
      <div className="container-services1">
        <h1>Book Your Appointment</h1>
        </div>
        <div className="container-services">
        <form onSubmit={handleSubmit} className="appointment-form">
          <label>
            Patient Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label> <br />  <br />
          <label>
            Contact Number:
            <input
              type="text"
              value={patientContact}
              onChange={(e) => setPatientContact(e.target.value)}
              placeholder="Enter your contact number"
            />
          </label> <br /> <br />
          <label>
            Appointment Date:
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </label> <br />  <br />
          <label>
            Appointment Time:
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </label>  <br />  <br />
          <button type="submit">Confirm Appointment</button>
        </form>
      </div>

      {/* Service Listing Section */}
      <div className="container">
        <h1 className="title-1">Available Services</h1>
        <div className="deals">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              onReserve={() => handleServiceReserve(service.serviceName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalReservation;
