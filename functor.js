/*function compy(a, b) {
    if (((a.y_start + a.y_dim) / 2.0) < ((b.y_start + b.y_dim) / 2.0)) {
        return 1;
    } 
    if (((a.y_start + a.y_dim) / 2.0) > ((b.y_start + b.y_dim) / 2.0)) {
        return -1;
    } 
    return 0;
}*/
/*function compg(a,b){
    if(a.y_start < b.y_start){
        return -1;
    }
    if(a.y_start > b.y_start){
        return 1;
    }
    return 0;
}*/
/*function compa(a,b){
    return (a.y_start - b.y_start);
}*/

/*function compx(a, b) {
    if((((a.y_start + a.y_dim)/2) - ((b.y_start + b.y_dim)/2)) > 10){
    	return -1;
    }
    else{
    	if (a.x_start > b.x_start) {
        	return 1;
    	}
    	if (a.xstart < b.x_start) {
        	return -1;
    	}
		return 0;
	}
}*/
function compp(a, b) {
    //console.log("a " + a.y_start + " b " + b.y_start);
    //console.log(typeof(a.x_start));
    if (a.y_start > b.y_start) {
        //console.log("chose 1");
        return 1;
    } else if (a.y_start < b.y_start) {
        //console.log("chose -1");
        return -1;
    } else {
        //console.log("chose 0");
        return 0;
    }
}

function comp(a, b) {
    console.log(Math.abs((a.y_start + a.y_dim) - (b.y_start + b.y_dim)));
    if (Math.abs((a.y_start + a.y_dim) - (b.y_start + b.y_dim)) < 2) {
        if (a.x_start > b.x_start) {
            //console.log(b.x_start);
            return 1;
        }
        if (a.xstart < b.x_start) {
            //console.log(a.x_start);
            return -1;
        }
        return 0;
    } else {
        return ((a.y_start + a.y_dim) - (b.y_start + b.y_dim));
    }
}

function distForm(a, b) {
    total = 0;
    for (i = 0; i < 1000; ++i) {
        newVal = Math.pow((a[i] - b[i]), 2);
        total += newVal;
    }
    return Math.sqrt(total);
}