import './App.css'
import AddButton from './components/AddButton/AddButton.jsx'
import TaskList from './components/TaskList/TaskList.jsx'
import AddForm from './components/AddForm/AddForm.jsx'
import Search from './components/Search/Search.jsx'
import Notifications from './components/Notifications/Notifications.jsx'
import { useState, createContext } from 'react'
import useSearchTasks from './hooks/useSearchTasks'
import { addTask } from './helpers/addTask.js'
import { updateTask } from './helpers/updateTask.js'
import { deleteTask } from './helpers/deleteTask.js'
import useNotification from './hooks/useNotification'

export const NotificationContext = createContext(null)

function App() {
  const [tasks, setTasks] = useState([])

  const [searchGlobal, setSearchGlobal] = useState("")

  const searchTasks = useSearchTasks(tasks, searchGlobal)

  const { notifications, showNotification, removeNotificationById } = useNotification()

  const onAddTask = addTask(tasks, setTasks)

  const onUpdateTask = updateTask(tasks, setTasks)

  const onDeleteTask = deleteTask(tasks, setTasks)
  
  return (
    <NotificationContext.Provider value={{notifications, showNotification, removeNotificationById}}>
      <Notifications notifications={notifications}/>
      <Search setSearchGlobal={setSearchGlobal}/>
      <div className='main-wrapper'>
        <TaskList 
          title="Active"
          tasks={searchTasks}
          changeTask={onUpdateTask}
          deleteTask={onDeleteTask}/>
        <TaskList 
          title="Completed" 
          sortBy="done"
          tasks={searchTasks} 
          changeTask={onUpdateTask}
          deleteTask={onDeleteTask}/>
      </div>
      <AddButton>
        {
          (closeModal) => {
            return <AddForm closeModal={closeModal} addTask={onAddTask} />
          }
        }
      </AddButton>
    </NotificationContext.Provider>
  )
}

export default App