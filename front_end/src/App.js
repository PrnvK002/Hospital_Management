//=================== MODULES ====================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

//============== PAGES START ======================
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import StaffManagement from "./Pages/staffManagement";
import DoctorManagement from "./Pages/doctorManagement";
import UserManagement from "./Pages/userManagement";
//============== PAGES END ======================
//=============== COMPONENTS ===================
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/staffs" element={<StaffManagement />} />
              <Route path="/admin/doctors" element={<DoctorManagement />} />
              {/* <Route path="/admin/editDoctor/:id" element={<EditDoctor />} />
              <Route path="/admin/addDoctor" element={<AddDctors />} />
              <Route path="/admin/addStaff" element={<AddStaff />} />
              <Route path="/admin/editStaff/:id" element={<EditStaff />} /> */}
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
