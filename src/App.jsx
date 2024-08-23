import { useState } from 'react'
import './App.css'
import Board from './Components/Board'
import React from 'react'


function App() {
  const [boardState, updateboardState] = React.useState(['state'])

  return (
    <>
      <Board />
    </>
  )
}

export default App
