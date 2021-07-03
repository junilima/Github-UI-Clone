import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Header from './components/Header'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Repo from './pages/Repo'

import { themes } from './styles/themes'

import GlobalStyles from './styles/GlobalStyles'

const App = () => {
  const [themeName, setThemeName] = useState('light')
  const currentTheme = themes[themeName]

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <Header themeName={themeName} setThemeName={setThemeName} />

        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/:reponame" element={<Repo />} />
        </Routes>

        <Footer />

        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
