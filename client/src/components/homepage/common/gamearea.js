import React from 'react';

const GameArea = (props) => {
    const buildArea = (e, i) => {
        return (
            <div class="element">{e}</div>
        )
    }

    return (
        <div id="gamearea">
            {props.numbers_arr.map(buildArea)}
        </div>
    )
}

export default GameArea;