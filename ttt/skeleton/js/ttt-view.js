(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    $(".square").on("click", function(e){
      var $s = $(e.target);
      this.makeMove($s);
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.attr("data").split(",").map(function(ele){
      return parseInt(ele);
    });

    if (this.game.board.isEmptyPos(pos)){
      $square.append(this.game.currentPlayer);
      $square.addClass("selected");
      this.game.playMove(pos);
    }else {
      alert("Invalid move - please make another move.");
    }

    if (this.game.isOver()){
      if (this.game.winner()){
        alert("Congratulations, " + this.game.winner() + "! you won.");
      }else{
        alert("Tied Game!");
      }
    }

  };

  View.prototype.setupBoard = function () {
    this.game.board.grid.forEach(function(row, i){
      var $row = $("<ul></ul>");
      row.forEach(function(square, j){
        $row.append("<li class='square' data="+ [j,i] +"><li>");
      });
      this.$el.append($row);
    }.bind(this));
  };
})();
