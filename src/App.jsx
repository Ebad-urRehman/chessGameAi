import { useState } from 'react'
import './App.css'
import Board from './Components/Board'
import React from 'react'
import { TilePawnSelection } from './Components/Tile'
import { generateAllMoves } from './Components/HandlePossibleMoves'

function App() {
  const [boardState, updateboardState] = React.useState(['state'])
  return (
    <>
      <Board />
    </>
  )
}

export default App
