import React, { useEffect, useState } from 'react';
import ChildSidebar from './childsaidbar';
import { useTranslation } from '../Context/TranslationContext';

const Davomat = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/students');
        const data = await response.json();

        const groupData = {
          group: data.group,
          teacher: data.teacher,
          time: data.time
        };

        const filteredStudents = (data.students || data).filter(
          (student) => student.group === "870"
        );

        setStudents(filteredStudents);
        setGroupInfo(groupData);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    setAttendance(storedAttendance);
  }, []);

  const septemberEvenDays = [3, 5, 7, 10, 12, 14, 17, 19];

  const handleAttendanceChange = (studentId, day) => {
    const currentStatus = attendance[studentId]?.[day] || false;
    const updatedStatus = !currentStatus;

    setAttendance((prev) => {
      const newAttendance = {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [day]: updatedStatus
        }
      };

      localStorage.setItem('attendance', JSON.stringify(newAttendance));
      return newAttendance;
    });
  };

  return (
    <div className="flex">
      <ChildSidebar />
      <div className='flex w-full items-start mt-28 justify-center gap-10 h-[83vh]'>
        <div className="bg-white shadow-md mt-20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">{t('group')}: {loggedInUser.group || "Noma'lum"}</h2>
          <p className="text-gray-700">{t('teacher')}: {loggedInUser.teacher}</p>
          <p className="text-gray-700">{t('lesson')} {loggedInUser.time}</p>
        </div>

        <div className="flex w-[50%] flex-col">
          <h1 className="text-2xl font-bold text-center text-slate-800 mb-4">{t('students')} ({t('group')}: {groupInfo?.group || "nomalum"})</h1>
          {loading ? (
            <p className="text-gray-600">Yuklanmoqda...</p>
          ) : students.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">{t('students')}</th>
                  {septemberEvenDays.map((day) => (
                    <th key={day} className="py-2 px-4">{`Sentabr ${day}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4 text-gray-700">{`${index + 1}. ${student.name}`}</td>
                    {septemberEvenDays.map((day) => {
                      const isPresent = attendance[student.id]?.[day] || false;
                      const colorClass = isPresent ? 'bg-green-500' : 'bg-red-500';
                      const label = isPresent ? 'B' : 'Y';
                      return (
                        <td key={day} className="py-2 px-4 text-center">
                          <div
                            onClick={() => handleAttendanceChange(student.id, day)}
                            className={`h-8 w-8 ${colorClass} flex items-center justify-center text-white font-bold cursor-pointer transition-transform transform hover:scale-105`}>
                            {label}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">Hech qanday talabalar topilmadi.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Davomat;
