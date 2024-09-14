import React from "react"
import {highlightHintWhite, highlightHintBlack} from './HighlightHintsData'
import {makeMove, makeMoveCastle} from './HighlightHintsData'
import {checkCheckWhite} from './HighlightHintsData'
import { promotePawnWhite, promotePawnBlack} from "./SeperatePiecesHighlights";
import { isKingWhiteCheck } from "./Mates";
import { virtualTraversalWhite } from "./Mates";

var selectedElement;
var turn = "_w"

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState, setIsKingRookMovedWhite, setIsKingRookMovedBlack, isKingRookMovedWhite, isKingRookMovedBlack, setPawnPromotionWhite, setPawnPromotionBlack, pawnPromotionWhite, pawnPromotionBlack, updateCheckState, checkState, updateRemoveCheck, removeCheck, updateKingWhiteNeighbours, updateKingBlackNeighbours}) {

    function handleClick() {
        if(turn=="_w") {
            // isKingWhiteCheck(boardState)
            // let isCheck = checkCheckWhite(updateHighlightHints, boardState)
            // if(!isCheck) {
            isPieceExists && isPieceExists.name.endsWith('_w')?selectedElement = highlightHintWhite(i,j, updateHighlightHints, boardState, isKingRookMovedWhite, updateCheckState):console.log('button without piece click')
            // }
        }
        else if(turn=="_b") {
            virtualTraversalWhite(boardState, updateCheckState)
            isPieceExists && isPieceExists.name.endsWith('_b')?selectedElement = highlightHintBlack(i,j, updateHighlightHints, boardState, isKingRookMovedBlack, updateCheckState):console.log('button without piece click')    
        }        
        console.log(isPieceExists)
        console.log(selectedElement)
        ishighlightEffect == 'hint' || ishighlightEffect == 'danger'?turn=makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, setPawnPromotionWhite, setPawnPromotionBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours, updateCheckState):console.log('')
        ishighlightEffect == 'advantage' ? turn=makeMoveCastle(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours): console.log('not castled')
    }
    


    let colorClass = ((i + j) % 2) ? 'tile tile-white':'tile tile-black'    
    let isPieceExists = boardState[`${i} ${j}`]
    let ishighlightEffect = highlightHints[`${i} ${j}`]?highlightHints[`${i} ${j}`]:""

    return (
    <div className={`${colorClass} ${ishighlightEffect}`}
        id={`${i} ${j}`}
        onClick={!(pawnPromotionWhite[0] || pawnPromotionBlack[0])? handleClick:()=>(console.log('click disabled'))}>
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


export function TilePawnSelection({setPawnPromotionWhite, setPawnPromotionBlack, pawnPromotionWhite, pawnPromotionBlack, updateboardState}) {
    let hiddenWhite = pawnPromotionWhite[0]==true?'':'pawn-upgrade-hidden'
    let hiddenBlack = pawnPromotionBlack[0]==true?'':'pawn-upgrade-hidden'

    return(
    <div>
        <div className={`pawn-upgrade-white ${hiddenWhite}`}>
        <div className="pawn-upgrade-tile" onClick={()=>promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "queen_w", updateboardState)}>
                <img className="pawn-upgrade-piece" src="./images/queen_w.png"></img>
            </div>
            <div className="pawn-upgrade-tile" onClick={()=>promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "knight_w", updateboardState)}>
                <img className="pawn-upgrade-piece" src="./images/knight_w.png"></img>
            </div>
            <div className="pawn-upgrade-tile" onClick={()=>promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "bishop_w", updateboardState)}>
                <img className="pawn-upgrade-piece" src="./images/bishop_w.png"></img>
            </div>
            <div className="pawn-upgrade-tile" onClick={()=>promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "rook_w", updateboardState)}>
                <img className="pawn-upgrade-piece" src="./images/rook_w.png"></img>
            </div>
        </div>
        <div className={`pawn-upgrade-black ${hiddenBlack}`}>
            <div className="pawn-upgrade-tile">
                <img className="pawn-upgrade-piece" src="./images/queen_b.png"  onClick={()=>promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "queen_b", updateboardState)}></img>
            </div>
            <div className="pawn-upgrade-tile">
                <img className="pawn-upgrade-piece" src="./images/knight_b.png"  onClick={()=>promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "knight_b", updateboardState)}></img>
            </div>
            <div className="pawn-upgrade-tile">
                <img className="pawn-upgrade-piece" src="./images/bishop_b.png"  onClick={()=>promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "bishop_b", updateboardState)}></img>
            </div>
            <div className="pawn-upgrade-tile">
                <img className="pawn-upgrade-piece" src="./images/rook_b.png"  onClick={()=>promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "rook_b", updateboardState)}></img>
            </div>
        </div>
    </div>
    )
}

