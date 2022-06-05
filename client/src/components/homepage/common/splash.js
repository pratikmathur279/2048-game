import React from 'react';

const SplashPage = (props) => {
    return (
        <div id="splash" className="screen">
            <h1>20<span className="char1">48</span></h1>

            <div className='button-container'>
                <button id="start" onClick={props.startGame}>new game</button>
                <button id="view-leaderboard" onClick={props.viewLeaderboard}>leaderboard</button>
            </div>

        </div>
    );
}

export default SplashPage;