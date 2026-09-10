import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router"
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/home.jsx'
import Organiser from './pages/organiser.jsx'
import Battle from './pages/battle.jsx'
import { ShopProtection, BattleProtection } from './components/RouteProtection.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route element={<ShopProtection />}>
        <Route path='/organiser' element={<Organiser />} />
      </Route>
      <Route element={<BattleProtection />}>
        <Route path='battle' element={<Battle />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
