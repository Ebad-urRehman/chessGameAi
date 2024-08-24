export function highlightHint(i, j, updateHighlightHints, boardState) {
    let isPieceExists = boardState[`${i} ${j}`]
    let selectedElement = isPieceExists
    if(isPieceExists['name'] == 'pawn_w'){
        updateHighlightHints(prevHighlightHints => {
            let hints = {}
            if(boardState[`${i} ${j+1}`]) {
                // rival piece diagonal
                if(boardState[`${i} ${j+1}`].name.endsWith('_b') || boardState[`${i} ${j+1}`].name.endsWith('_w')) {
                    
                }
            }
            else {
                hints[`${i} ${j+1}`] = 'hint'
            }

            // check if diagonal right element have enemy or fellow
            if(boardState[`${i+1} ${j+1}`]){
                boardState[`${i+1} ${j+1}`].name.endsWith('_b')?hints[`${i+1} ${j+1}`] = 'danger':null
            }
            

            // check if diagonal left element have enemy or fellow
            if(boardState[`${i-1} ${j+1}`]){
                boardState[`${i-1} ${j+1}`].name.endsWith('_b')?hints[`${i-1} ${j+1}`] = 'danger':null
            }

            // 2nd place element
            if(boardState[`${i} ${j+2}`] || boardState[`${i} ${j+1}`]) {
            }
            else {
                hints[`${i} ${j+2}`] = 'hint'
            }
            return hints
        })            
    }
    else if(isPieceExists['name'] == 'rook_w'){
        updateHighlightHints(prevHighlightHints => {
            let hints = {}
            // upper ones
            for(let u=j+1; u<=7; u++) {
            hints[`${i} ${u}`] = chooseHint(boardState[`${i} ${u}`])
            if(hints[`${i} ${u}`] != 'hint') {
                break
            }
        }

        for(let l=j-1; l>=0; l--) {
            hints[`${i} ${l}`] = chooseHint(boardState[`${i} ${l}`])
            if(hints[`${i} ${l}`] != 'hint') {
                break
            }
        }

        for(let lf=i-1; lf>=0; lf--) {
            hints[`${lf} ${j}`] = chooseHint(boardState[`${lf} ${j}`])
            if(hints[`${lf} ${j}`] != 'hint') {
                break
            }
        }

        for(let r=i+1; r<=7; r++) {
            hints[`${r} ${j}`] = chooseHint(boardState[`${r} ${j}`])
            if(hints[`${r} ${j}`] != 'hint') {
                break
            }
        }

        
            return hints
        })   
        
    }

    else if(isPieceExists['name'] == "knight_w") {
        updateHighlightHints((prevHighlightHints) => {
            let hints = {}
            hints[`${i+1} ${j+2}`] = chooseHint(boardState[`${i+1} ${j+2}`])
            hints[`${i-1} ${j+2}`] = chooseHint(boardState[`${i+1} ${j+2}`])

            hints[`${i+1} ${j-2}`] = chooseHint(boardState[`${i+1} ${j-2}`])
            hints[`${i-1} ${j-2}`] = chooseHint(boardState[`${i-1} ${j-2}`])

            hints[`${i+2} ${j+1}`] = chooseHint(boardState[`${i+2} ${j+1}`])
            hints[`${i+2} ${j-1}`] = chooseHint(boardState[`${i+2} ${j-1}`])

            hints[`${i-2} ${j+1}`] = chooseHint(boardState[`${i-2} ${j+1}`])
            hints[`${i-2} ${j-1}`] = chooseHint(boardState[`${i-2} ${j-1}`])
            return hints
        })
    }
    else if(isPieceExists['name'] == "king_w") {
        updateHighlightHints((prevHighlightHints) => {
            let hints = {}
            hints[`${i+1} ${j+1}`] = chooseHint(boardState[`${i+1} ${j+1}`])
            hints[`${i} ${j+1}`] = chooseHint(boardState[`${i} ${j+1}`])
            hints[`${i-1} ${j+1}`] = chooseHint(boardState[`${i-1} ${j+1}`])

            hints[`${i+1} ${j}`] = chooseHint(boardState[`${i+1} ${j}`])
            hints[`${i-1} ${j}`] = chooseHint(boardState[`${i-1} ${j}`])

            hints[`${i+1} ${j-1}`] = chooseHint(boardState[`${i+1} ${j-1}`])
            hints[`${i} ${j-1}`] = chooseHint(boardState[`${i} ${j-1}`])
            hints[`${i-1} ${j-1}`] = chooseHint(boardState[`${i-1} ${j-1}`])
            return hints
        })
    }
    else if(isPieceExists['name'] == "bishop_w") {
        updateHighlightHints((prevHighlightHints) => {
            let hints = {}
            let up = j + 1
            let down = j - 1
            let left = i - 1
            let right = i + 1
            
            let travesalUpLeft = true
            let travesalUpRight = true
            let travesalDownLeft = true
            let travesalDownRight = true

            // traversing up left and down left diagonals
            while(left>=0 || right<=7 || up<=7 || down>=0) {
                if(travesalUpLeft) {
                    hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`])
                    travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
                }
                
                if(travesalUpRight){
                    hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`])
                    travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
                }

                if(travesalDownLeft) {
                    hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`])
                    travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
                }

                if(travesalDownRight) {
                    hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`])
                    travesalDownRight = hints[`${right} ${down}`] == 'danger' || hints[`${right} ${down}`] == ''?false:true
                }
                
                right = right + 1
                left = left - 1
                up = up + 1
                down = down - 1

            }
            return hints
        })
    }
    else if(isPieceExists['name'] == "queen_w") {
        updateHighlightHints((prevHighlightHints) => {
            let hints = {}
            let up = j + 1
            let down = j - 1
            let left = i - 1
            let right = i + 1
            
            let travesalUpLeft = true
            let travesalUpRight = true
            let travesalDownLeft = true
            let travesalDownRight = true

            // traversing up left and down left diagonals
            while(left>=0 || right<=7 || up<=7 || down>=0) {
                if(travesalUpLeft) {
                    hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`])
                    travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
                }
                
                if(travesalUpRight){
                    hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`])
                    travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
                }

                if(travesalDownLeft) {
                    hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`])
                    travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
                }

                if(travesalDownRight) {
                    hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`])
                    travesalDownRight = hints[`${right} ${down}`] == 'danger' || hints[`${right} ${down}`] == ''?false:true
                }
                
                right = right + 1
                left = left - 1
                up = up + 1
                down = down - 1

            }

            // + traversal
            for(let u=j+1; u<=7; u++) {
                hints[`${i} ${u}`] = chooseHint(boardState[`${i} ${u}`])
                if(hints[`${i} ${u}`] != 'hint') {
                    break
                }
            }
    
            for(let l=j-1; l>=0; l--) {
                hints[`${i} ${l}`] = chooseHint(boardState[`${i} ${l}`])
                if(hints[`${i} ${l}`] != 'hint') {
                    break
                }
            }
    
            for(let lf=i-1; lf>=0; lf--) {
                hints[`${lf} ${j}`] = chooseHint(boardState[`${lf} ${j}`])
                if(hints[`${lf} ${j}`] != 'hint') {
                    break
                }
            }
    
            for(let r=i+1; r<=7; r++) {
                hints[`${r} ${j}`] = chooseHint(boardState[`${r} ${j}`])
                if(hints[`${r} ${j}`] != 'hint') {
                    break
                }
            }

            return hints
        })
    }

    if(isPieceExists.name.endsWith('_w')) {
        return selectedElement
    }
}

function chooseHint(targetTile) {
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


export function makeMove(i, j, updateboardState, selectedElement, updateHighlightHints) {
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
}