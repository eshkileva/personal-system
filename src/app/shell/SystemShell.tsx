import { NavLink, Outlet } from 'react-router-dom'
import { systemRoutes } from '../../shared/config/routes'

const navRoutes = systemRoutes.filter((route) => route.path !== '/')

export function SystemShell() {
  return (
    <>
      <nav aria-label="Системная навигация">
        <ul>
          {navRoutes.map((route) => (
            <li key={route.path}>
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
