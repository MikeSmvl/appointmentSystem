import React, { Component } from 'react';
import AppointmentApp from '../components/DoctorScheduleAppointmentApp';


class DoctorPage extends Component {

  render() {
    return (
        <React.Fragment>
          <img class="image" src="http://www.medicinaperu.com/_images/user_4/ww/custom/HBR87040_medicina_2.jpg" alt="clinic" />
          <AppointmentApp></AppointmentApp>
        </React.Fragment>
    );
  }
}

export default DoctorPage;
