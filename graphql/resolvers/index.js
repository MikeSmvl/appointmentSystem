const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const appointmentResolver = require('./appointment2');
const patientResolver = require('./patient');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...appointmentResolver,
  ...patientResolver
};

module.exports = rootResolver;
