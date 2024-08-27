import Tile from "./Tile"
import React from "react"

export default function Board() {
    const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
    const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
    const tiles = []

    const initialBoardState = {
        '0 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 0, 'j': 1},
        '1 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 1, 'j': 1},
        '2 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 2, 'j': 1},
        '3 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 3, 'j': 1},
        '4 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 4, 'j': 1},
        '5 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 5, 'j': 1},
        '6 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 6, 'j': 1},
        '7 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 7, 'j': 1},
        
        // tests
        // '1 2': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 1, 'j': 2},
        // '3 2': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 3, 'j': 2},
        // '5 3': {'url': './images/queen_w.png', 'name': 'queen_w', 'i': 5, 'j': 3},
        // '7 3': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 7, 'j': 3},
        // '3 3': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 3, 'j': 3},
        // '4 5': {'url': './images/knight_w.png', 'name': 'knight_w', 'i': 4, 'j': 5},
        // '5 5': {'url': './images/king_w.png', 'name': 'king_w', 'i': 5, 'j': 5},
        // '2 4': {'url': './images/bishop_w.png', 'name': 'bishop_w', 'i': 2, 'j': 4},
        // '1 4': {'url': './images/queen_w.png', 'name': 'queen_w', 'i': 1, 'j': 4},


        '0 0': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 0, 'j': 0},
        // '1 0': {'url': './images/knight_w.png', 'name': 'knight_w', 'i': 1, 'j': 0},
        // '2 0': {'url': './images/bishop_w.png', 'name': 'bishop_w', 'i': 2, 'j': 0},
        // '3 0': {'url': './images/queen_w.png', 'name': 'queen_w', 'i': 3, 'j': 0},
        '4 0': {'url': './images/king_w.png', 'name': 'king_w', 'i': 4, 'j': 0},
        // '5 0': {'url': './images/bishop_w.png', 'name': 'bishop_w', 'i': 5, 'j': 0},
        // '6 0': {'url': './images/knight_w.png', 'name': 'knight_w', 'i': 6, 'j': 0},
        '7 0': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 7, 'j': 0},
    
        '0 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 0, 'j': 6},
        '1 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 1, 'j': 6},
        '2 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 2, 'j': 6},
        '3 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 3, 'j': 6},
        '4 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 4, 'j': 6},
        '5 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 5, 'j': 6},
        '6 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 6, 'j': 6},
        '7 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 7, 'j': 6},
    
        '0 7': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 0, 'j': 7},
        // '1 7': {'url': './images/knight_b.png', 'name': 'knight_b', 'i': 1, 'j': 7},
        // '2 7': {'url': './images/bishop_b.png', 'name': 'bishop_b', 'i': 2, 'j': 7},
        // '3 7': {'url': './images/queen_b.png', 'name': 'queen_b', 'i': 3, 'j': 7},
        '4 7': {'url': './images/king_b.png', 'name': 'king_b', 'i': 4, 'j': 7},
        // '5 7': {'url': './images/bishop_b.png', 'name': 'bishop_b', 'i': 5, 'j': 7},
        // '6 7': {'url': './images/knight_b.png', 'name': 'knight_b', 'i': 6, 'j': 7},
        '7 7': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 7, 'j': 7},
    }
    
    const initialHighlightHints = {}

    const [boardState, updateboardState] = React.useState(initialBoardState)
    const [highlightHints, updateHighlightHints] = React.useState(initialHighlightHints)
    const   [isKingRookMovedWhite, setIsKingRookMovedWhite] = React.useState(false)
    const [isKingRookMovedBlack, setIsKingRookMovedBlack] = React.useState(false)

    // danger board states
    // const []

    for(let j=verticalAxis.length - 1; j>=0; j--) {
        for(let i=0; i<horizontalAxis.length; i++) {
            tiles.push(<Tile i={i} j={j}
                highlightHints={highlightHints}
                boardState={boardState}
                updateHighlightHints={updateHighlightHints}
                updateboardState={updateboardState}
                setIsKingRookMovedWhite={setIsKingRookMovedWhite}
                setIsKingRookMovedBlack={setIsKingRookMovedBlack}
                isKingRookMovedWhite={isKingRookMovedWhite}
                isKingRookMovedBlack={isKingRookMovedBlack}
                />)
        }

    }
    console.log('tiles : ', tiles[0])
    
    return (
        <>
            <div className="board">
                {tiles}
            </div>
        </>
    )
}