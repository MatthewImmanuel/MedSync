const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const patientRoutes = require('./src/routes/patient.route');
const userRoutes = require('./src/routes/user.route');
const doctorRoutes = require('./src/routes/doctor.route');
const hospitalRoutes = require('./src/routes/hospital.route');
const appointmentRoutes = require('./src/routes/appointment.route');
const appointmentDetailRoutes = require('./src/routes/appointmentDetail.route');


app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/appointmentDetails', appointmentDetailRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


