const Slot = require('../../models/slot');
const Appointment = require('../../models/appointment');
const Patient = require('../../models/patient');

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
    var requestBody = req.body;
    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      type: requestBody.type,
      slots: newslot._id
    });
    // and saves the record to the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
    });
  }
};

module.exports = appointmentController;
