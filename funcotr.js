function compy(a, b){
	if(((a.y_start + a.y_dim)/2) < ((b.y_start + b.y_dim)/2)){
		return 1;
	}
	else if (((a.y_start + a.y_dim)/2) > ((b.y_start + b.y_dim)/2)){
		return -1;
	}
	else{
		return 0;
	}
}

function compx(a,b){
	if(((a.y_start + a.y_dim)/2) - ((b.y_start + b.y_dim)/2)) > 5){
	return 0;
	}
	else{
		if(a.x_start < b.x_start){
			return 1;
		}
		if(a.xstart > b.x_start){
			return -1;
		}
		return 0;
	}	

}

function distform(a,b){
	var total = 0;
	for(i = 0; i < 1000; ++i){
		newVal = Math.pow((a[i] - b[i]),2);
		total += newVal;
	}
	return total;
}