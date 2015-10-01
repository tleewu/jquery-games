(function(){
  if (typeof Snake === "undefined"){
    window.Snake = {};
  }

  var View = window.Snake.View = function($el){
    this.$el = $el;
    this.board = new Snake.Board();
    this.setupBoard();
    this.bindMoveHandler();
    setInterval(this.step.bind(this),500);
  };

  View.prototype.bindMoveHandler = function(){
    $(document).on("keydown", function(e){
      this.setDirection(e.keyCode);
    }.bind(this));
  };

  View.prototype.setDirection = function(key){
    switch(key){
      case 37:
        this.board.snake.turn("W");
        break;
      case 38:
        this.board.snake.turn("N");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
    }
  };

  View.prototype.step = function(){
    // console.log(this.board.snake.dir);
    this.board.snake.move();
    this.board.consumePickup();
    this.board.spawnPickup();
    this.render();
  };

  View.prototype.setupBoard = function(){
    this.board.grid.forEach(function(row, ri){
      var $row = $("<ul class='row'></ul>");

      row.forEach(function(ele, ci){
        $row.append($("<li class='square' data="+[ri,ci]+"></li>"));
      });

      this.$el.append($row);
    }.bind(this));
  };

  View.prototype.render = function(){
    // console.log($(".square"));
    $(".square").each(function(idx, el){
      var $el = $(el);
      var pos = $el.attr("data").split(",").map(function(el){return parseInt(el);});

      if (this.board.snake.atPosition(pos)){
        $el.css("background-color", "wheat");
      } else if(this.board.atPickupPosition(pos)) {
        $el.css("background-color", this.board.pickup.color);
      } else {
        $el.removeClass("snake");
        $el.css("background-color", "white");
      }
    }.bind(this));
  };

})();
