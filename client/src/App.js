import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import necessary components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Services from './pages/Services';

// Admin Dashboard components
import Dashboard from './pages/dashboard/Admin/Dashboard';
import StudentList from './pages/dashboard/Admin/StudentList';
import StudentAdd from './pages/dashboard/Admin/StudentAdd';
import InstructorsList from './pages/dashboard/Admin/InstructorsList';
import InstructorsAdd from './pages/dashboard/Admin/InstructorsAdd';
import CategoryManager from './pages/dashboard/Admin/CategoryManager';
import QuizManager from './pages/dashboard/QuizList';
import Settings from './pages/dashboard/Settings';

// Instructor Dashboard components
import InstructorDashboard from './pages/dashboard/Instructors/InstructorDashboard';
import FacultyYearManager from './pages/dashboard/Admin/FacultyYearManager';
import Faculties from './pages/dashboard/Admin/Faculties';

// Student Dashboard components
import ExamSelection from './pages/dashboard/students/ExamSelection';
import QuizPage from './pages/dashboard/students/QuizPage';
import StudentDashboard from './pages/dashboard/students/StudentDashboard';
import ResultPage from './pages/dashboard/students/ResultPage';
import StudyMaterials from './pages/dashboard/students/StudyMaterials';
import Notifications from './pages/dashboard/Notifications';
import Support from './pages/dashboard/Support';
import ManageStudyMaterials from './pages/dashboard/ManageStudyMaterials';
import ModuleManagement from './pages/dashboard/Admin/ModuleManagement';
import QuizAdd from './pages/dashboard/QuizAdd';
import QuizList from './pages/dashboard/QuizList';
import QuizEdit from './pages/dashboard/QuizEdit';
import QuestionsList from './pages/dashboard/QuestionsList';
import QuestionAdd from './pages/dashboard/QuestionsAdd';
import QuestionEdit from './pages/dashboard/QuestionEdit';



function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!currentUser) {
    return navigate('/login', { replace: true });
  }

  return children;
}


function PublicLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminDashboardLayout() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/students/list" element={<StudentList />} />
      <Route path="/students/add" element={<StudentAdd />} />
      <Route path="/instructors/list" element={<InstructorsList />} />
      <Route path="/instructors/add" element={<InstructorsAdd />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/faculties" element={<Faculties />} />
      <Route path="/modules" element={<ModuleManagement />} />
      <Route path="/quiz/categories" element={<CategoryManager />} />

      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quiz/manage/add" element={<QuizAdd />} />
      <Route path="/quiz/manage/:quizId" element={<QuizEdit />} />

      <Route path="/quiz/manage/:quizId/questions" element={<QuestionsList />} />
      <Route path="/quiz/manage/:quizId/questions/add" element={<QuestionAdd />} />
      <Route path="/quiz/manage/:quizId/questions/:questionId" element={<QuestionEdit />} />

      <Route path="/faculty/:facultyId/years" element={<FacultyYearManager />} />

      <Route path="/manage/study-materials" element={<ManageStudyMaterials />} />
    </Routes>
  );
}

function InstructorDashboardLayout() {
  return (
    <Routes>
      <Route index element={<InstructorDashboard />} />
      <Route path="/students/list" element={<StudentList />} />
      <Route path="/students/add" element={<StudentAdd />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/quiz/manage" element={<QuizManager />} />
      <Route path="/manage/study-materials" element={<ManageStudyMaterials />} />

      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quiz/manage/add" element={<QuizAdd />} />
      <Route path="/quiz/manage/:quizId" element={<QuizEdit />} />

      <Route path="/quiz/manage/:quizId/questions" element={<QuestionsList />} />
      <Route path="/quiz/manage/:quizId/questions/add" element={<QuestionAdd />} />
      <Route path="/quiz/manage/:quizId/questions/:questionId" element={<QuestionEdit />} />
    </Routes>
  );
}

function StudentDashboardLayout() {
  return (
    <Routes>
      <Route index element={<StudentDashboard />} />
      {/* <Route path="/students/list" element={<StudentList />} />
      <Route path="/students/add" element={<StudentAdd />} /> */}
      <Route path="/exam/select" element={<ExamSelection />} />
      <Route path="/exam/quiz/:quizId/:duration" element={<QuizPage />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/study-materials" element={<StudyMaterials />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>

        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicLayout />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard/*"
            element={
              <PrivateRoute>
                <AdminDashboardLayout />
              </PrivateRoute>
            }
          />

          {/* Instructor Dashboard */}
          <Route
            path="/instructor/dashboard/*"
            element={
              <PrivateRoute>
                <InstructorDashboardLayout />
              </PrivateRoute>
            }
          />

          {/* Student Dashboard */}
          <Route
            path="/student/dashboard/*"
            element={
              <PrivateRoute>
                <StudentDashboardLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;