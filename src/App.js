import React, { useEffect, useState } from 'react';
import "./App.css"

const App = () => {
  const [ alternateNames, setAlternateNames ] = useState([]);
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    try {
      const response = await fetch ('http://tubemastercrm.com/crm/api/task/')
      const data = await response.json()
      console.log(data)
      if (!Array.isArray(data)) {
        setErrors(true)
      }
      setAlternateNames(data);

    } catch (error) {
      setErrors(true)
      console.error('Error:', error);
    }
  }

  const handleClick = (taskId) => {
    const updatedTasks = alternateNames.filter(item => item.id !== taskId )
    setAlternateNames(updatedTasks);
  }

  if (errors) {
    return <div className='error'>Some Error Occurred</div>;
  }
  return (
    <div className='container'>
      <h1 className='title'>Tasks</h1>
      {alternateNames.length>0 ? (
        <ul>
        {alternateNames.map((item) => (
          <li 
          key={item.id} onClick={() => {handleClick(item.id)}}>
            {item.alternate_name}
          </li>
        ))}
      </ul>
      ) : (
        <h2 style={{color:"red"}}>No Tasks Available!!</h2>
      )}
      
    </div>
  )
}

export default App
