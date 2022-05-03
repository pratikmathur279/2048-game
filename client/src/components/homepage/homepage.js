import React from 'react';

import logo from '../../logo.svg';
import GameArea from './common/gamearea';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            in_game: false,
            numbers_arr: []
        };

        this.startGame = this.startGame.bind(this);
        this.random = this.random.bind(this);
    }

    componentWillMount() {
        // var foo = new Array(16);

        var foo = Array(16).fill().map((v, i) => '');

        this.setState({ numbers_arr: foo, in_game: true });
    }

    startGame() {
        var splash = document.getElementById("splash");
        var game = document.getElementById("game");
        splash.style.display = "none";
        game.style.display = "block";
        this.random();
        this.random();
    }

    random() {
        let state = Object.assign(this.state);

        var done = false;
        while (done === false) {
            var num = Math.floor(Math.random() * 16);
            if (!state.numbers_arr[num]) {
                console.log(num);
                state.numbers_arr[num] = 2;
                done = true;
            }
        }
        this.setState(state);
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <div id="container">
                    {this.state.in_game ?
                        <div id="splash" class="screen">
                            <h1>20<span class="char1">4</span><span class="char2">8</span></h1>
                            <button id="start" onClick={this.startGame}>new game</button>
                        </div>
                        : null}

                    <div id="pause" class="screen">
                        <h1>Paused</h1>
                        <button onclick="reset()">reset</button>
                        <button onclick="resume()">continue</button>
                    </div>
                    <div id="end" class="screen">end</div>
                    <div id="game" class="screen">
                        <h1>2048</h1>
                        <div id="info">Score:
                            <span id="score"></span>
                            <button type="button" id="pausebtn" onClick="pause()">pause</button>
                        </div>

                        <GameArea
                            {...this.state}
                        />
                    </div>
                </div>
                <div id="control">
                    <h2>Control</h2>
                    <button onclick="left()">left</button>
                    <button onclick="up()">up</button>
                    <button onclick="down()">down</button>
                    <button onclick="right()">right</button>
                </div>
                <p>You can also use Arrow keys!</p>
            </div>
        );
    }
}

export default Homepage;