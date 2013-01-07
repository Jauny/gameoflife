// cells
var Cell = function() {
  this.state = 'dead';
  this.neighbors = 0;
};

Cell.prototype = {
  state: 'dead',
  neighbors: 0,

  born: function() {
    this.state = 'alive';
    return this.state;
  },

  die: function() {
    this.state = 'dead';
    return this.state;
  },

  is_alive: function() {
    return this.state === 'alive';
  },

  evolve: function() {
    if (this.state === 'alive') {
      if (this.neighbors < 2 || this.neighbors > 3) {
        this.die();
      }
    } else {
      if (this.neighbors === 3) {
        this.born();
      }
    }
  }
};

// game
var Life = function(size) {
  this.size = typeof size !== 'undefined' ? size : 10;
  
  this.board = new Array;
  for (size = Math.pow(this.size, 2); size>0; size--) {
    this.board.push(new Cell)
  }
};

Life.prototype = {
  size: 5,
  board: new Array,

  generation: function() {
    var self = this;
    this.board.forEach( function(cell, index) {
      cell.neighbors = self.neighbors(index);
    });

    this.board.forEach( function(cell){
      cell.evolve();
    });
  },

  neighbors: function(index) {
    var board = this.board;
    var index = index;
    var factor = this.size;
    var count = 0;

    console.log( board[ index ], index );

    if ( (index / factor) > 0 && (index % factor) > 0 && board[index - (factor + 1)].is_alive() ) {
      count++;
    }
    if ( (index / factor) > 0 && board[index - factor].is_alive() ) {
      count++;
    }
    if ( (index / factor) > 0 && (index % factor) < (factor - 1) &&  board[index - (factor - 1)].is_alive() ) {
      count++;
    }
    if ( (index % factor) > 0 && board[index - 1].is_alive() ) {
      count++;
    }
    if ( (index % factor) < (factor - 1) && board[index + 1].is_alive() ) {
      count++;
    }
    if ( (index % factor) > 0 && (index / factor) < (factor - 1) && board[index + (factor - 1)].is_alive() ) {
      count++;
    }
    if ( (index / factor) < (factor - 1) && board[index + factor].is_alive() ) {
      count++;
    }
    if ( (index % factor ) < (factor - 1) && (index / factor) < (factor - 1) && board[index + (factor + 1)].is_alive() ) {
      count++;
    }
    
    board[index].neighbors = count;
  }
};