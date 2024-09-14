// THis file is for checking checkmates and stale mates

import { rooksHints } from "./SeperatePiecesHighlights"

export function findPosition(pieceName, boardState) {
    for(let key in boardState) {
        if(boardState[key].name === pieceName) {
            return [boardState[key]['i'], boardState[key]['j']]
        }
    }
}

export function isKingWhiteCheck(boardState) {
    const [i, j] = findPosition('king_w', boardState)
    console.log('position of king is ',i, j)
}


export function virtualTraversalWhite(boardState, updateCheckState) {
        
    for(let piece in boardState) {
        if(boardState[piece].name.endsWith('_w')) {
            let pieceName = boardState[piece].name
            let i = boardState[piece].i
            let j = boardState[piece].j

            if(pieceName == 'pawn_w' && boardState[`${i + 1} ${j+1}`]){
                if(boardState[`${i + 1} ${j+1}`].name == 'king_b') {
                    
                    console.log('Black Checked from left Pawn')
                    updateCheckState((prevcheckState) => [...prevcheckState, `${i + 1} ${j+1}`])
                    console.log(checkedTiles)
                }
            }
            if(pieceName == 'pawn_w' && boardState[`${i - 1} ${j + 1}`]) {
                if(boardState[`${i - 1} ${j + 1}`].name == 'king_b') {
                    updateCheckState((prevcheckState) => [...prevcheckState, `${i-1} ${j+1}`])
                    console.log('checked from right pawn')
                }
            }
            if(pieceName == 'rook_w') {
                rooksCheckCheckWhite(i, j, boardState, updateCheckState)
            }
            if(pieceName == 'knight_w') {
                knightCheckCheckWhite(i, j, boardState, updateCheckState)
                console.log('checking knight checks')
            }
            // if(pieceName == 'bishop_w') {
            //     bishopCheckCheckWhite(i, j, boardState, updateCheckState)
            //     console.log('checking bishop checks')
            // }
        }
    }
}



// defining seperately

export function rooksCheckCheckWhite(i, j, boardState, updateCheckState) {

        let check
        let checkTilesUp = []
        // upper ones
        for(let u=j+1; u<=7; u++) {
            checkTilesUp.push(`${i} ${u}`)
            if(boardState[`${i} ${u}`] && boardState[`${i} ${u}`].name === "king_b") {
                check = 'up'
            }    
        }

        let checkTilesDown = []
        for(let l=j-1; l>=0; l--) {
            checkTilesDown.push(`${i} ${l}`)
            if(boardState[`${i} ${l}`] && boardState[`${i} ${l}`].name === "king_b") {
                check = 'down'        
            } 
        }

        let checkTilesLeft = []
        for(let lf=i-1; lf>=0; lf--) {
            checkTilesLeft.push(`${lf} ${j}`)
            if(boardState[`${lf} ${j}`] && boardState[`${lf} ${j}`].name === "king_b") {
                check = 'left'        
            } 
        }

        let checkTilesRight = []
        for(let r=i+1; r<=7; r++) {
            checkTilesRight.push(`${r} ${j}`)
            if(boardState[`${r} ${j}`] && boardState[`${r} ${j}`].name === "king_b") {
                check = 'right'
            } 
        }

        switch(check) {
            case 'left':
              updateCheckState((prevcheckState) => [...prevcheckState, ...checkTilesLeft])
                break;
            case 'right':
              updateCheckState((prevcheckState) => [...prevcheckState, ...checkTilesRight])
                break;
            case 'up':
              updateCheckState((prevcheckState) => [...prevcheckState, ...checkTilesUp])
                break
            case 'down':
                updateCheckState((prevcheckState) => [...prevcheckState, ...checkTilesDown])
                break
            default:
              break;
          }
        console.log('reach last', checkTilesUp)
    }


export function knightCheckCheckWhite(i, j, boardState, updateCheckState) {
    console.log(i, j)
    if(boardState[`${i+1} ${j+2}`] && boardState[`${i+1} ${j+2}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i+1} ${j+2}`])
    } 

    if(boardState[`${i-1} ${j+2}`] && boardState[`${i-1} ${j+2}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i-1} ${j+2}`])
    } 


    if(boardState[`${i+1} ${j-2}`] && boardState[`${i+1} ${j-2}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i+1} ${j-2}`])
    } 

    if(boardState[`${i-1} ${j-2}`] && boardState[`${i-1} ${j-2}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i-1} ${j-2}`])
    } 

    if(boardState[`${i+2} ${j+1}`] && boardState[`${i+2} ${j+1}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i+2} ${j+1}`])        
    } 

    if(boardState[`${i+2} ${j-1}`] && boardState[`${i+2} ${j-1}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i+2} ${j-1}`])
    } 

    if(boardState[`${i-2} ${j+1}`] && boardState[`${i-2} ${j+1}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i-2} ${j+1}`])
    } 

    if(boardState[`${i-2} ${j-1}`] && boardState[`${i-2} ${j-1}`].name === "king_b") {
        updateCheckState((prevcheckState) => [...prevcheckState, `${i-2} ${j-1}`])
    } 
}



// export function bishopCheckCheckWhite(i, j, boardState, updateCheckState) {
//     updateCheckState((prevcheckState) =>{
//         let checkState = {}
//         let up = j + 1
//         let down = j - 1
//         let left = i - 1
//         let right = i + 1
        
//         let travesalUpLeft = true
//         let travesalUpRight = true
//         let travesalDownLeft = true
//         let travesalDownRight = true

//         // traversing up left and down left diagonals
//         while(left>=0 || right<=7 || up<=7 || down>=0) {
//             if(travesalUpLeft) {
//                 hints[`${left} ${up}`] = chooseHint(boardState[`${left} ${up}`], turn)
//                 travesalUpLeft = hints[`${left} ${up}`] == 'danger' || hints[`${left} ${up}`] == ''?false:true
//             }
            
//             if(travesalUpRight){
//                 hints[`${right} ${up}`] = chooseHint(boardState[`${right} ${up}`], turn)
//                 travesalUpRight = hints[`${right} ${up}`] == 'danger' || hints[`${right} ${up}`] == ''?false:true
//             }

//             if(travesalDownLeft) {
//                 hints[`${left} ${down}`] = chooseHint(boardState[`${left} ${down}`], turn)
//                 travesalDownLeft = hints[`${left} ${down}`] == 'danger' || hints[`${left} ${down}`] == ''?false:true
//             }

//             if(travesalDownRight) {
//                 hints[`${right} ${down}`] = chooseHint(boardState[`${right} ${down}`], turn)
//                 travesalDownRight = hints[`${right} ${down}`] == 'danger' || hints[`${right} ${down}`] == ''?false:true
//             }
            
//             right = right + 1
//             left = left - 1
//             up = up + 1
//             down = down - 1

//         }
//     })
// }