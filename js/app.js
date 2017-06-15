document.addEventListener("DOMContentLoaded", function() {
    //Create Pac in (0,0) position
    function Pac() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right'
    }
    //point coordinate
    function Point() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
    // bonus coordinate
    function Bonus() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
    function Game() {
        this.board = document.querySelectorAll('#board > div');
        this.pac = new Pac();
        this.point = new Point();
        this.bonus = new Bonus();
        this.score = 0;
        this.time = 200;
        this.index = function(x, y) {
            return x + (y * 10);
        }
        //function showing Pac on board & changing it's direction
        this.showPac = function() {
            this.board[this.index(this.pac.x, this.pac.y)].classList.add('pac');

            if (this.pac.direction === "right") {
            } else if (this.pac.direction === "left") {
                this.board[this.index(this.pac.x, this.pac.y)].classList.add('left');
            } else if (this.pac.direction === "bottom") {
                this.board[this.index(this.pac.x, this.pac.y)].classList.add('bottom');
            } else if (this.pac.direction === "top") {
                this.board[this.index(this.pac.x, this.pac.y)].classList.add('top');
            }
            this.checkBonusCollision();
            this.checkPointCollision();
        }
        // function showing strawberry on the board
        this.showPoint = function() {
            this.board[this.index(this.point.x, this.point.y)].classList.add('point');
        }
        //function responsible for setting interval - how fast will Pac move on the board
        var self = this;
        this.startGame = function() {
            return this.idSetInterval = setInterval(function() {
                self.movePac();
            }, this.time);
        }
        //function showing bonus object worth 3 points and generating it in random time
        this.showBonus =  function() {
            return this.setTimer = setInterval(function() {
                self.board[self.index(self.bonus.x, self.bonus.y)].classList.add('bonus');
            }, Math.floor(Math.random() * 20000)+10000);
        }
        //function responsible for moving pac
        this.movePac = function() {
            this.hideVisiblePac();
            this.hideDirection();
            if (this.pac.direction === "right") {
                this.pac.x = this.pac.x + 1;
            } else if (this.pac.direction === "left") {
                this.pac.x = this.pac.x - 1;
            } else if (this.pac.direction === "bottom") {
                this.pac.y = this.pac.y + 1;
            } else if (this.pac.direction === "top") {
                this.pac.y = this.pac.y - 1;
            }
            this.gameOver();
        }
        //delete class after Pac moves, so that it won't multiply
        this.hideVisiblePac = function() {
            document.querySelector('.pac').classList.remove('pac');
        }
        //delete class after Pac moves, so that it has correct direction
        this.hideDirection = function() {
            if (document.querySelector('.bottom')) {
                document.querySelector('.bottom').classList.remove('bottom');
            } else if (document.querySelector('.top')) {
                document.querySelector('.top').classList.remove('top');
            } else if (document.querySelector('.left')) {
                document.querySelector('.left').classList.remove('left');
            }
        }
        //event, that allows to move Pac with keyboard arrows
        this.turnPac = function(event) {
            switch (event.which) {
                case 37:
                    this.pac.direction = 'left';
                    break;
                case 39:
                    this.pac.direction = 'right';
                    break;
                case 38:
                    this.pac.direction = 'top';
                    break;
                case 40:
                    this.pac.direction = 'bottom';
            }
        }
        //function checking collision with strawberry
        this.checkPointCollision = function() {
            if (this.pac.x === this.point.x && this.pac.y === this.point.y) {
                document.querySelector('.point').classList.remove('point');
                this.score = this.score + 1;
                this.point = new Point();
                this.showPoint();
                document.querySelector('#score > div > strong').innerText = this.score;
            }
        }
        //function checking collision with bonus point
        this.checkBonusCollision = function() {
            if (this.pac.x === this.bonus.x && this.pac.y === this.bonus.y) {
                document.querySelector('.bonus').classList.remove('bonus');
                this.score = this.score + 3;
                this.bonus = new Bonus();
                this.showBonus();
                document.querySelector('#score > div > strong').innerText = this.score;
            }
        }
        //function checking if a game is over (if pac has run into wall)
        this.gameOver = function() {
            if (this.pac.x < 0 || this.pac.x > 9 || this.pac.y < 0 || this.pac.y > 9) {
                clearInterval(this.idSetInterval);
                //after the game is over, show overlay with score and start button
                document.querySelector('.invisible').style.display = ('inline-block');
                document.querySelector('#final_score').innerText = this.score;
            } else {
                this.showPac();
            }
        }
    }
    //calling game
    var game = new Game();
    game.startGame();
    game.showPac();
    game.showPoint();
    game.showBonus();
    document.addEventListener('keydown', function(event) {
        game.turnPac(event);
    });
});
