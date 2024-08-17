import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile/dashboard'
import { Layout } from './pages/Profile/Layout'
import { Photos } from './pages/Profile/photos'
import { Settings } from './pages/Profile/settings'

const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/profile',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Profile/>
      },
      {
        path:'photos',
        element:<Photos/>
      },
      {
        path:'settings',
        element:<Settings/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
