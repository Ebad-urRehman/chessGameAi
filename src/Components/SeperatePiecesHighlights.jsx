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

