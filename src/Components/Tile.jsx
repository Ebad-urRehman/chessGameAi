import React from "react"

// const initialBoardState = {
//     '0 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 0, 'j': 1},
//     '1 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 1, 'j': 1},
//     '2 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 2, 'j': 1},
//     '3 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 3, 'j': 1},
//     '4 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 4, 'j': 1},
//     '5 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 5, 'j': 1},
//     '6 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 6, 'j': 1},
//     '7 1': {'url': './images/pawn_w.png', 'name': 'pawn_w', 'i': 7, 'j': 1},
    
//     '0 0': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 0, 'j': 0},
//     '1 0': {'url': './images/knight_w.png', 'name': 'knight_w', 'i': 1, 'j': 0},
//     '2 0': {'url': './images/bishop_w.png', 'name': 'bishop_w', 'i': 2, 'j': 0},
//     '3 0': {'url': './images/queen_w.png', 'name': 'queen_w', 'i': 3, 'j': 0},
//     '4 0': {'url': './images/king_w.png', 'name': 'king_w', 'i': 4, 'j': 0},
//     '5 0': {'url': './images/bishop_w.png', 'name': 'bishop_w', 'i': 5, 'j': 0},
//     '6 0': {'url': './images/knight_w.png', 'name': 'knight_w', 'i': 6, 'j': 0},
//     '7 0': {'url': './images/rook_w.png', 'name': 'rook_w', 'i': 7, 'j': 0},

//     '0 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 0, 'j': 6},
//     '1 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 1, 'j': 6},
//     '2 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 2, 'j': 6},
//     '3 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 3, 'j': 6},
//     '4 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 4, 'j': 6},
//     '5 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 5, 'j': 6},
//     '6 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 6, 'j': 6},
//     '7 6': {'url': './images/pawn_b.png', 'name': 'pawn_b', 'i': 7, 'j': 6},

//     '0 7': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 0, 'j': 7},
//     '1 7': {'url': './images/knight_b.png', 'name': 'knight_b', 'i': 1, 'j': 7},
//     '2 7': {'url': './images/bishop_b.png', 'name': 'bishop_b', 'i': 2, 'j': 7},
//     '3 7': {'url': './images/queen_b.png', 'name': 'queen_b', 'i': 3, 'j': 7},
//     '4 7': {'url': './images/king_b.png', 'name': 'king_b', 'i': 4, 'j': 7},
//     '5 7': {'url': './images/bishop_b.png', 'name': 'bishop_b', 'i': 5, 'j': 7},
//     '6 7': {'url': './images/knight_b.png', 'name': 'knight_b', 'i': 6, 'j': 7},
//     '7 7': {'url': './images/rook_b.png', 'name': 'rook_b', 'i': 7, 'j': 7},
// }

// const initialHighlightHints = {'0 0': 'danger'}

export default function Tile({i, j, highlightHints, boardState, updateHighlightHints, updateboardState}) {
    // const [boardState, updateboardState] = React.useState(initialBoardState)
    // const [highlightHints, updateHighlightHints] = React.useState(initialHighlightHints)

    function handleClick() {
        isPieceExists?hightlightHint():console.log('button without piece click')
        // boardState[`${i} ${j}`] = ['./images/rook_b.png', 'rook_b', i, j]
        // console.log(boardState[`${i} ${j}`])
        
        updateboardState((prevBoardState) => ({
            ...prevBoardState,
            [`${i} ${j}`]: {
                ...prevBoardState[`${i} ${j}`],
                'url': './images/rook_b.png',
                'name': 'rook_b'
            }
        }))
        console.log(boardState)
        console.log(boardState[`${i} ${j}`]) //here
    }

    function hightlightHint() {
        if(isPieceExists['name'] == 'pawn_w'){
            console.log('pawn_w')
            console.log('hightlight before', highlightHints)
            updateHighlightHints(prevHighlightHints => {
                return {
                    ...prevHighlightHints,
                    [`${i} ${j}`]: 'hint',
                    // [`${i} ${j+2}`]: 'hint',
    
            }})
            console.log('highlight hints', highlightHints)
            // console.log(highlightHints[`${i} ${j}`]) //here
            
        }
    }

    let colorClass = ((i + j) % 2) ? 'tile tile-white':'tile tile-black'    
    let isPieceExists = boardState[`${i} ${j}`]
    let ishighlightEffect = highlightHints[`${i} ${j}`]?highlightHints[`${i} ${j}`]:""

    React.useEffect(() => {
        console.log('highlightHints updated', highlightHints);
    }, [highlightHints]);

    React.useEffect(() => {
        console.log('board State updated', boardState);
    }, [boardState]);


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


