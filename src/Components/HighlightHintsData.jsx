import { checkPawnWhiteHints, rooksHints, knightsHints, kingsHints, bishopsHints, queensHints, checkPawnBlackHints } from "./SeperatePiecesHighlights"

export function highlightHintWhite(i, j, updateHighlightHints, boardState) {
    let isPieceExists = boardState[`${i} ${j}`]
    let selectedElement = isPieceExists
    if(isPieceExists['name'] == 'pawn_w'){
         checkPawnWhiteHints(i, j, updateHighlightHints, boardState)           
    }
    else if(isPieceExists['name'] == 'rook_w'){
        rooksHints(i, j, updateHighlightHints, boardState, "_w")
        
    }

    else if(isPieceExists['name'] == "knight_w") {
        knightsHints(i, j, updateHighlightHints, boardState, "_w")
    }
    else if(isPieceExists['name'] == "king_w") {
        kingsHints(i, j, updateHighlightHints, boardState, "_w")
    }
    else if(isPieceExists['name'] == "bishop_w") {
        bishopsHints(i, j ,updateHighlightHints, boardState, "_w")
    }
    else if(isPieceExists['name'] == "queen_w") {
        queensHints(i, j, updateHighlightHints, boardState, "_w")
    }

    if(isPieceExists.name.endsWith('_w')) {
        return selectedElement
    }
}


export function highlightHintBlack(i, j, updateHighlightHints, boardState) {
    let isPieceExists = boardState[`${i} ${j}`]
    let selectedElement = isPieceExists
    if(isPieceExists['name'] == 'pawn_b'){
        checkPawnBlackHints(i, j, updateHighlightHints, boardState) 
    }
    else if(isPieceExists['name'] == 'rook_b'){
        rooksHints(i, j, updateHighlightHints, boardState, "_b")
        
    }

    else if(isPieceExists['name'] == "knight_b") {
        knightsHints(i, j, updateHighlightHints, boardState, "_b")
    }
    else if(isPieceExists['name'] == "king_b") {
        kingsHints(i, j, updateHighlightHints, boardState, "_b")
    }
    else if(isPieceExists['name'] == "bishop_b") {
        bishopsHints(i, j, updateHighlightHints, boardState, "_b")
    }
    else if(isPieceExists['name'] == "queen_b") {
        queensHints(i, j, updateHighlightHints, boardState, "_b")
    }

    if(isPieceExists.name.endsWith('_b')) {
        return selectedElement
    }
}



export function makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn) {
    updateHighlightHints({})
    console.log('selected element' ,selectedElement)
    // delete previous element
    updateboardState((prevBoardState) => {
        let newBoardState = {}

        for(let key in prevBoardState) {
            if(prevBoardState[key] !== selectedElement) {
                newBoardState[key] = prevBoardState[key]
            }
        }

        return newBoardState
    })
    
    updateboardState((prevBoardState) => ({
        ...prevBoardState,
        [`${i} ${j}`]: {
            ...prevBoardState[`${i} ${j}`],
            'url': selectedElement.url,
            'name': selectedElement.name
        }
    }))
    let swapTurn = (turn == "_w"?"_b":"_w")
    return swapTurn
}

export function checkCheckWhite(boardState) {
    let king_index = findPiece(boardState, 'king_w')
    console.log('king white is at position ', king_index)
}


export function findPiece(boardState, pieceName) {
    for(let key in boardState) {
        if(boardState[key].name == pieceName) {
            return key;
        }
    }
}