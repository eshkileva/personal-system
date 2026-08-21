import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/ui/HomePage'
import { ProjectNotFound } from '../../pages/project/ui/ProjectNotFound'
import { ProjectPage } from '../../pages/project/ui/ProjectPage'
import { SystemShell } from '../shell/SystemShell'

function PlaceholderPage({ path }: { path: string }) {
  return (
    <section className="system-placeholder">
      <h1>{path}</h1>
    </section>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SystemShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PlaceholderPage path="/profile" />} />
        <Route
          path="/projects"
          element={<PlaceholderPage path="/projects" />}
        />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/stack" element={<PlaceholderPage path="/stack" />} />
        <Route
          path="/experience"
          element={<PlaceholderPage path="/experience" />}
        />
        <Route path="/contact" element={<PlaceholderPage path="/contact" />} />
        <Route path="*" element={<ProjectNotFound />} />
      </Route>
    </Routes>
  )
}
