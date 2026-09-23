import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './styles.css'

const router = createBrowserRouter([{ path: '*', element: <App /> }])

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

// Prerendered pages (dist/**/index.html) ship markup inside #root: hydrate it.
// The dev server serves an empty shell: render from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
