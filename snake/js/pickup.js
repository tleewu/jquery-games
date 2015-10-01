(function(){

  if (typeof Snake === "undefined"){
    window.Snake = {};
  }

  var Pickup = Snake.Pickup = function(config){
    this.score = config["score"];
    this.adds = config["adds"];
    this.position = config["position"];
    this.color = config["color"];
  };

  Pickup.prototype.atPosition = function(pos){
    if (this.position[0] === pos[0] && this.position[1] === pos[1]){
      return true;
    }
  };

  var Apple = Snake.Apple = function(position){
    Pickup.call(this, {score: 1, adds: 1, position:position, color: "red"});
  };

  Apple.prototype = Object.create(Pickup.prototype);


})();
