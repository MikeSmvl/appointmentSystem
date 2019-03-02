const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const appointmentResolver = require('./appointment2');
const slotResolver = require('./slot2');
const patientResolver = require('./patient');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...appointmentResolver,
  ...patientResolver,
  ...slotResolver
};

module.exports = rootResolver;
