import { useState, useEffect } from 'react'
import Task from '../Task/Task'
import classes from './TaskList.module.css'

export default function TaskList(props) {
    const [sortTasks, setSortTasks] = useState([])

    useEffect(() => {
        setSortTasks([...props.tasks].filter(task => props.sortBy ? task[props.sortBy] : !task.done))
    }, [props.tasks, props.sortBy])

    return (
        <div className={classes.wrapper}>
            <div className={classes['list-title']}>{props.title}</div>
            <div className={classes['task-list']}>
                {
                    sortTasks.length 
                        ? sortTasks.map((task) => {
                            return <Task task={task} key={`${task.title}-${task.done}-${task.id}`} changeTask={props.changeTask} deleteTask={props.deleteTask}/>
                        })
                        : "No tasks"
                }           
            </div>
        </div>
    )
}