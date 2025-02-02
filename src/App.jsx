import { Route, Routes } from 'react-router-dom';
import TeacherCard from './Componients/teachercard';
import StudentList from './Componients/StudentList';
import Login from './Componients/login';
import Header from './Componients/Header';
import Salary from './Componients/Salary';
import Exam from './Componients/exam';
import Davomat from './Componients/Davomat';
import ProjectsPage from './Componients/Loyihalar';
import { TranslationProvider } from './Context/TranslationContext';



const App = () => {
  return (
    <>
      <TranslationProvider >
        <Header /> {/* Place Header here to show on all routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher" element={<TeacherCard />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/talim" element={<ProjectsPage />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/davomat" element={<Davomat />} />
          <Route path="/coins" element={<StudentList />} /> {/* Separate route for student list */}
        </Routes>
      </TranslationProvider>



    </>
  );
};


export default App;
