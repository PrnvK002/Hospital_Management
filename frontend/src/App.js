//=================== MODULES ====================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

//============== PAGES START ======================
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import UserManagement from "./Pages/userManagement";
import AddUser from "./Pages/addUser";
import Departments from "./Pages/Departments";
import AddDepartment from "./Pages/AddDepartment";
import BookAppointment from "./Pages/BookAppointment";
import Booking from "./Pages/Bookings";
import History from "./Pages/AppointmentHistory";
import StaffAppointments from "./Pages/staffAppointments";
import Chat from "./Pages/Chat";
import Services from './Pages/Services';
import DoctorAppointments from './Pages/DoctorAppointments';
import AddService from './Pages/AddService';
import ChatDoctor from './Pages/chatDoctor';
import ProfilePage from './Pages/Profile';
import MedicinePage from './Pages/Medicines';
import NotFoundPage from './Pages/NotFound';
import AddPrescription from "./Pages/AddPrescription";
//============== PAGES END ======================
//=============== COMPONENTS ===================
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {


  return (
    // <div className="App">
    <BrowserRouter>
      <Header />

      <main className="py-3" style={{ minHeight: "82vh" }} >
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/addUser" element={<AddUser />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/addDepartment" element={<AddDepartment />} />
            <Route
              path="/bookAppointment/:id/:departmentName"
              element={<BookAppointment />}
            />
            <Route path="/booking" element={<Booking />} />
            <Route path="/history" element={<History />} />
            <Route path="/staff/appointments" element={<StaffAppointments />} />
            <Route path="/staff/medicine" element={<MedicinePage />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/admin/services" element={<Services />} />
            <Route path="/admin/addService" element={<AddService />} />
            <Route path="/doctor/chat" element={<ChatDoctor />} />
            <Route path="/doctor/prescription/:id" element={<AddPrescription />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
    // </div>
  );
}

export default App;
