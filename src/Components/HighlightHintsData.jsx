import { checkPawnWhiteHints, rooksHints, knightsHints, kingsHints, bishopsHints, queensHints, checkPawnBlackHints } from "./SeperatePiecesHighlights"
import { castleCheck } from "./SeperatePiecesHighlights"

export function highlightHintWhite(i, j, updateHighlightHints, boardState, isKingRookMovedWhite) {
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
        if(isKingRookMovedWhite) {
            kingsHints(i, j, updateHighlightHints, boardState, "_w")
        }
        else {
            castleCheck(i, j, updateHighlightHints, boardState, "_w")
        }
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


export function highlightHintBlack(i, j, updateHighlightHints, boardState, isKingRookMovedBlack) {
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
        if(isKingRookMovedBlack) {
            kingsHints(i, j, updateHighlightHints, boardState, "_b")
        }
        else {
            castleCheck(i, j, updateHighlightHints, boardState, "_b")
        }
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



export function makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, setPawnPromotionWhite, setPawnPromotionBlack) {
    updateHighlightHints({})
    console.log('selected element' ,selectedElement)
    // delete previous element
    updateboardState((prevBoardState) => {
        let newBoardState = {}

        for(let key in prevBoardState) {
            if(prevBoardState[key] !== selectedElement) {
                newBoardState[key] = prevBoardState[key]
            }
            else {
                // check if king or rook(is the moved one) to stop castling if it moved once
                if(selectedElement.name == 'rook_w' || selectedElement.name == 'king_w') {
                    setIsKingRookMovedWhite(true)
                }
                else if(selectedElement.name == 'rook_b' || selectedElement.name == 'king_b') {
                    setIsKingRookMovedBlack(true)
                }

                // upgrading pawn 
                if(selectedElement.name == 'pawn_w' && j==7) {
                    setPawnPromotionWhite((isPromotion) => {
                        console.log('ispromotion', isPromotion)
                        return [true, i, j]
                    })
                }
                

                if(selectedElement.name == 'pawn_b' && j==0) {
                    setPawnPromotionBlack((isPromotion) => {
                        return [true, i, j]
                    })
                }
                
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

export function makeMoveCastle(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack) {
    if(turn == '_w') {
        if(i==0) {
        console.log('long castle triggered')
        updateboardState((prevBoardState) => {
            let newBoardState = {}

            // deleting current rook and king position
            for(let key in prevBoardState) {
                if(prevBoardState[key] !== selectedElement && prevBoardState[key] !== prevBoardState['4 0']) {
                    newBoardState[key] = prevBoardState[key]
                    console.log('new' ,newBoardState)
                }
            }

            // adding new rook and king possition
            newBoardState['2 0'] = {'url': './images/king_w.png', 'name': 'king_w', 'i': 2, 'j': 0}
            newBoardState['3 0'] = {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 3, 'j': 0}

            console.log('new board', newBoardState)
            return newBoardState
        })

    }
    else if(i==7) {
        console.log('short castle triggered')
        updateboardState((prevBoardState) => {
            let newBoardState = {}

            // deleting current rook and king position
            for(let key in prevBoardState) {
                if(prevBoardState[key] !== selectedElement && prevBoardState[key] !== prevBoardState['4 0']) {
                    newBoardState[key] = prevBoardState[key]
                    console.log('new' ,newBoardState)
                }
            }

            // adding new rook and king possition
            newBoardState['6 0'] = {'url': './images/king_w.png', 'name': 'king_w', 'i': 6, 'j': 0}
            newBoardState['5 0'] = {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 5, 'j': 0}

            console.log('new board', newBoardState)
            return newBoardState
        })
    }

    // rooks castle onced
    setIsKingRookMovedWhite(true)
}

else if(turn == '_b') {
    if(i==0) {
    console.log('long castle triggered')
    updateboardState((prevBoardState) => {
        let newBoardState = {}

        // deleting current rook and king position
        for(let key in prevBoardState) {
            if(prevBoardState[key] !== selectedElement && prevBoardState[key] !== prevBoardState['4 7']) {
                newBoardState[key] = prevBoardState[key]
                console.log('new' ,newBoardState)
            }
        }

        // adding new rook and king possition
        newBoardState['2 7'] = {'url': './images/king_b.png', 'name': 'king_b', 'i': 2, 'j': 7}
        newBoardState['3 7'] = {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 3, 'j': 7}

        console.log('new board', newBoardState)
        return newBoardState
    })

}
else if(i==7) {
    console.log('short castle triggered')
    updateboardState((prevBoardState) => {
        let newBoardState = {}

        // deleting current rook and king position
        for(let key in prevBoardState) {
            if(prevBoardState[key] !== selectedElement && prevBoardState[key] !== prevBoardState['4 7']) {
                newBoardState[key] = prevBoardState[key]
                console.log('new' ,newBoardState)
            }
        }

        // adding new rook and king possition
        newBoardState['6 7'] = {'url': './images/king_b.png', 'name': 'king_b', 'i': 6, 'j': 7}
        newBoardState['5 7'] = {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 5, 'j': 7}

        console.log('new board', newBoardState)
        return newBoardState
    })
}
    setIsKingRookMovedBlack(true)

}
    let swapTurn = (turn == "_w"?"_b":"_w")
    return swapTurn
}



export function checkCheckWhite(updateHighlightHints, boardState) {
    let king_index = findPiece(boardState, 'king_w')
    console.log('king white is at position ', king_index)
    // checkPawnBlackHints(6, 6, updateHighlightHints, boardState);
    // rooksHints(6, 6, updateHighlightHints, boardState, "_b");
    // bishopsHints(5, 5, updateHighlightHints, boardState, "_w");
    // queensHints(5, 5, updateHighlightHints, boardState, "_w");
    // kingsHints(5, 5, updateHighlightHints, boardState, "_w");
    return true
}


export function findPiece(boardState, pieceName) {
    for(let key in boardState) {
        if(boardState[key].name == pieceName) {
            return key;
        }
    }
}