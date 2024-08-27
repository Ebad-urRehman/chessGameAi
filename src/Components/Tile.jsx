import React from "react"
import {highlightHintWhite, highlightHintBlack} from './HighlightHintsData'
import {makeMove, makeMoveCastle} from './HighlightHintsData'
import {checkCheckWhite} from './HighlightHintsData'

var selectedElement;
var turn = "_w"

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState, setIsKingRookMovedWhite, setIsKingRookMovedBlack, isKingRookMovedWhite, isKingRookMovedBlack}) {

    function handleClick() {
        if(turn=="_w") {
            // let isCheck = checkCheckWhite(updateHighlightHints, boardState)
            // if(!isCheck) {
            isPieceExists && isPieceExists.name.endsWith('_w')?selectedElement = highlightHintWhite(i,j, updateHighlightHints, boardState, isKingRookMovedWhite):console.log('button without piece click')
            // }
        }
        else if(turn=="_b") {
            isPieceExists && isPieceExists.name.endsWith('_b')?selectedElement = highlightHintBlack(i,j, updateHighlightHints, boardState, isKingRookMovedBlack):console.log('button without piece click')    
        }        
        console.log(isPieceExists)
        console.log(selectedElement)
        ishighlightEffect == 'hint' || ishighlightEffect == 'danger'?turn=makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack):console.log('')
        ishighlightEffect == 'advantage' ? turn=makeMoveCastle(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack): console.log('not castled')
    }
    


    let colorClass = ((i + j) % 2) ? 'tile tile-white':'tile tile-black'    
    let isPieceExists = boardState[`${i} ${j}`]
    let ishighlightEffect = highlightHints[`${i} ${j}`]?highlightHints[`${i} ${j}`]:""

    return (
    <div className={`${colorClass} ${ishighlightEffect}`}
        id={`${i} ${j}`}
        onClick={handleClick}>
        <Piece i={i} j={j} isPieceExists={isPieceExists}/>
    </div>
)



function Piece(props) {
    return(
        <>
            {props.isPieceExists?<img className="piece" src={boardState[`${props.i} ${props.j}`]['url']}/>:''}
        </>
    )
}

}


