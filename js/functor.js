function sortY(a, b) {
    if ((a.y_start + a.y_dim) > (b.y_start + b.y_dim)) {
        return 1;
    } else if ((a.y_start + a.y_dim) < (b.y_start + b.y_dim)) {
        return -1;
    } else {
        return 0;
    }
}

function sortX(a, b) {
    if (a.x_start > b.x_start) {
        return 1;
    } else if (a.x_start < b.x_start) {
        return -1;
    } else {
        return 0;
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