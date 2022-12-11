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
        this.av = this.av.bind(this);
        this.check = this.check.bind(this);
        this.end = this.end.bind(this);
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

    check() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;

        var x = false;
        for (var i = 0; i < 16; i++) {
            switch (i) {
                case 0:
                    if (
                        arr[1] === arr[0] ||
                        arr[4] === arr[0]
                    ) {
                        x = true;
                    }
                    break;
                case 1:
                    if (
                        arr[1] === arr[0] ||
                        arr[2] === arr[1] ||
                        arr[1] === arr[5]
                    ) {
                        x = true;
                    }
                    break;
                case 2:
                    if (
                        arr[2] === arr[1] ||
                        arr[3] === arr[2] ||
                        arr[2] === arr[6]
                    ) {
                        x = true;
                    }
                    break;
                case 3:
                    if (
                        arr[3] === arr[2] ||
                        arr[3] === arr[7]
                    ) {
                        x = true;
                    }
                    break;
                case 4:
                    if (
                        arr[4] === arr[0] ||
                        arr[4] === arr[8] ||
                        arr[4] === arr[5]
                    ) {
                        x = true;
                    }
                    break;
                case 5:
                    if (
                        arr[5] === arr[1] ||
                        arr[5] === arr[6] ||
                        arr[4] === arr[5] ||
                        arr[5] === arr[9]
                    ) {
                        x = true;
                    }
                    break;
                case 6:
                    if (
                        arr[6] === arr[5] ||
                        arr[6] === arr[2] ||
                        arr[6] === arr[7] ||
                        arr[6] === arr[10]
                    ) {
                        x = true;
                    }
                    break;
                case 7:
                    if (
                        arr[7] === arr[3] ||
                        arr[7] === arr[11] ||
                        arr[7] === arr[6]
                    ) {
                        x = true;
                    }
                    break;
                case 8:
                    if (
                        arr[8] === arr[4] ||
                        arr[8] === arr[12] ||
                        arr[8] === arr[9]
                    ) {
                        x = true;
                    }
                    break;
                case 9:
                    if (
                        arr[9] === arr[8] ||
                        arr[9] === arr[5] ||
                        arr[9] === arr[10] ||
                        arr[9] === arr[13]
                    ) {
                        x = true;
                    }
                    break;
                case 10:
                    if (
                        arr[10] === arr[9] ||
                        arr[10] === arr[11] ||
                        arr[10] === arr[6] ||
                        arr[10] === arr[14]
                    ) {
                        x = true;
                    }
                    break;
                case 11:
                    if (
                        arr[11] === arr[7] ||
                        arr[11] === arr[15] ||
                        arr[11] === arr[10]
                    ) {
                        x = true;
                    }
                    break;
                case 12:
                    if (
                        arr[12] === arr[8] ||
                        arr[12] === arr[13]
                    ) {
                        x = true;
                    }
                    break;
                case 13:
                    if (
                        arr[13] === arr[12] ||
                        arr[13] === arr[9] ||
                        arr[13] === arr[14]
                    ) {
                        x = true;
                    }
                    break;
                case 14:
                    if (
                        arr[14] === arr[13] ||
                        arr[14] === arr[10] ||
                        arr[14] === arr[15]
                    ) {
                        x = true;
                    }
                    break;
                case 15:
                    if (
                        arr[15] === arr[11] ||
                        arr[15] === arr[14]
                    ) {
                        x = true;
                    }
                    break;
            }
        }
        if (!x) {
            this.end();
        }
    }

    end() {
        alert("Your Score Is:" + this.state.score + " Game Over");
        // reset();
    }

    av() {
        let state = Object.assign({}, this.state);
        let arr = state.numbers_arr;

        var x = false;
        var count = 0;
        for (var i = 0; i < 16; i++) {
            console.log(arr[i]);
            if (arr[i] === "") {
                x = true;
                count++;
            }
        }
        if (x) {
            this.random();
        }
        if (count === 1) {
            this.check();
        }
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
                this.av();
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
                this.av();
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
                this.av();
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
                this.av();
            }
        });
    }

    _handleKeyDown(e) {
        let key = e.keyCode;

        switch (key) {
            case 37: this.left();
                break;
            case 38: this.up();
                break;
            case 39: this.right();
                break;
            case 40: this.down();
                break;
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