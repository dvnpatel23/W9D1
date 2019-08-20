// Function.prototype.inherits = function(SuperClass) {
//   function Surrogate(){}
//   Surrogate.prototype = SuperClass.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };


Function.prototype.inherits = function(SuperClass) {
  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};


function MovingObject(name) {
  this.name = name;
 }

function Ship(name) {
  MovingObject.call(this, name);
 }
Ship.inherits(MovingObject);

function Asteroid(name) {
  MovingObject.call(this, name);
 }
Asteroid.inherits(MovingObject);


let titanic = new Ship('Titanic');
console.log(titanic.name);

let rock = new Asteroid('rock');
console.log(rock.name);