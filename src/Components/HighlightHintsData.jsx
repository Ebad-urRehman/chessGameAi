export function highlightHint(i, j, isPieceExists, updateHighlightHints, boardState) {
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
            if(boardState[`${i} ${u}`]) {
                    boardState[`${i} ${u}`].name.endsWith('_w')?null:hints[`${i} ${u}`] = 'danger'
                    break
            }
            else {
                hints[`${i} ${u}`] = 'hint'
            }
        }

        for(let l=j-1; l>=0; l--) {
            if(boardState[`${i} ${l}`]) {
                    boardState[`${i} ${l}`].name.endsWith('_w')?null:hints[`${i} ${l}`] = 'danger'
                    break
            }
            else {
                hints[`${i} ${l}`] = 'hint'
            }
        }

        for(let lf=i-1; lf>=0; lf--) {
            if(boardState[`${lf} ${j}`]) {
                    boardState[`${lf} ${j}`].name.endsWith('_w')?null:hints[`${lf} ${j}`] = 'danger'
                    break
            }
            else {
                hints[`${lf} ${j}`] = 'hint'
            }
        }

        for(let r=i+1; r<=7; r++) {
            if(boardState[`${r} ${j}`]) {
                boardState[`${r} ${j}`].name.endsWith('_w')?null:hints[`${r} ${j}`] = 'danger'
                break
            }
            else {
                hints[`${r} ${j}`] = 'hint'
            }
        }

        
            return hints
        })            
    }
}