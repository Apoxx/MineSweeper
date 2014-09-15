function Tween(from, to, duration, func){
    var attr;
    this.values = from;
    this.to = to;
    this.duration = duration;
    this.func = func != null ? func : function(x){return x};
    this.deltas = {};
    this.originals = {};
    for(attr in this.to){
        this.originals[attr] = from[attr];
        this.deltas[attr] = this.to[attr] - from[attr];
    }
}
 
Tween.prototype.run = function(){
    this.running = true;
    var tweenLoop = (function(time){
        this.step(time);
        if(this.running)
            requestAnimationFrame(tweenLoop);
    }).bind(this);
    requestAnimationFrame(tweenLoop);
};
 
Tween.prototype.stop = function(){
    this.running = false;
    this.startTime = null;
    this.paused = null;
};
 
Tween.prototype.go = function(){
    this.backward = false;
    this.run();
};
 
Tween.prototype.back = function(){
    this.backward = true;
    this.run();
};
 
Tween.prototype.reset = function(){
    this.stop();
    for (var attr in this.to) {
        this.values[attr] = this.originals[attr];
    }
    if (this.onUpdate != null)
        this.onUpdate(this);
};
 
Tween.prototype.pause = function(){
    this.stop();
    this.paused = this.progress;
};
 
Tween.prototype.step = function(time){
    if(this.running) {
        var attr;
        if (!this.startTime) {
            this.startTime = this.paused != null ? time - (this.duration * this.paused) : time;
            this.paused = null;
        }
        if(this.backward)
            this.progress = 1 - (time - this.startTime) / this.duration;
        else
            this.progress = (time - this.startTime) / this.duration;
 
        if (!(this.progress > 1 || this.progress < 0)) {
            for (attr in this.to) {
                this.values[attr] = this.originals[attr] + this.deltas[attr] * this.func(this.progress);
            }
            if (this.onUpdate != null)
                this.onUpdate(this);
        } else {
            for (attr in this.to) {
                this.values[attr] = this.to[attr];
            }
            this.stop();
            if (this.onComplete != null)
                this.onComplete(this);
        }
    }
};

export default Tween