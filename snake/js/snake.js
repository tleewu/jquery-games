(function(){
  if(typeof Snake === 'undefined'){
    window.Snake = {};
  }

  var Snake = window.Snake.Snake = function(){
    this.segments = [[1,1]];
    this.dir = "X";
    this.growing = 0;
  };

  Snake.DIRECTIONS = {
    N: [-1,0],
    E: [0,1],
    S: [1,0],
    W: [0,-1],
    X: [0,0]
  };


  Snake.prototype.move = function(){
    this.segments.unshift(this.nextPos());

    if(!this.growing){
      this.segments.pop();
    } else {
      this.growing -= 1;
    }
  };

  Snake.prototype.nextPos = function(){
    var newPos = [];
    newPos[0] = this.segments[0][0]+Snake.DIRECTIONS[this.dir][0];
    newPos[1] = this.segments[0][1]+Snake.DIRECTIONS[this.dir][1];
    return newPos;
  };

  Snake.prototype.turn = function(dir){
    this.dir = dir;
  };

  Snake.prototype.atPosition = function(pos){
    var atPos = false;

    this.segments.forEach(function(segPos){
      if(segPos[0] === pos[0] && segPos[1] === pos[1]){
        atPos = true;
        return;
      }
    });

    return atPos;
  };

})();
