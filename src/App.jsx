import React, { useEffect, useState } from 'react'
import { jsxs } from 'react/jsx-runtime';

const App = () => {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);


  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  // Add Task
  const addTask = () => {
    setTasks([...tasks, { task: task }]);
    setTask("");
  }

  // Delete Task
  const deleteTask = (index) => {
    const newTask = tasks.filter((_, i) => i != index)
    setTasks(newTask);
  }


  // Edit Task
  const [editindex, seteditindex] = useState(null);
  const [editTask, setEdittask] = useState("")

  const edit = (index) => {
    setEdittask(tasks[index].task);
    seteditindex(index);
  }


  // Update Task
  const update = (index) => {
    const updatedTask = tasks.map((ele, i) => i === index ? { ...ele, task: editTask } : ele)

    setTasks(updatedTask);
    setEdittask("");
    seteditindex(null)
  }


  return (

    <div className='h-screen w-full flex items-center justify-center bg-indigo-200'>
      <div className="container p-4 bg-amber-100 h-auto w-120 border-2 rounded-md">
        <h1 className='font-bold text-2xl'>Todo App</h1>

        {/* Input */}
        <div className='w-full flex items-center justify-between gap-3 mt-2'>
          <input type="text" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder='Enter your Todos' className='border-2 w-full p-1 outline-none rounded-md border-olive-800' />
          <button className='bg-blue-400 py-2 cursor-pointer px-4 rounded-md hover:bg-blue-700 text-white duration-300 ease-in-out' onClick={addTask}>Add</button>
        </div>

        {/* Tasks */}
        <h1 className='mt-2'>Your Tasks: </h1>
        {
          tasks.map((ele, index) => (
            <div key={index} className='mt-2'>
              <div className='w-full flex items-center gap-3'>
                {
                  editindex === index ? <input type='text' value={editTask} onChange={(e) => { setEdittask(e.target.value) }} className='border-2 w-full p-1 outline-none rounded-md border-olive-800' /> :
                    <p className='border-2 bg-amber-100 rounded-md w-full p-2'>{ele.task}</p>
                }

                {
                  editindex === index ? <button className='bg-pink-400 py-2 cursor-pointer px-4 rounded-md hover:bg-pink-700 text-white duration-300 ease-in-out' onClick={() => {
                    update(index)
                  }}>update</button>
                    :
                    <button className='bg-green-400 py-2 cursor-pointer px-4 rounded-md hover:bg-green-700 text-white duration-300 ease-in-out' onClick={() => { edit(index) }}>Edit</button>
                }

                <button className='bg-red-400 py-2 cursor-pointer px-4 rounded-md hover:bg-red-700 text-white duration-300 ease-in-out' onClick={() => { deleteTask(index) }}>Delete</button>
              </div>
            </div>
          ))
        }


      </div>
    </div>
  )
}

export default App
