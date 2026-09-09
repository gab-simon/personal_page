import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/not-found'
import I18nProvider from './i18n/provider'
import ThemeProvider from './theme/provider'

/* The résumé viewer is a secondary page — it stays out of the main bundle. */
const ResumePage = lazy(() => import('./pages/resume'))

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
