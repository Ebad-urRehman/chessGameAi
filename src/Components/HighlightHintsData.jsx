export function highlightHint(i, j, isPieceExists, updateHighlightHints, boardState) {
    if(isPieceExists['name'] == 'pawn_w'){
        updateHighlightHints(prevHighlightHints => {
            return {
                [`${i} ${j+1}`]: 'hint',
                [`${i} ${j+2}`]: 'hint',

        }})            
    }
    else if(isPieceExists['name'] == 'rook_w'){
        updateHighlightHints(prevHighlightHints => {
            let hints = {}
            // upper ones
            for(let u=j+1; u<=7; u++) {
            if(boardState[`${i} ${u}`]) {
                    boardState[`${i} ${u}`].name.endsWith('_w')?null:hints[`${i} ${u}`] = 'advantage'
                    break
            }
            else {
                hints[`${i} ${u}`] = 'hint'
            }
        }

        for(let l=j-1; l>=0; l--) {
            if(boardState[`${i} ${l}`]) {
                    boardState[`${i} ${l}`].name.endsWith('_w')?null:hints[`${i} ${l}`] = 'advantage'
                    break
            }
            else {
                hints[`${i} ${l}`] = 'hint'
            }
        }

        for(let lf=i-1; lf>=0; lf--) {
            if(boardState[`${lf} ${j}`]) {
                    boardState[`${lf} ${j}`].name.endsWith('_w')?null:hints[`${lf} ${j}`] = 'advantage'
                    break
            }
            else {
                hints[`${lf} ${j}`] = 'hint'
            }
        }

        for(let r=i+1; r<=7; r++) {
            if(boardState[`${r} ${j}`]) {
                boardState[`${r} ${j}`].name.endsWith('_w')?null:hints[`${r} ${j}`] = 'advantage'
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