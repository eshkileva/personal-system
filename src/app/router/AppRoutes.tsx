import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/ui/HomePage'
import { ProjectNotFound } from '../../pages/project/ui/ProjectNotFound'
import { ProjectPage } from '../../pages/project/ui/ProjectPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="*" element={<ProjectNotFound />} />
    </Routes>
  )
}
