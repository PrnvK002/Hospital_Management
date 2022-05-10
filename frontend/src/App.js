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
// import BookAppointment from "./Pages/BookAppointment";
// import ConfirmAppointment from "./Pages/ConfirmAppointment";
//============== PAGES END ======================
//=============== COMPONENTS ===================
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    // <div className="App">
    <BrowserRouter>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/addUser" element={<AddUser />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/addDepartment" element={<AddDepartment />} />
            {/* <Route path="/bookAppointment/:id/:departmentName" element={<BookAppointment />} />
            <Route path="/confirmAppointment/:id" element={<ConfirmAppointment />} /> */}
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
    // </div>
  );
}

export default App;
