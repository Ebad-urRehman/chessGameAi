import React from "react"
import {highlightHint} from './HighlightHintsData'
import {makeMove} from './HighlightHintsData'

var selectedElement;

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState}) {

    function handleClick() {
        isPieceExists && isPieceExists.name.endsWith('_w')?selectedElement = highlightHint(i,j, updateHighlightHints, boardState):console.log('button without piece click')
        console.log(isPieceExists)
        console.log(selectedElement)
        ishighlightEffect == 'hint' || ishighlightEffect == 'danger'?makeMove(i, j, updateboardState, selectedElement, updateHighlightHints):console.log('')
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


