(function(){
  if (typeof Hanoi === "undefined"){
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el){
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.bindEvents();
  };

  View.prototype.setupTowers = function(){
    this.game.towers.forEach(function(tower, i){
      var $tower = $("<ul class='tower' data="+i+"></ul>");

      tower.forEach(function(stack){
        var width = 100 + (stack * 30);
        var $stack = $("<li class='stack' data="+(stack)+"></li>");
        $stack.css("width", width);
        $tower.append($stack);
      });

      this.$el.append($tower);
    }.bind(this));
  };

  View.prototype.render = function(){
    this.$el.html("");
    this.setupTowers();
    this.bindEvents();
  };

  View.prototype.bindEvents = function(){
    $(".tower").on("click", function(e){
      var $tower = $(e.currentTarget);
      this.clickTower($tower);
    }.bind(this));
  };

  View.prototype.towerNumber = function($tower){
    return parseInt($tower.attr("data"));
  };

  View.prototype.clickTower = function($tower){
    console.log($tower);
    if(this.$fromTower){
      var $toTower = $tower;
      var fromPos = this.towerNumber(this.$fromTower);
      var toPos = this.towerNumber($toTower);

      var valid = this.game.isValidMove(fromPos, toPos);

      if(valid){
        this.game.move(fromPos, toPos);
        this.render();
      } else {
        alert("Bad Move");
      }

      if(this.game.isWon()){
        alert("You won!");
      }

      this.$fromTower.removeClass("selected");
      this.$fromTower = undefined;
    } else {
      $tower.addClass("selected");

      this.$fromTower = $tower;
    }
  };


})();
