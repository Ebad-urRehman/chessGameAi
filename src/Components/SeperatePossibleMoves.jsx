import { tiles } from "./PossibleMoves"

export function pawnWhitePossibleMoves(piece, boardState, updatePossibleMovesWhite) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    if(!(boardState[`${i} ${j+1}`])) {
        hint_moves.push(`${i} ${j+1}`)
    }
    if(!(boardState[`${i} ${j+2}`]) && !(boardState[`${i} ${j+1}`])) {
        hint_moves.push(`${i} ${j+2}`)
    }
    if(boardState[`${i+1} ${j+1}`] && boardState[`${i+1} ${j+1}`].name.endsWith('_b')) {
        danger_moves.push(`${i+1} ${j+1}`)
    }
    if(boardState[`${i-1} ${j+1}`] && boardState[`${i-1} ${j+1}`].name.endsWith('_b')) {
        danger_moves.push(`${i-1} ${j+1}`)
    }
    updatePossibleMovesWhite((prevMovesWhite)=> {
        let movesWhite = prevMovesWhite

        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
    })
}

// black
export function pawnBlackPossibleMoves(piece, boardState, updatePossibleMovesBlack) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    if(!(boardState[`${i} ${j-1}`])) {
        hint_moves.push(`${i} ${j-1}`)
    }
    if(!(boardState[`${i} ${j-2}`]) && !(boardState[`${i} ${j-1}`])) {
        hint_moves.push(`${i} ${j-2}`)
    }
    if(boardState[`${i+1} ${j-1}`] && boardState[`${i+1} ${j-1}`].name.endsWith('_w')) {
        danger_moves.push(`${i+1} ${j-1}`)
    }
    if(boardState[`${i-1} ${j-1}`] && boardState[`${i-1} ${j-1}`].name.endsWith('_w')) {
        danger_moves.push(`${i-1} ${j-1}`)
    }
    updatePossibleMovesBlack((prevMovesBlack)=> {
        let movesBlack = prevMovesBlack

        movesBlack[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesBlack
    })
}

export function knightPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    chooseHint(boardState, i+1, j+2, turn) == 'hint' ? hint_moves.push(`${i+1} ${j+2}`): null
    chooseHint(boardState, i-1, j+2, turn) == 'hint'? hint_moves.push(`${i-1} ${j+2}`): null

    chooseHint(boardState, i+1, j-2, turn) == 'hint' ? hint_moves.push(`${i+1} ${j-2}`): null
    chooseHint(boardState, i-1, j-2, turn) == 'hint' ? hint_moves.push(`${i-1} ${j-2}`): null

    chooseHint(boardState, i+2, j+1, turn) == 'hint' ? hint_moves.push(`${i+2} ${j+1}`): null
    chooseHint(boardState, i+2, j-1, turn) == 'hint' ? hint_moves.push(`${i+2} ${j-1}`): null

    chooseHint(boardState, i-2, j+1, turn) == 'hint' ? hint_moves.push(`${i-2} ${j+1}`): null
    chooseHint(boardState, i-2, j-1, turn) == 'hint' ? hint_moves.push(`${i-2} ${j-1}`): null

    // danger check
    chooseHint(boardState, i+1, j+2, turn) == 'danger' ? danger_moves.push(`${i+1} ${j+2}`): null
    chooseHint(boardState, i-1, j+2, turn) == 'danger'? danger_moves.push(`${i-1} ${j+2}`): null

    chooseHint(boardState, i+1, j-2, turn) == 'danger' ? danger_moves.push(`${i+1} ${j-2}`): null
    chooseHint(boardState, i-1, j-2, turn) == 'danger' ? danger_moves.push(`${i-1} ${j-2}`): null

    chooseHint(boardState, i+2, j+1, turn) == 'danger' ? danger_moves.push(`${i+2} ${j+1}`): null
    chooseHint(boardState, i+2, j-1, turn) == 'danger' ? danger_moves.push(`${i+2} ${j-1}`): null

    chooseHint(boardState, i-2, j+1, turn) == 'danger' ? danger_moves.push(`${i-2} ${j+1}`): null
    chooseHint(boardState, i-2, j-1, turn) == 'danger' ? danger_moves.push(`${i-2} ${j-1}`): null
    
    if(turn == '_w') {
        updatePossibleMovesWhite((prevMovesWhite) => {
        let movesWhite = prevMovesWhite

        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
        })
    }
    else {
        updatePossibleMovesBlack((prevMovesBlack) => {
            let movesBlack = prevMovesBlack
    
            movesBlack[`${i} ${j}`] = {
                'hint_moves' : hint_moves,
                'danger_moves': danger_moves
            }
            return movesBlack
            })
    }

}

export function rookPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    for(let u=j+1; u<=7; u++) {
        chooseHint(boardState, i, u, turn) == 'hint' ? hint_moves.push(`${i} ${u}`): null
        chooseHint(boardState, i, u, turn) == 'danger' ? danger_moves.push(`${i} ${u}`): null
        if(!hint_moves.includes(`${i} ${u}`)) {
            break
        }
    }

    for(let l=j-1; l>=0; l--) {
        chooseHint(boardState, i, l, turn) == 'hint' ? hint_moves.push(`${i} ${l}`): null
        chooseHint(boardState, i, l, turn) == 'danger' ? danger_moves.push(`${i} ${l}`): null
        if(!hint_moves.includes(`${i} ${l}`)) {
            break
        }
    }

    for(let lf=i-1; lf>=0; lf--) {
        chooseHint(boardState, lf, j, turn) == 'hint' ? hint_moves.push(`${lf} ${j}`): null
        chooseHint(boardState, lf, j, turn) == 'danger' ? danger_moves.push(`${lf} ${j}`): null
        if(!hint_moves.includes(`${lf} ${j}`)) {
            break
        }
    }

    for(let r=i+1; r<=7; r++) {
        chooseHint(boardState, r, j, turn) == 'hint' ? hint_moves.push(`${r} ${j}`): null
        chooseHint(boardState, r, j, turn) == 'danger' ? danger_moves.push(`${r} ${j}`): null
        if(!hint_moves.includes(`${r} ${j}`)) {
            break
        }
    }

    if(turn == '_w') {
        updatePossibleMovesWhite((prevMovesWhite) => {
        let movesWhite = prevMovesWhite

        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
        })
    }
    else {
        updatePossibleMovesBlack((prevMovesBlack) => {
            let movesBlack = prevMovesBlack
    
            movesBlack[`${i} ${j}`] = {
                'hint_moves' : hint_moves,
                'danger_moves': danger_moves
            }
            return movesBlack
            })
    }
}

export function bishopPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []
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
            // hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`], turn)
            chooseHint(boardState, left, up, turn) == 'hint' ? hint_moves.push(`${left} ${up}`): null
            chooseHint(boardState, left, up, turn) == 'danger' ? danger_moves.push(`${left} ${up}`): null
            if(!hint_moves.includes(`${left} ${up}`)) {
                travesalUpLeft = false
            }
            // travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
        }
        
        if(travesalUpRight){
            // hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`], turn)
            // travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
            chooseHint(boardState, right, up, turn) == 'hint' ? hint_moves.push(`${right} ${up}`): null
            chooseHint(boardState, right, up, turn) == 'danger' ? danger_moves.push(`${right} ${up}`): null
            if(!hint_moves.includes(`${right} ${up}`)) {
                travesalUpRight = false
            }
        }

        if(travesalDownLeft) {
            // hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`], turn)
            // travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
            chooseHint(boardState, left, down, turn) == 'hint' ? hint_moves.push(`${left} ${down}`): null
            chooseHint(boardState, left, down, turn) == 'danger' ? danger_moves.push(`${left} ${down}`): null
            if(!hint_moves.includes(`${left} ${down}`)) {
                travesalDownLeft = false
            }
        }

        if(travesalDownRight) {
            chooseHint(boardState, right, down, turn) == 'hint' ? hint_moves.push(`${right} ${down}`): null
            chooseHint(boardState, right, down, turn) == 'danger' ? danger_moves.push(`${right} ${down}`): null
            if(!hint_moves.includes(`${right} ${down}`)) {
                travesalDownRight = false
            }
        }
        
        right = right + 1
        left = left - 1
        up = up + 1
        down = down - 1
    }
    if(turn == '_w') {
        updatePossibleMovesWhite((prevMovesWhite) => {
        let movesWhite = prevMovesWhite

        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
        })
    }
    else {
        updatePossibleMovesBlack((prevMovesBlack) => {
            let movesBlack = prevMovesBlack
    
            movesBlack[`${i} ${j}`] = {
                'hint_moves' : hint_moves,
                'danger_moves': danger_moves
            }
            return movesBlack
            })
    }
}

export function queenPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    for(let u=j+1; u<=7; u++) {
        chooseHint(boardState, i, u, turn) == 'hint' ? hint_moves.push(`${i} ${u}`): null
        chooseHint(boardState, i, u, turn) == 'danger' ? danger_moves.push(`${i} ${u}`): null
        if(!hint_moves.includes(`${i} ${u}`)) {
            break
        }
    }

    for(let l=j-1; l>=0; l--) {
        chooseHint(boardState, i, l, turn) == 'hint' ? hint_moves.push(`${i} ${l}`): null
        chooseHint(boardState, i, l, turn) == 'danger' ? danger_moves.push(`${i} ${l}`): null
        if(!hint_moves.includes(`${i} ${l}`)) {
            break
        }
    }

    for(let lf=i-1; lf>=0; lf--) {
        chooseHint(boardState, lf, j, turn) == 'hint' ? hint_moves.push(`${lf} ${j}`): null
        chooseHint(boardState, lf, j, turn) == 'danger' ? danger_moves.push(`${lf} ${j}`): null
        if(!hint_moves.includes(`${lf} ${j}`)) {
            break
        }
    }

    for(let r=i+1; r<=7; r++) {
        chooseHint(boardState, r, j, turn) == 'hint' ? hint_moves.push(`${r} ${j}`): null
        chooseHint(boardState, r, j, turn) == 'danger' ? danger_moves.push(`${r} ${j}`): null
        if(!hint_moves.includes(`${r} ${j}`)) {
            break
        }
    }

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
            // hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`], turn)
            chooseHint(boardState, left, up, turn) == 'hint' ? hint_moves.push(`${left} ${up}`): null
            chooseHint(boardState, left, up, turn) == 'danger' ? danger_moves.push(`${left} ${up}`): null
            if(!hint_moves.includes(`${left} ${up}`)) {
                travesalUpLeft = false
            }
            // travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
        }
        
        if(travesalUpRight){
            // hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`], turn)
            // travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
            chooseHint(boardState, right, up, turn) == 'hint' ? hint_moves.push(`${right} ${up}`): null
            chooseHint(boardState, right, up, turn) == 'danger' ? danger_moves.push(`${right} ${up}`): null
            if(!hint_moves.includes(`${right} ${up}`)) {
                travesalUpRight = false
            }
        }

        if(travesalDownLeft) {
            // hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`], turn)
            // travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
            chooseHint(boardState, left, down, turn) == 'hint' ? hint_moves.push(`${left} ${down}`): null
            chooseHint(boardState, left, down, turn) == 'danger' ? danger_moves.push(`${left} ${down}`): null
            if(!hint_moves.includes(`${left} ${down}`)) {
                travesalDownLeft = false
            }
        }

        if(travesalDownRight) {
            // hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`], turn)
            // travesalDownRight = hints[`${right} ${down}`] == 'danger' || hints[`${right} ${down}`] == ''?false:true
            chooseHint(boardState, right, down, turn) == 'hint' ? hint_moves.push(`${right} ${down}`): null
            chooseHint(boardState, right, down, turn) == 'danger' ? danger_moves.push(`${right} ${down}`): null
            if(!hint_moves.includes(`${right} ${down}`)) {
                travesalDownRight = false
            }
        }
        
        right = right + 1
        left = left - 1
        up = up + 1
        down = down - 1
    }

    if(turn == '_w') {
        updatePossibleMovesWhite((prevMovesWhite) => {
        let movesWhite = prevMovesWhite

        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
        })
    }
    else {
        updatePossibleMovesBlack((prevMovesBlack) => {
            let movesBlack = prevMovesBlack
    
            movesBlack[`${i} ${j}`] = {
                'hint_moves' : hint_moves,
                'danger_moves': danger_moves
            }
            return movesBlack
            })
    }
}

export function kingPossibleMoves(piece, boardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn) {
    let i = piece.i
    let j = piece.j

    let hint_moves = []
    let danger_moves = []

    chooseHint(boardState, i+1, j+1, turn) == 'hint' ? hint_moves.push(`${i+1} ${j+1}`): null
    chooseHint(boardState, i, j+1, turn) == 'hint'? hint_moves.push(`${i} ${j+1}`): null
    chooseHint(boardState, i-1, j+1, turn) == 'hint' ? hint_moves.push(`${i-1} ${j+1}`): null

    chooseHint(boardState, i-1, j, turn) == 'hint' ? hint_moves.push(`${i-1} ${j}`): null
    chooseHint(boardState, i+1, j, turn) == 'hint' ? hint_moves.push(`${i+1} ${j}`): null

    chooseHint(boardState, i+1, j-1, turn) == 'hint' ? hint_moves.push(`${i+1} ${j-1}`): null
    chooseHint(boardState, i-1, j-1, turn) == 'hint' ? hint_moves.push(`${i-1} ${j-1}`): null

    // danger check
    chooseHint(boardState, i+1, j+1, turn) == 'danger' ? danger_moves.push(`${i+1} ${j+1}`): null
    chooseHint(boardState, i, j+1, turn) == 'danger'? danger_moves.push(`${i} ${j+1}`): null
    chooseHint(boardState, i-1, j+1, turn) == 'danger' ? danger_moves.push(`${i-1} ${j+1}`): null

    chooseHint(boardState, i-1, j, turn) == 'danger' ? danger_moves.push(`${i-1} ${j}`): null
    chooseHint(boardState, i+1, j, turn) == 'danger' ? danger_moves.push(`${i+1} ${j}`): null

    chooseHint(boardState, i+1, j-1, turn) == 'danger' ? danger_moves.push(`${i+1} ${j-1}`): null
    chooseHint(boardState, i, j-1, turn) == 'danger'? danger_moves.push(`${i} ${j+1}`): null
    chooseHint(boardState, i-1, j-1, turn) == 'danger' ? danger_moves.push(`${i-1} ${j-1}`): null
    

    if(turn == '_w') {
        updatePossibleMovesWhite((prevMovesWhite) => {
        let movesWhite = prevMovesWhite
        movesWhite[`${i} ${j}`] = {
            'hint_moves' : hint_moves,
            'danger_moves': danger_moves
        }
        return movesWhite
        })
    }
    else {
        updatePossibleMovesBlack((prevMovesBlack) => {
            let movesBlack = prevMovesBlack
    
            movesBlack[`${i} ${j}`] = {
                'hint_moves' : hint_moves,
                'danger_moves': danger_moves
            }
            return movesBlack
            })
    }
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