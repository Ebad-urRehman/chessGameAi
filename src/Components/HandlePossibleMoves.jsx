import { updateMoves } from "./PossibleMoves";

export function generateAllMoves(boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack) {
    for(let piece in boardState) {
        let turn = boardState[piece]['name'].endsWith('_w')?'_w':'_b'
        updateMoves(boardState[piece], boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
        // updatePossibleMovesBlack((prevMovesBlack) => {
        //     console.log(prevMovesBlack)
        //     return prevMovesBlack
        // })
        // updatePossibleMovesWhite((prevMovesWhite) => {
        //     console.log(prevMovesWhite)
        //     return prevMovesWhite
        // })
    }
}

