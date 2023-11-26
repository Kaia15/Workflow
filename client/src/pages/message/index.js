import { useContext, useEffect, useState } from "react";
import RenderMessage from "./message/message";
import axios from 'axios'
// import { axios } from "../../config";
import { AuthContext } from "../../context/context";
import { checkAuth } from "../../auth/checkAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const getConversation = async (id) => {
    const conversations = await axios.get(`http://localhost:8000/conversation/${id}`)
    const res = await conversations.data
    return res
}

const getAllUsers = async () => {
    const users = await axios.get('http://localhost:8000/user')
    const res = await users.data
    return res
}

const createConversation  = async (members) => {
    console.log(members)
    const newConversation = await axios.post('http://localhost:8000/conversation/create', {members: members})
    const res = await newConversation.data
    return res
}

const Message = () => {
    const [users, setUsers] = useState([])
    const validToken = localStorage.getItem('validToken');
    const {isValid, setIsValid} = useContext(AuthContext)
    const {allConversations, setAllConversations} = useContext(AuthContext)
    const {currentChat, setCurrentChat} = useContext(AuthContext)
    
    const { expired, setExpired } = useContext(AuthContext);
    const { loading, setLoading } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        checkAuth({ setExpired, setIsValid, setLoading });
        const tokenValidationInterval = setInterval(() => {
        checkAuth({ setExpired, setIsValid, setLoading });
        // console.log('check!!')
        }, 10000); // Adjust the interval as needed (e.g., every 60 seconds)

        // Clean up the interval when the component is unmounted
        return () => clearInterval(tokenValidationInterval);
    }, []);

    useEffect(() => {
        if (expired) {
        // Redirect to the login page if the token has expired
        history.push("/login");
        }
    }, [expired, history]);

    useEffect(() => {
        const m = JSON.parse(validToken)['valid']
        setIsValid(m)
        if (isValid || m) {
        let userId;
        const user = JSON.parse(localStorage.getItem('user')) || null
        if (user !== null) {
            userId = user['id']
        }
        let chats = JSON.parse(localStorage.getItem('chat')) || [];
        let a = []
        chats.map((c, id) => {
            const res = c['members']
            if (res.includes(userId)) {
                a.push(c)
            }
            //  console.log(a)
            setAllConversations(a)
        })
        }
    }, [])

    useEffect(() => {
        if (isValid) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user !== null) {
                const id = user['id']
                // console.log(user)
                const conv = getConversation(id)
                conv
                .then(res => {
                    // console.log(res)
                    localStorage.setItem('chat', JSON.stringify(res))
                })
                .catch(err => console.log(err))
                const users = getAllUsers()
                users.then(res => {
                    setUsers(res)
                }).catch(err => console.log(err))
            }
        }
    }, [isValid])

    

    const handleNewChat = (id1, id2) => {
        // console.log(id1, id2)
        if (isValid) {
            const members = [id1, id2]
            const newChat = createConversation(members)
            newChat
            .then(res => {
                const oldChats = JSON.parse(localStorage.getItem('chat'))
                localStorage.setItem('chat', JSON.stringify([res, ...oldChats]))
                setAllConversations(prev => [res, ...prev])
                // setCurrentChat(res['_id'])
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            {loading ? (
            <p>Loading...</p>
            ) : isValid ? (
                <RenderMessage handleNewChat = {handleNewChat} users = {users} /> ) : (
                    <p>
                        Token is invalid
                    </p>
                )}
        </div>
    )
}

export default Message