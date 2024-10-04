import { bishopPossibleMoves, kingPossibleMoves, knightPossibleMoves, pawnWhitePossibleMoves, pawnBlackPossibleMoves, queenPossibleMoves, rookPossibleMoves } from "./SeperatePossibleMoves"

export const tiles = {
    '0 0': true, '1 0': true, '2 0': true, '3 0': true, '4 0': true, '5 0': true, '6 0': true, '7 0': true,
    '0 1': true, '1 1': true, '2 1': true, '3 1': true, '4 1': true, '5 1': true, '6 1': true, '7 1': true,
    '0 2': true, '1 2': true, '2 2': true, '3 2': true, '4 2': true, '5 2': true, '6 2': true, '7 2': true,
    '0 3': true, '1 3': true, '2 3': true, '3 3': true, '4 3': true, '5 3': true, '6 3': true, '7 3': true,
    '0 4': true, '1 4': true, '2 4': true, '3 4': true, '4 4': true, '5 4': true, '6 4': true, '7 4': true,
    '0 5': true, '1 5': true, '2 5': true, '3 5': true, '4 5': true, '5 5': true, '6 5': true, '7 5': true,
    '0 6': true, '1 6': true, '2 6': true, '3 6': true, '4 6': true, '5 6': true, '6 6': true, '7 6': true,
    '0 7': true, '1 7': true, '2 7': true, '3 7': true, '4 7': true, '5 7': true, '6 7': true, '7 7': true 
}


export function updateMoves(piece, boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let pieceName = piece.name
    if(pieceName == 'pawn_w') {
        pawnWhitePossibleMoves(piece, boardState, updatePossibleMovesWhite)
        updatePossibleMovesWhite((prevMovesWhite) => {
                return prevMovesWhite
        })
    }

    else if(pieceName === 'knight_w') {
        knightPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }

    else if(pieceName == 'rook_w') {
        rookPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }

    else if (pieceName == 'bishop_w') {
        bishopPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    
    }

    else if (pieceName == 'queen_w') {
        queenPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }
    else if(pieceName == 'king_w') {
        kingPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }
    // black

    else if (pieceName == 'pawn_b') {
        pawnBlackPossibleMoves(piece, boardState, updatePossibleMovesBlack)
    }

    else if(pieceName === 'knight_b') {
        knightPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }

    else if(pieceName == 'rook_b') {
        rookPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }

    else if (pieceName == 'bishop_b') {
        bishopPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    
    }

    else if (pieceName == 'queen_b') {
        queenPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }
    else if(pieceName == 'king_b') {
        kingPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
    }

    return piece

}


export function chooseHint(boardState, i, j, turn) {
    let targetTile = boardState[`${i} ${j}`]

    if(`${i} ${j}` in tiles) {
        if(turn == "_b") {
            if(targetTile && targetTile.name.endsWith('_w')) {
            return 'danger'
        }
        else if(!targetTile){
            return 'hint'
        }
        else if(targetTile.name.endsWith('_b')) {
            return ''
        }
        }
        else if(turn == "_w") {
            if(targetTile && targetTile.name.endsWith('_b')) {
                return 'danger'
            }
            else if(!targetTile){
                return 'hint'
            }
            else if(targetTile.name.endsWith('_w')) {
                return ''
            }
        }
}
else {
    return false
}
}