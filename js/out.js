/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", function() {

    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right'
    }

    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    function Game() {
        this.board = document.querySelectorAll('#board > div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.time = 250;

        this.index = function(x, y) {
            return x + (y * 10);
        }

        this.showFurry = function() {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

            if (this.furry.direction === "right") {
            } else if (this.furry.direction === "left") {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('left');
            } else if (this.furry.direction === "bottom") {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('bottom');
            } else if (this.furry.direction === "top") {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('top');
            }


            this.checkCoinCollision();
        }

        this.showCoin = function() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }
        var self = this;
        this.startGame = function() {
            return this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, this.time);
        }

        this.moveFurry = function() {

            this.hideVisibleFurry();
            this.hideDirection();

            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "bottom") {
                this.furry.y = this.furry.y + 1;
            } else if (this.furry.direction === "top") {
                this.furry.y = this.furry.y - 1;
            }

            this.gameOver();
        }

        this.hideVisibleFurry = function() {
            document.querySelector('.furry').classList.remove('furry');
        }

        this.hideDirection = function() {
            if (document.querySelector('.bottom')) {
                document.querySelector('.bottom').classList.remove('bottom');
            } else if (document.querySelector('.top')) {
                document.querySelector('.top').classList.remove('top');
            } else if (document.querySelector('.left')) {
                document.querySelector('.left').classList.remove('left');
            }
        }

        this.turnFurry = function(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 38:
                    this.furry.direction = 'top';
                    break;
                case 40:
                    this.furry.direction = 'bottom';

            }
        }


        this.checkCoinCollision = function() {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.score = this.score + 1;
                this.coin = new Coin();
                this.showCoin();
                document.querySelector('#score > div > strong').innerText = this.score;
            }
        }



        this.gameOver = function() {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                document.querySelector("#board").innerText = ("GAME OVER");
                document.querySelector("#board").style.fontSize = ("40px");
                document.querySelector("#board").style.textAlign = ("center");
            } else {
                this.showFurry();
            }
        }

    }


    var game = new Game();
    game.startGame();
    game.showFurry();
    game.showCoin();
    document.addEventListener('keydown', function(event) {
        game.turnFurry(event);
    });




});


/***/ })
/******/ ]);