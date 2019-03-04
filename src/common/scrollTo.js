if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(fn) {
        setTimeout(fn, 1)
    }
}
Math.easeout = function (A, B, rate, callback) {
	if (A == B || typeof A != 'number') {
		return
	}
	B = B || 0
	rate = rate || 2
	
	var step = function () {
        A = A + (B - A) / rate
        
        if (A < 1) {
            callback(B, true);
            return
        }
        callback(A, false);
        requestAnimationFrame(step)   
    };
    step()
}

export function scrollTo (to = 0, step = 4, callback) {
	let el = document.getElementById('viewBox')
	
	let start = el.scrollTop
	Math.easeout(start, to, step, function (value) { 
		console.log(value)
		el.scrollTop = value
		//el = null
	})
} 