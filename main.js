(function() {
    $(document).on("click", "#recognize", function(e) {
        var image = $("#image")[0];

        var fd = new FormData();
        fd.append('file', image.files[0]);

        $.ajax({
                url: 'http://172.19.144.219:12345/images',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST'
            })
            .done(function(data) {
                //writeToTextarea(JSON.stringify(data));
                //return;
                data.sort(sortY);
                var lineSpace = parseFloat($("#lineSpace").val());

                text = "";
                rowY = 0;
                arr = [];
                index = 0;

                for (var i = 0; i < data.length; ++i) {
                    //if (data[i].y_dim < 40) continue;
                    if (rowY == 0) rowY = data[i].y_start;
                    if (Math.abs(rowY - data[i].y_start) >= (data[i].y_dim * lineSpace)) {
                        index++;
                    }
                    rowY = data[i].y_start;

                    if (typeof arr[index] === "undefined") {
                        arr[index] = [];
                    }
                    arr[index].push(data[i]);
                }

                for (var i = 0; i < arr.length; ++i) {
                    arr[i].sort(sortX);

                    //add spaces hopefully lul
                    var numVals = (arr[i].length - 1); //total number of vals in array -1 to acocunt for zero indexing

                    var arrayLength = (arr[i][numVals].x_start + arr[i][numVals].x_dim) - arr[i][0].x_start; //total length from xstart to end of x from first letter to last
                    var totalSpace = arrayLength; //number that is modified to find the total empty space

                    //for loop subtracts each x_dim to leave only empty space
                    for (var iLen = 0; iLen <= numVals; ++iLen) {
                        totalSpace -= arr[i][iLen].x_dim;
                    }
                    var spaceAllowed = ((totalSpace / (numVals)) + 3); //space allowed per letter.
                    //loop through row again checking for spaces
                    var arraySpace = []; //array to hold values that need a space.
                    for (var z = 1; z < numVals; ++z) {
                        var spaceLeft = (arr[i][z].x_start - (arr[i][z - 1].x_start + arr[i][z - 1].x_dim));
                        if (spaceLeft > spaceAllowed) {
                            arraySpace.push(z - 1);
                        }
                    }
                    var arrSpa = 0;

                    for (var k = 0; k < arr[i].length; k++) {
                        var tmpRes = null;
                        var letter = null;
                        var insertSpace = false;

                        if (typeof letters == "undefined")
                            letters = lettersDejavuSans;
                        for (var key in letters) {
                            var res = distForm(arr[i][k].img, letters[key]);

                            if (letter === null)
                                letter = key[0];
                            if (tmpRes === null) {
                                tmpRes = res;
                            }
                            if (tmpRes > res) {
                                tmpRes = res;
                                letter = key[0];
                                //if (letter == "w" || letter == "W")
                                //    console.log(res + ":" + letter);
                            }

                            /*if (i == 0 && k == 3) {
                                console.log(letter + " - " + key[0] + ":" + res);
                            }*/

                            if (k == arraySpace[arrSpa]) {
                                insertSpace = true;
                                arrSpa += 1;
                            }
                        }
                        //if (letter == "w")
                        //    console.log(letter + ":" + tmpRes);
                        text += letter + (insertSpace ? " " : "");
                    }
                    text += "\n";
                }
                writeToTextarea(text);

            })
            .always(function() {

            });
    });

    $(document).on("change", "#image", function(e) {
        if (FileReader && this.files && this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {
                document.getElementById("img").src = fr.result;
            }
            fr.readAsDataURL(this.files[0]);
        }
    });

    $(document).on("click", "#img_block", function() {
        $("#image").trigger("click");
    });

    $(document).on("click", "#save", function(e) {
        e.preventDefault();
        var text = $("#text").val();
        var filename = "untitled";
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, filename + ".txt");
    });

    $(document).on("change", "#langs", function() {
        if ($(this).val() == "djv")
            letters = lettersDejavuSans;
        else if ($(this).val() == "hwr")
            letters = lettersHandWritten;
        else if ($(this).val() == "hwralt")
            letters = lettersHandWrittenAlt;
    });
})();

function writeToTextarea(text) {
    $("#text").val(text);
}