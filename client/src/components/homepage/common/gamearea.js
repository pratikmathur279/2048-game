import React from 'react';

const GameArea = (props) => {

    const tileColor = (t) => {
        switch (t) {
            case 2: return 'num_2';
            case 4: return 'num_4';
            case 8: return 'num_8';
            case 16: return 'num_16';
            case 32: return 'num_32';
            case 64: return 'num_64';
            case 128: return 'num_128';
            case 256: return 'num_256';
            case 512: return 'num_512';
            case 1024: return 'num_1024';
            case 2048: return 'num_2048';
            default: return 'default';
        }
    }

    const buildArea = (e, i) => {
        return (
            <div className={`element ${tileColor(e)}`}><span>{e}</span></div>
        )
    }

    return (
        <div id="gamearea">
            {props.numbers_arr.map(buildArea)}
        </div>
    )
}

export default GameArea;