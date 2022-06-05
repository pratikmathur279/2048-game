import React from 'react';

import _ from 'lodash';

import logo from '../../logo.svg';
import GameArea from './common/gamearea';
import SplashPage from './common/splash';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            in_game: false,
            numbers_arr: [],
            score: 0
        };

        this.startGame = this.startGame.bind(this);
        this.random = this.random.bind(this);
        this.createRows = this.createRows.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
    }

    componentWillMount() {
        var foo = Array(16).fill().map((v, i) => '');
        this.setState({ numbers_arr: foo, in_game: false });
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown);
    }

    startGame() {
        this.random();
        this.random();

        this.setState({ in_game: true });
    }

    random() {
        let state = Object.assign(this.state);

        var done = false;
        while (done === false) {
            var num = Math.floor(Math.random() * 16);
            if (!state.numbers_arr[num]) {
                state.numbers_arr[num] = 2;
                done = true;
            }
        }
        this.setState(state);
    }

    createRows(original) {
        let length = 4;
        var arr = [];
        var original = _.clone(original);

        while (original.length > 0) {
            var split = original.splice(0, length);
            arr.push(split);
        }

        return arr;
    }

    right() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;
        var score = state.score;

        var can = false;
        var access = false;
        var k;


        for (var i = 14; i > 0; i -= 4) {
            access = false;
            for (var j = i; j >= i - 2; j--) {
                if (arr[j] !== "") {
                    k = j;
                    while (
                        k < i + 1 &&
                        (parseInt(arr[k + 1]) === parseInt(arr[k]) ||
                            arr[k + 1] === "")
                    ) {
                        if (
                            parseInt(arr[k + 1]) === parseInt(arr[k]) &&
                            access === false
                        ) {
                            arr[k + 1] =
                                parseInt(arr[k + 1]) + parseInt(arr[k]);
                            score =
                                parseInt(arr[k + 1]) + parseInt(score);
                            arr[k] = "";
                            can = true;
                            access = true;
                        } else if (
                            parseInt(arr[k + 1]) === parseInt(arr[k]) &&
                            access === true
                        ) {
                            access === false;
                        } else if (arr[k + 1] === "") {
                            arr[k + 1] = parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                        }
                        k += 1;
                    }
                }
            }
        }

        this.setState({ numbers_arr: arr, score }, () => {
            if (can) {
                this.random();
            }
        });
    }

    left() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;
        var score = state.score;

        var can = false;
        var access = false;
        var k;
        for (var i = 13; i > 0; i -= 4) {
            access = false;
            for (var j = i; j <= i + 2; j++) {
                if (arr[j] !== "") {
                    k = j;
                    while (
                        k > i - (i % 4) &&
                        (parseInt(arr[k - 1]) === parseInt(arr[k]) ||
                            arr[k - 1] === "")
                    ) {
                        if (
                            parseInt(arr[k - 1]) === parseInt(arr[k]) &&
                            access === false
                        ) {
                            arr[k - 1] =
                                parseInt(arr[k - 1]) + parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                            access = true;
                            score =
                                parseInt(arr[k - 1]) + parseInt(score);
                        } else if (
                            parseInt(arr[k - 1]) === parseInt(arr[k]) &&
                            access === true
                        ) {
                            access === false;
                        } else if (arr[k - 1] === "") {
                            arr[k - 1] = parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                        }
                        k -= 1;
                    }
                }
            }
        }

        this.setState({ numbers_arr: arr, score }, () => {
            if (can) {
                this.random();
            }
        });
    }

    down() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;
        var score = state.score;

        var can = false;
        var access = false;
        var k;

        for (var i = 11; i > 7; i -= 1) {
            access = false;
            for (var j = i; j >= 0; j = j - 4) {
                if (arr[j] !== "") {
                    k = j;
                    while (
                        k < 12 &&
                        (parseInt(arr[k + 4]) === parseInt(arr[k]) ||
                            arr[k + 4] === "")
                    ) {
                        if (
                            parseInt(arr[k + 4]) === parseInt(arr[k]) &&
                            access === false
                        ) {
                            arr[k + 4] =
                                parseInt(arr[k + 4]) + parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                            access = true;
                            score =
                                parseInt(arr[k + 4]) + parseInt(score);
                        } else if (
                            parseInt(arr[k + 4]) === parseInt(arr[k]) &&
                            access === true
                        ) {
                            access === false;
                        } else if (arr[k + 4] === "") {
                            arr[k + 4] = parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                        }
                        k += 4;
                    }
                }
            }
        }

        this.setState({ numbers_arr: arr, score }, () => {
            if (can) {
                this.random();
            }
        });
    }
    up() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;
        var score = state.score;

        var can = false;
        var access = false;
        var k;

        for (var i = 7; i > 3; i -= 1) {
            access = false;
            for (var j = i; j < i + 9; j += 4) {
                if (arr[j] !== "") {
                    k = j;
                    while (
                        k >= i &&
                        (parseInt(arr[k - 4]) === parseInt(arr[k]) ||
                            arr[k - 4] === "")
                    ) {
                        if (
                            parseInt(arr[k - 4]) === parseInt(arr[k]) &&
                            access === false
                        ) {
                            arr[k - 4] =
                                parseInt(arr[k - 4]) + parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                            access = true;
                            score =
                                parseInt(arr[k - 4]) + parseInt(score);
                        } else if (
                            parseInt(arr[k - 4]) === parseInt(arr[k]) &&
                            access === true
                        ) {
                            access === false;
                        } else if (arr[k - 4] === "") {
                            arr[k - 4] = parseInt(arr[k]);
                            arr[k] = "";
                            can = true;
                        }
                        k -= 4;
                    }
                }
            }
        }

        this.setState({ numbers_arr: arr, score }, () => {
            if (can) {
                this.random();
            }
        });
    }

    _handleKeyDown(e) {
        let key = e.keyCode;

        switch (key) {
            case 37: console.log("left");
                this.left();
                break;
            case 38: console.log("up");
                this.up();
                break;
            case 39: console.log("right");
                this.right();
                break;
            case 40: console.log("down");
                this.down();
        }
    }

    render() {
        return (
            <div className="App">
                <div id="container">
                    {!this.state.in_game ?
                        <SplashPage
                            startGame={this.startGame}
                        />
                        :
                        <div id="game-wrapper">
                            <div id="end" className="screen">end</div>
                            <div id="game" className="screen">
                                <div className='game-header'>
                                    <h1>2048</h1>
                                    <div id="info">
                                        <div id="game-info">
                                            <h2>Score</h2>
                                            <span id="score">{this.state.score}</span>
                                        </div>
                                        <div id="game-info">
                                            <h2>Best</h2>
                                            <span id="best_score">{this.state.score}</span>
                                        </div>
                                        <button class="btn orange" type="button" id="pausebtn" onClick="pause()">menu</button>
                                        <button class="btn orange" type="button" id="pausebtn" onClick="pause()">leaderboard</button>
                                    </div>
                                </div>

                                <div className='game-header'>
                                    <p>Join the numbers and get to the 2048 tile!</p>
                                </div>

                                <GameArea
                                    {...this.state}
                                    arrowAction={this.arrowAction}
                                />
                            </div>
                        </div>
                    }
                </div>
                {/* <div id="control">
                    <h2>Control</h2>
                    <div className='game-actions'>
                        <button onClick={this.left}>left</button>
                        <button onClick={this.up}>up</button>
                        <button onClick={this.down}>down</button>
                        <button onClick={this.right}>right</button>
                    </div>
                    <p>You can also use Arrow keys!</p>
                </div> */}
            </div>
        );
    }
}

export default Homepage;