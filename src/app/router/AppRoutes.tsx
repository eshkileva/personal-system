import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProjectPage } from '../../pages/project/ui/ProjectPage'
import { SystemShell } from '../shell/SystemShell'

const IndexPage = lazy(() =>
  import('../../pages/index/ui/IndexPage').then((module) => ({
    default: module.IndexPage,
  })),
)
const ProfilePage = lazy(() =>
  import('../../pages/profile/ui/ProfilePage').then((module) => ({
    default: module.ProfilePage,
  })),
)
const ProjectsPage = lazy(() =>
  import('../../pages/projects/ui/ProjectsPage').then((module) => ({
    default: module.ProjectsPage,
  })),
)
const StackPage = lazy(() =>
  import('../../pages/stack/ui/StackPage').then((module) => ({
    default: module.StackPage,
  })),
)
const ExperiencePage = lazy(() =>
  import('../../pages/experience/ui/ExperiencePage').then((module) => ({
    default: module.ExperiencePage,
  })),
)
const ContactPage = lazy(() =>
  import('../../pages/contact/ui/ContactPage').then((module) => ({
    default: module.ContactPage,
  })),
)
const NotFoundPage = lazy(() =>
  import('../../pages/not-found/ui/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SystemShell />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/stack" element={<StackPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
