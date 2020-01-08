import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, notification, Input } from 'antd';

function App() {
  const [courses, setCourse] = useState(['HTML', 'CSS', 'Javascript']);
  const [newCourse, setnewCourse] = useState('');

  useEffect(() => {
    const storageCourses = localStorage.getItem('courses');
    if (storageCourses) {
      setCourse(JSON.parse(storageCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleAdd = useCallback(() => {
    notification.success({
      message: `Curso **${newCourse}** adicionado.`
    });

    setCourse([...courses, newCourse]);
    setnewCourse('');
  }, [newCourse, courses]);

  const coursesTotal = useMemo(() => courses.length, [courses]);

  return (
    <div className="App">
      <h1>Cursos:</h1>
      <ul>
        {courses.map(c => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <h3>Você possui um total de {coursesTotal} cursos.</h3>
      <Input
        style={{ width: 200 }}
        onChange={e => setnewCourse(e.target.value)}
        value={newCourse}
      />
      <br />
      <Button onClick={handleAdd}>Adicionar</Button>
    </div>
  );
}

export default App;
