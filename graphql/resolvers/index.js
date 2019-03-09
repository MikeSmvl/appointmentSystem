const authResolver = require('./auth');
const appointmentResolver = require('./appointment2');
const patientResolver = require('./patient');
const slotResolver = require('./slot2');

const rootResolver = {
  ...authResolver,
  ...appointmentResolver,
  ...patientResolver,
  ...slotResolver
};

module.exports = rootResolver;
