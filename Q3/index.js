 var Pet = function() {
 	this.msg = " Hello World!";
 	this.shout = function() {
 		console.log(this.msg);
 	}
 	this.waitAndShout = function() {
 		this.shout()
 		setTimeout(this.waitAndShout.bind(this), 2000)
 	}
 }

 var pet = new Pet()
 pet.waitAndShout()