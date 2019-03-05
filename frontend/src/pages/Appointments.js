import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import AppointmentList from '../components/Appointments/AppointmentList/AppointmentList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Appointments.css';
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class AppointmentsPage extends Component {
  state = {
    creating: false,
    appointments: [],
    isLoading: false,
    selectedAppointment: null,
    healthCareNumber: ""
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchAppointments();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedAppointment: null });
  };

  fetchAppointments() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            appointments {
              _id
              type
              slots {
                slot_time
                slot_date
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const appointments = resData.data.appointments;
        if (this.isActive) {
          this.setState({ appointments: appointments, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  showDetailHandler = appointmentId => {
    this.setState(prevState => {
      const selectedAppointment = prevState.appointments.find(a => a._id === appointmentId);
      return { selectedAppointment: selectedAppointment };
    });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  returnTime() {
    if (this.state.selectedAppointment.type === "Non-Urgent") {
      var quotient = Math.floor(this.state.selectedAppointment.slots.slot_time / 3);
      var remainder = (this.state.selectedAppointment.slots.slot_time * 20) % 60;
      if (remainder === 0) {
        return (<p>The appointment is at {8 + quotient}:00</p>);
      } else {
        return (<p>The appointment is at {8 + quotient}:{remainder}</p>);
      }
    } else if (this.state.selectedAppointment.type === "Annual") {
      return (<p>The appointment is at {parseFloat(this.state.selectedAppointment.slots.slot_time) + 8}:00</p>);
    }
  }

  handleSetHCN(hcn) {
    this.setState({ healthCareNumber: hcn });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selectedAppointment && (
          <Modal
            title={this.state.selectedAppointment.type}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalCancelHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}
          >
            <h1>This is an {this.state.selectedAppointment.type} appointment</h1>
            <p>
              The date of the appointment is {this.state.selectedAppointment.slots.slot_date}
            </p>
            {this.returnTime()}
          </Modal>
        )}
        {
          <MuiThemeProvider>
            <div class="depth">
              <TextField
                fullWidth={true}
                hintText="Enter Health Care Number"
                onChange={(evt, newValue) => this.handleSetHCN(newValue)}
              />
            </div>
          </MuiThemeProvider>
        }
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <AppointmentList
            appointments={this.state.appointments}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AppointmentsPage;
