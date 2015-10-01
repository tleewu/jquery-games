(function(){
  if (typeof Snake === "undefined"){
    window.Snake = {};
  }

  var Board = window.Snake.Board = function(){
    this.snake = new Snake.Snake();
    this.grid = this.makeGrid();
    // this.apple = [];
  };

  Board.prototype.spawnPickup = function(){
    if(this.pickup){ return; }

    var randPos;

    do {
      randPos = [Math.floor(Math.random()*this.grid.length),
                 Math.floor(Math.random()*this.grid.length)];
    }while(this.snake.atPosition(randPos));

    this.pickup = new Snake.Apple(randPos);
  };

  Board.prototype.atPickupPosition = function(pos){
    if (this.pickup !== undefined){
      return this.pickup.atPosition(pos);
    }
  };

  Board.prototype.consumePickup = function(){
    if (this.atPickupPosition(this.snake.segments[0])){
      this.snake.growing += this.pickup.adds;
      this.pickup = undefined;
    }
  };

  Board.prototype.render = function(){
    var board = this;

    this.grid.forEach(function(row, rowIdx){
      var rowString = "";

      row.forEach(function(space, colIdx){
        if(board.snake.atPosition([rowIdx, colIdx])){
          rowString += " S ";
        } else {
          rowString += " * ";
        }
      });

      console.log("ROW " + rowIdx + ": "+ rowString);
    });
  };

  Board.prototype.makeGrid = function(){
    var grid = new Array(10);
    for (var i = 0; i < grid.length; i++) {
      var g = grid[i] = new Array(10);

      for (var j = 0; j < g.length; j++) {
        g[j] = "*";
      }
    }
    return grid;
  };

})();
