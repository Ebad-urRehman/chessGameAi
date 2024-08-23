import React from "react"
import {highlightHint} from './HighlightHintsData'

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState}) {

    function handleClick() {
        isPieceExists?highlightHint(i,j, isPieceExists, updateHighlightHints, boardState):console.log('button without piece click')
        
        // updateboardState((prevBoardState) => ({
        //     ...prevBoardState,
        //     [`${i} ${j}`]: {
        //         ...prevBoardState[`${i} ${j}`],
        //         'url': './images/rook_b.png',
        //         'name': 'rook_b'
        //     }
        // }))
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


