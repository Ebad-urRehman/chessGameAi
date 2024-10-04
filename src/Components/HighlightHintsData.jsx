export function makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, setPawnPromotionWhite, setPawnPromotionBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours) {
    updateHighlightHints({'hint_moves': [], 'danger_moves': []})
    console.log('selected element' ,selectedElement)
    // delete previous element
    updateboardState((prevBoardState) => {
        let newBoardState = {}

        updateboardState((prevBoardState) => ({
            ...prevBoardState,
            [`${i} ${j}`]: {
                'i':i,
                'j':j,
                'url': selectedElement.url,
                'name': selectedElement.name
            }
        }))

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
    
    
    // setting new nieghours for king
    
    let tiles = {
        '0 0': true, '1 0': true, '2 0': true, '3 0': true, '4 0': true, '5 0': true, '6 0': true, '7 0': true,
        '0 1': true, '1 1': true, '2 1': true, '3 1': true, '4 1': true, '5 1': true, '6 1': true, '7 1': true,
        '0 2': true, '1 2': true, '2 2': true, '3 2': true, '4 2': true, '5 2': true, '6 2': true, '7 2': true,
        '0 3': true, '1 3': true, '2 3': true, '3 3': true, '4 3': true, '5 3': true, '6 3': true, '7 3': true,
        '0 4': true, '1 4': true, '2 4': true, '3 4': true, '4 4': true, '5 4': true, '6 4': true, '7 4': true,
        '0 5': true, '1 5': true, '2 5': true, '3 5': true, '4 5': true, '5 5': true, '6 5': true, '7 5': true,
        '0 6': true, '1 6': true, '2 6': true, '3 6': true, '4 6': true, '5 6': true, '6 6': true, '7 6': true,
        '0 7': true, '1 7': true, '2 7': true, '3 7': true, '4 7': true, '5 7': true, '6 7': true, '7 7': true 
    }
    
    
    if(selectedElement.name=='king_w') {
    console.log('asdf')

        updateKingWhiteNeighbours((prevNeighbours) => {
            let newNeigbours = []

            

            if(`${i+1} ${j}` in tiles) {
                newNeigbours.push(`${i+1} ${j}`)
            }
            if(`${i-1} ${j}` in tiles) {
                newNeigbours.push(`${i-1} ${j}`)
            }

            if(`${i+1} ${j+1}` in tiles) {
                newNeigbours.push(`${i+1} ${j+1}`)
            }
            if(`${i} ${j+1}` in tiles) {
                newNeigbours.push(`${i} ${j+1}`)
            }
            if(`${i-1} ${j+1}` in tiles) {
                newNeigbours.push(`${i-1} ${j+1}`)
            }

            if(`${i+1} ${j-1}` in tiles) {
                newNeigbours.push(`${i+1} ${j-1}`)
            }
            if(`${i} ${j-1}` in tiles) {
                newNeigbours.push(`${i} ${j-1}`)
            }
            if(`${i-1} ${j-1}` in tiles) {
                newNeigbours.push(`${i-1} ${j-1}`)
            }
            
            console.log('king new neighbours are' , newNeigbours)

            return newNeigbours
        })       
    }

    if(selectedElement.name=='king_b') {
    console.log('asdf')

        updateKingBlackNeighbours((prevNeighbours) => {
            let newNeigbours = []

            

            if(`${i+1} ${j}` in tiles) {
                newNeigbours.push(`${i+1} ${j}`)
            }
            if(`${i-1} ${j}` in tiles) {
                newNeigbours.push(`${i-1} ${j}`)
            }

            if(`${i+1} ${j+1}` in tiles) {
                newNeigbours.push(`${i+1} ${j+1}`)
            }
            if(`${i} ${j+1}` in tiles) {
                newNeigbours.push(`${i} ${j+1}`)
            }
            if(`${i-1} ${j+1}` in tiles) {
                newNeigbours.push(`${i-1} ${j+1}`)
            }

            if(`${i+1} ${j-1}` in tiles) {
                newNeigbours.push(`${i+1} ${j-1}`)
            }
            if(`${i} ${j-1}` in tiles) {
                newNeigbours.push(`${i} ${j-1}`)
            }
            if(`${i-1} ${j-1}` in tiles) {
                newNeigbours.push(`${i-1} ${j-1}`)
            }
            
            console.log('king new neighbours are' , newNeigbours)
            return newNeigbours
        })       
    }

    // checking check?
    // checkCheckWhite


    let swapTurn = (turn == "_w"?"_b":"_w")
    return swapTurn
}

export function makeMoveCastle(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours) {
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



export function checkCheckWhite(boardState, updateCheckState) {

}


export function findPiece(boardState, pieceName) {
    for(let key in boardState) {
        if(boardState[key].name == pieceName) {
            return key;
        }
    }
}