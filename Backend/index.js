const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const patientRoutes = require('./src/routes/patient.route');
const userRoutes = require('./src/routes/user.route');
const doctorRoutes = require('./src/routes/doctor.route');
const hospitalRoutes = require('./src/routes/hospital.route');
const appointmentRoutes = require('./src/routes/appointment.route');

app.use('/patients', patientRoutes);
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/appointments', appointmentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
