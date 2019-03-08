const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Appointment {
    _id: ID!
    type: String!
    slots: Slot
  }

  type Slot {
    _id: ID!
    slot_time: String!
    slot_date: String!
    created_at: String!
  }

  type Patient {
    _id: ID!
    hcn: String!
    password: String
    birthday: Int!
    gender: String!
    phoneNumber: String!
    physicalAddress: String!
    emailAddress: String!
    createdAppointments: [Appointment!]
  }

  type Booking {
      _id: ID!
      event: Event!
      user: User!
      createdAt: String!
      updatedAt: String!
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input PatientInput {
    hcn: String!
    birthday: Int
    gender: String
    phoneNumber: String
    physicalAddress: String
    emailAddress: String
  }

  type RootQuery {
      events: [Event!]!
      bookings: [Booking!]!
      login(email: String!, password: String!): AuthData!
      appointments: [Appointment!]!
      slots: [Slot!]!
      patients: [Patient!]!
  }

  type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
      createPatient(patientInput: PatientInput): Patient
      bookEvent(eventId: ID!): Booking!
      cancelBooking(bookingId: ID!): Event!
      cancelAppointment(appointmentId: ID!): Boolean!
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
