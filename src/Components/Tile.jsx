import React, { useEffect, useState } from "react"
import { makeMove, makeMoveCastle } from './HighlightHintsData'
import { promotePawnWhite, promotePawnBlack } from "./SeperatePiecesHighlights"
import { isKingWhiteCheck } from "./Mates"
import { virtualTraversalWhite } from "./Mates"
import { updateMoves } from "./PossibleMoves"
import { generateAllMoves } from "./HandlePossibleMoves"

var selectedElement
var turn = "_b"

export default function Tile({ 
    i, j, highlightHints, boardState, 
    updateHighlightHints, updateboardState,
    setIsKingRookMovedWhite, setIsKingRookMovedBlack,
    isKingRookMovedWhite, isKingRookMovedBlack,
    setPawnPromotionWhite, setPawnPromotionBlack, 
    pawnPromotionWhite, pawnPromotionBlack,
    updateCheckState, checkState, 
    updateKingWhiteNeighbours, updateKingBlackNeighbours,
    possibleMovesWhite, possibleMovesBlack,
    updatePossibleMovesWhite, updatePossibleMovesBlack
}) {
    const [ishighlightEffect, setIsHighlightEffect] = useState('')
    // This effect will update highlight effects based on highlight hints
        useEffect(() => {
        if (highlightHints['hint_moves'].includes(`${i} ${j}`)) {
            setIsHighlightEffect('hint')
        } else if (highlightHints['danger_moves'].includes(`${i} ${j}`)) {
            setIsHighlightEffect('danger')
        } else {
            setIsHighlightEffect('')
        }
    }, [highlightHints, i, j])

    // Handle the tile click event
    function handleClick() {
        generateAllMoves(boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack)

        let isPieceExists = boardState[`${i} ${j}`]

        if (turn === "_w") {
            if (isPieceExists && isPieceExists.name.endsWith('_w')) {
                selectedElement = updateMoves(isPieceExists, boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
                //updating possible moves
                updatePossibleMovesWhite((movesWhite) => {
                    console.log(movesWhite)
                    updateHighlightHints((highlightHints) => {
                        let currentHighlightHints = {
                            ...highlightHints,
                            hint_moves: movesWhite[`${i} ${j}`]['hint_moves'],
                            danger_moves: movesWhite[`${i} ${j}`]['danger_moves'],
                        }
                        console.log('current', currentHighlightHints)
                        return currentHighlightHints
                    })
                    return movesWhite
                })
            } else {
                console.log('button without piece clicked')
            }

            
        } else if (turn === "_b") {
            if (isPieceExists && isPieceExists.name.endsWith('_b')) {
                selectedElement = updateMoves(isPieceExists, boardState, updateboardState, updatePossibleMovesWhite, updatePossibleMovesBlack, turn)
                // updating possible moves
                updatePossibleMovesBlack((movesBlack) => {
                    console.log('moves black',movesBlack)
                    updateHighlightHints((highlightHints) => {
                        let currentHighlightHints = {
                            ...highlightHints,
                            hint_moves: movesBlack[`${i} ${j}`]['hint_moves'],
                            danger_moves: movesBlack[`${i} ${j}`]['danger_moves'],
                        }
                        console.log('current', currentHighlightHints)
                        return currentHighlightHints
                    })
                    return movesBlack
                })
            } else {
                console.log('button without piece clicked')
            }
            
            
        }

        console.log(isPieceExists)
        console.log(selectedElement)

        if (ishighlightEffect === 'hint' || ishighlightEffect === 'danger') {
            turn = makeMove(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, setPawnPromotionWhite, setPawnPromotionBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours, updateCheckState)
        } else if (ishighlightEffect === 'advantage') {
            turn = makeMoveCastle(i, j, updateboardState, selectedElement, updateHighlightHints, turn, setIsKingRookMovedWhite, setIsKingRookMovedBlack, updateKingWhiteNeighbours, updateKingBlackNeighbours)
        } else {
            console.log('not castled')
        }
    }

    let colorClass = (i + j) % 2 ? 'tile tile-white' : 'tile tile-black'
    let isPieceExists = boardState[`${i} ${j}`]

    return (
        <div className={`${colorClass} ${ishighlightEffect}`} id={`${i} ${j}`}
            onClick={!(pawnPromotionWhite[0] || pawnPromotionBlack[0]) ? handleClick : () => console.log('click disabled')}>
            <Piece i={i} j={j} isPieceExists={isPieceExists} />
        </div>
    )
}

function Piece(props) {
    return (
        <>
            {props.isPieceExists ? <img className="piece" src={props.isPieceExists.url} /> : ''}
        </>
    )
}

export function TilePawnSelection({ setPawnPromotionWhite, setPawnPromotionBlack, pawnPromotionWhite, pawnPromotionBlack, updateboardState }) {
    let hiddenWhite = pawnPromotionWhite[0] === true ? '' : 'pawn-upgrade-hidden'
    let hiddenBlack = pawnPromotionBlack[0] === true ? '' : 'pawn-upgrade-hidden'

    return (
        <div>
            <div className={`pawn-upgrade-white ${hiddenWhite}`}>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "queen_w", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/queen_w.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "knight_w", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/knight_w.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "bishop_w", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/bishop_w.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnWhite(setPawnPromotionWhite, pawnPromotionWhite, selectedElement, "rook_w", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/rook_w.png"></img>
                </div>
            </div>
            <div className={`pawn-upgrade-black ${hiddenBlack}`}>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "queen_b", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/queen_b.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "knight_b", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/knight_b.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "bishop_b", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/bishop_b.png"></img>
                </div>
                <div className="pawn-upgrade-tile" onClick={() => promotePawnBlack(setPawnPromotionBlack, pawnPromotionBlack, selectedElement, "rook_b", updateboardState)}>
                    <img className="pawn-upgrade-piece" src="./images/rook_b.png"></img>
                </div>
            </div>
        </div>
    )
}
