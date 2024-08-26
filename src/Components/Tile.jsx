import React from "react"
import {highlightHintWhite, highlightHintBlack} from './HighlightHintsData'
import {makeMove} from './HighlightHintsData'
import {checkCheckWhite} from './HighlightHintsData'

var selectedElement;
var turn = "_w"

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState}) {

    function handleClick() {
        if(turn=="_w") {
            let isCheck = checkCheckWhite(boardState)
            if(!isCheck) {
                isPieceExists && isPieceExists.name.endsWith('_w')?selectedElement = highlightHintWhite(i,j, updateHighlightHints, boardState):console.log('button without piece click')
            }
        }
        else if(turn=="_b") {
            isPieceExists && isPieceExists.name.endsWith('_b')?selectedElement = highlightHintBlack(i,j, updateHighlightHints, boardState):console.log('button without piece click')    
        }        
        console.log(isPieceExists)
        console.log(selectedElement)
        ishighlightEffect == 'hint' || ishighlightEffect == 'danger'?turn=makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn):console.log('')
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


