function compy(a, b) {
    if (((a.y_start + a.y_dim) / 2) < ((b.y_start + b.y_dim) / 2)) {
        return 1;
    } else if (((a.y_start + a.y_dim) / 2) > ((b.y_start + b.y_dim) / 2)) {
        return -1;
    } else {
        return 0;
    }
}

function compx(a, b) {
    if (a.x_start > b.x_start) {
        return 1;
    }
    if (a.xstart < b.x_start) {
        return -1;
    }
    return 0;
}

function distForm(a, b) {
    total = 0;
    for (i = 0; i < 1000; ++i) {
        newVar = Math.pow((a[i] - b[i]), 2);
        total += newVar;
    }
    return total;
}