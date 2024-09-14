export function checkPawnWhiteHints(i, j, updateHighlightHints, boardState) {
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
        if(boardState[`${i} ${j+2}`] || j!=1) {
        }
        else {
            hints[`${i} ${j+2}`] = 'hint'
        }
        return hints
    })
}
// whic func to call
export function checkPawnBlackHints(i, j, updateHighlightHints, boardState) {
    updateHighlightHints(prevHighlightHints => {
        let hints = {}
        if(boardState[`${i} ${j-1}`]) {
            // rival piece diagonal
            if(boardState[`${i} ${j-1}`].name.endsWith('_w') || boardState[`${i} ${j-1}`].name.endsWith('_b')) {
                
            }
        }
        else {
            hints[`${i} ${j-1}`] = 'hint'
        }

        // check if diagonal right element have enemy or fellow
        if(boardState[`${i+1} ${j-1}`]){
            boardState[`${i+1} ${j-1}`].name.endsWith('_w')?hints[`${i+1} ${j-1}`] = 'danger':null
        }
        

        // check if diagonal left element have enemy or fellow
        if(boardState[`${i-1} ${j-1}`]){
            boardState[`${i-1} ${j-1}`].name.endsWith('_w')?hints[`${i-1} ${j-1}`] = 'danger':null
        }

        // 2nd place element
        if(boardState[`${i} ${j-2}`] || j!=6) {
        }
        else {
            hints[`${i} ${j-2}`] = 'hint'
        }
        return hints
    })
}

export function rooksHints(i, j, updateHighlightHints, boardState, turn) {
    updateHighlightHints(prevHighlightHints => {
        // case when castiling
        if(prevHighlightHints[`${i} ${j}`] == 'advantage') {
            return {}
        }
        
        let hints = {}
        // upper ones
        for(let u=j+1; u<=7; u++) {
        hints[`${i} ${u}`] = chooseHint(boardState[`${i} ${u}`], turn)
        if(hints[`${i} ${u}`] != 'hint') {
            break
        }
    }

    for(let l=j-1; l>=0; l--) {
        hints[`${i} ${l}`] = chooseHint(boardState[`${i} ${l}`], turn)
        if(hints[`${i} ${l}`] != 'hint') {
            break
        }
    }

    for(let lf=i-1; lf>=0; lf--) {
        hints[`${lf} ${j}`] = chooseHint(boardState[`${lf} ${j}`], turn)
        if(hints[`${lf} ${j}`] != 'hint') {
            break
        }
    }

    for(let r=i+1; r<=7; r++) {
        hints[`${r} ${j}`] = chooseHint(boardState[`${r} ${j}`], turn)
        if(hints[`${r} ${j}`] != 'hint') {
            break
        }
    }

    
        return hints
    })
}

export function knightsHints(i, j, updateHighlightHints, boardState, turn) {
    updateHighlightHints((prevHighlightHints) => {
        let hints = {}
        hints[`${i+1} ${j+2}`] = chooseHint(boardState[`${i+1} ${j+2}`], turn)
        hints[`${i-1} ${j+2}`] = chooseHint(boardState[`${i-1} ${j+2}`], turn)

        hints[`${i+1} ${j-2}`] = chooseHint(boardState[`${i+1} ${j-2}`], turn)
        hints[`${i-1} ${j-2}`] = chooseHint(boardState[`${i-1} ${j-2}`], turn)

        hints[`${i+2} ${j+1}`] = chooseHint(boardState[`${i+2} ${j+1}`], turn)
        hints[`${i+2} ${j-1}`] = chooseHint(boardState[`${i+2} ${j-1}`], turn)

        hints[`${i-2} ${j+1}`] = chooseHint(boardState[`${i-2} ${j+1}`], turn)
        hints[`${i-2} ${j-1}`] = chooseHint(boardState[`${i-2} ${j-1}`], turn)
        return hints
    })
}

export function kingsHints(i, j, updateHighlightHints, boardState, turn, updateCheckState) {
    updateHighlightHints((prevHighlightHints) => {
        let hints = {}
        
        
        hints[`${i+1} ${j+1}`] =  chooseHintKing(i+1, j+1, boardState[`${i+1} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j+1}`] = hintValue;
        })
        hints[`${i} ${j+1}`] =  chooseHintKing(i, j+1, boardState[`${i} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i} ${j+1}`] = hintValue;
        })
        hints[`${i-1} ${j+1}`] =  chooseHintKing(i-1, j+1, boardState[`${i-1} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j+1}`] = hintValue;
        })


        hints[`${i+1} ${j}`] =  chooseHintKing(i+1, j, boardState[`${i+1} ${j}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j}`] = hintValue;
        })
        hints[`${i-1} ${j}`] =  chooseHintKing(i-1, j, boardState[`${i-1} ${j}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j}`] = hintValue;
        })

        hints[`${i+1} ${j-1}`] =  chooseHintKing(i+1, j-1, boardState[`${i+1} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j-1}`] = hintValue;
        })
        hints[`${i} ${j-1}`] = chooseHintKing(i, j-1, boardState[`${i} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i} ${j-1}`] = hintValue;
        })
        hints[`${i-1} ${j-1}`] =  chooseHintKing(i-1, j-1, boardState[`${i-1} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j-1}`] = hintValue;
        })


        return hints
    })
}

export function bishopsHints(i, j, updateHighlightHints, boardState, turn) {
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
                hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`], turn)
                travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
            }
            
            if(travesalUpRight){
                hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`], turn)
                travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
            }

            if(travesalDownLeft) {
                hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`], turn)
                travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
            }

            if(travesalDownRight) {
                hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`], turn)
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

export function queensHints(i, j, updateHighlightHints, boardState, turn) {
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
                hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`], turn)
                travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
            }
            
            if(travesalUpRight){
                hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`], turn)
                travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
            }

            if(travesalDownLeft) {
                hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`], turn)
                travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
            }

            if(travesalDownRight) {
                hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`], turn)
                travesalDownRight = hints[`${right} ${down}`] == 'danger' || hints[`${right} ${down}`] == ''?false:true
            }
            
            right = right + 1
            left = left - 1
            up = up + 1
            down = down - 1

        }

        // + traversal
        for(let u=j+1; u<=7; u++) {
            hints[`${i} ${u}`] = chooseHint(boardState[`${i} ${u}`], turn)
            if(hints[`${i} ${u}`] != 'hint') {
                break
            }
        }

        for(let l=j-1; l>=0; l--) {
            hints[`${i} ${l}`] = chooseHint(boardState[`${i} ${l}`], turn)
            if(hints[`${i} ${l}`] != 'hint') {
                break
            }
        }

        for(let lf=i-1; lf>=0; lf--) {
            hints[`${lf} ${j}`] = chooseHint(boardState[`${lf} ${j}`], turn)
            if(hints[`${lf} ${j}`] != 'hint') {
                break
            }
        }

        for(let r=i+1; r<=7; r++) {
            hints[`${r} ${j}`] = chooseHint(boardState[`${r} ${j}`], turn)
            if(hints[`${r} ${j}`] != 'hint') {
                break
            }
        }

        return hints
    })
}

export function chooseHint(targetTile, turn) {
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

export async function chooseHintKing(i, j, targetTile, turn, updateCheckState) {
    let hintValue
    if(turn == "_b") {
    if(targetTile && targetTile.name.endsWith('_w')) {
        await updateCheckState((checkState)=> {
            hintValue = checkState.includes(`${i} ${j}`)?'':'danger'
            return checkState
        })
        return hintValue
    }
    else if(!targetTile){
        await updateCheckState((checkState)=> {
            hintValue = checkState.includes(`${i} ${j}`)?'':'hint'
            console.log('here',checkState, `${i} ${j}`)

            return checkState
        })
        console.log('hint value', hintValue)
        return hintValue
    }
    else if(targetTile.name.endsWith('_b')) {
        return ''
    }
}
    else if(turn == "_w") {
        if(targetTile && targetTile.name.endsWith('_b')) {
            await updateCheckState((checkState)=> {
                hintValue = checkState.includes(`${i} ${j}`)?'':'danger'
                return checkState
            })
            return hintValue
        }
        else if(!targetTile){
            await updateCheckState((checkState)=> {
                hintValue = checkState.includes(`${i} ${j}`)?'':'hint'
                console.log('here',checkState)
                return checkState
    
            })
            return hintValue
        }
        else if(targetTile.name.endsWith('_w')) {
            return ''
        }
    }
}




// Castle moves
export function castleCheck(i, j, updateHighlightHints, boardState, turn, updateCheckState) {
    updateHighlightHints((prevHighlightHints) => {
        let hints = {}

        hints[`${i+1} ${j+1}`] =  chooseHintKing(i+1, j+1, boardState[`${i+1} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j+1}`] = hintValue;
        })
        hints[`${i} ${j+1}`] =  chooseHintKing(i, j+1, boardState[`${i} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i} ${j+1}`] = hintValue;
        })
        hints[`${i-1} ${j+1}`] =  chooseHintKing(i-1, j+1, boardState[`${i-1} ${j+1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j+1}`] = hintValue;
        })


        hints[`${i+1} ${j}`] =  chooseHintKing(i+1, j, boardState[`${i+1} ${j}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j}`] = hintValue;
        })
        hints[`${i-1} ${j}`] =  chooseHintKing(i-1, j, boardState[`${i-1} ${j}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j}`] = hintValue;
        })

        hints[`${i+1} ${j-1}`] =  chooseHintKing(i+1, j-1, boardState[`${i+1} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i+1} ${j-1}`] = hintValue;
        })
        hints[`${i} ${j-1}`] = chooseHintKing(i, j-1, boardState[`${i} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i} ${j-1}`] = hintValue;
        })
        hints[`${i-1} ${j-1}`] =  chooseHintKing(i-1, j-1, boardState[`${i-1} ${j-1}`], turn, updateCheckState)
        .then(hintValue => {
            hints[`${i-1} ${j-1}`] = hintValue;
        })


        console.log('herea re ainht', hints)
        // short castling
        if(!boardState[`${i+1} ${j}`] && !boardState[`${i+2} ${j}`]) {
            hints[`${i+3} ${j}`] = 'advantage'
        }

        // long castling
        if(!boardState[`${i-1} ${j}`] && !boardState[`${i-2} ${j}`] && !boardState[`${i-3} ${j}`]) {
            hints[`${i-4} ${j}`] = 'advantage'
        }
        return hints
    })
}

export function promotePawnWhite(setPawnPromotionWhite, movedPawn, selectedPawn, name, updateboardState) {
    
    // changing that image of pawn to promoted one
    updateboardState((prevBoardState) => ({
        ...prevBoardState,
        [`${movedPawn[1]} ${movedPawn[2]}`]: {
            ...prevBoardState[`${selectedPawn.i} ${selectedPawn.j}`],
            'url': `./images/${name}.png`,
            'name': name
        }
    }))

    setPawnPromotionWhite([false, null])

}

export function promotePawnBlack(setPawnPromotionBlack, movedPawn, selectedPawn, name, updateboardState) {
    
    // changing that image of pawn to promoted one
    updateboardState((prevBoardState) => ({
        ...prevBoardState,
        [`${movedPawn[1]} ${movedPawn[2]}`]: {
            ...prevBoardState[`${selectedPawn.i} ${selectedPawn.j}`],
            'url': `./images/${name}.png`,
            'name': name
        }
    }))

    setPawnPromotionBlack([false, null])

}

