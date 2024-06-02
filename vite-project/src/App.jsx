import React, { createContext, useEffect, useState } from "react";
import Home from  "./Pages/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./Pages/Register";
import Login from  "./Pages/Login";
import { ToastContainer } from  "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Components/Contacts";
import Contacts from "./Components/Contacts";
import AddContact from "./Components/AddContact";
import EditContact from "./Components/EditContact";



export const UserContext = createContext(null)


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Contacts />
      },
      {
        path: "/dashboard/add-contact",
        element: <AddContact />
      },
      ,
      {
        path: "/dashboard/edit-contact/:id",
        element: <EditContact />
      }
      
    ]
  }
])



const App = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/contactmsyt/verify', {
      headers: {
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
    .then(res =>{
      if(res.data.success){
        setUser(res.data.user)
      }
    }).catch(err =>{
      console.log(err)
    })

  }, [])
  return (
   <>
   <ToastContainer />
   <UserContext.Provider value={{user, setUser}}>
   <RouterProvider router={router}/>
   </UserContext.Provider>
   </>
  )
}

export default App