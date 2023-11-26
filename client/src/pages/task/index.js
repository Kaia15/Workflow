import RenderTask from "./task/task"
import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { AuthContext } from "../../context/context"
import { checkAuth } from "../../auth/checkAuth"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import { axios } from "../../config"

const getAllTasks = async (user, func) => {
    // console.log(user['accessToken'])
    try {
        const res = await axios.get('http://localhost:8000/task',
        {
            headers: { token: `Bearer ${user.accessToken}` }
        })
        const data = await res.data
        // console.log(data)
        // return data
        const filter = data.filter((task, id) => {
            return task['ownerID'] === user['id'] 
        })
        if (filter) func(filter)
        else func([])
    } catch (err) {
        console.log(err);
    }
    
}

const updateTask = async (user, body, taskId) => {
    const res = await axios.patch(`http://localhost:8000/task/${taskId}/edit`,
    { ...body },
    {
        headers: { token: `Bearer ${user.accessToken}` },
    })
    const data = await res.data
    return data
}

const deleteTask = async (taskId) => {
    try {
        const deleted = await axios.delete(`http://localhost:8000/task/${taskId}/delete`)
    } catch(err) {
        console.log(err);
    }
}

const Task = () => {
    const { tasks, setTasks } = useContext(AuthContext)
    const {taskId, setTaskId} = useContext(AuthContext)
    const {isValid, setIsValid} = useContext(AuthContext)
    // const validToken = localStorage.getItem('validToken');
    const { expired, setExpired } = useContext(AuthContext);
    const { loading, setLoading } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        checkAuth({setExpired, setIsValid, setLoading});
        const tokenValidationInterval = setInterval(() => {
            checkAuth({setExpired, setIsValid, setLoading});
            // console.log('check!!')
        }, 10000); // Adjust the interval as needed (e.g., every 60 seconds)

        // Clean up the interval when the component is unmounted
        return () => clearInterval(tokenValidationInterval);
    }, []);

    useEffect(() => {
        if (expired) {
        // Redirect to the login page if the token has expired
        history.push('/login');
        }
    }, [expired,history])

    useEffect(() => {
        if (isValid) {
            const user = JSON.parse(localStorage.getItem('user'))
            // console.log(user)
            if (user !== null) {
                getAllTasks(user,setTasks);
            } else setTasks([])
        } else {
            setTasks([])
            //localStorage.setItem('tasks', JSON.stringify([]))
        }
    }, [isValid])

    const handleDelete = (id) => {
        // console.log(id)
        setTasks(prev => { 
            const afterfilter = prev.filter((t) => t['_id'] !== id)
            // console.log(afterfilter)
            return afterfilter
        })
        deleteTask(id);
    }

    const onSubmit = async (values, actions) => {
        // const newTask = 
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== null) 
        {
            updateTask(user, values, taskId)
            .then(data => setTasks(prev => {
                prev = prev.filter(t => t['_id'] !== taskId)
                prev = [...prev, data]
                return prev
            }))
        }

        actions.resetForm();
        setTaskId("")
    }

    const filter = () => {

    }
    // console.log(tasks)
    // console.log(taskId)

    return (
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : isValid ? (
        <RenderTask
            isValid={isValid}
            handleDelete = {handleDelete}
            onSubmit = {onSubmit}
            filter = {filter}
        />
        ) : (
            <p>Token is not valid.</p>
        )}
        </div>
    )
}

export default Task