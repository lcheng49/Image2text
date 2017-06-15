(function() {
    $(document).on("change", "#image", function() {
        var fd = new FormData();
        fd.append('file', this.files[0]);

        if (FileReader && this.files && this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {
                document.getElementById("img").src = fr.result;
            }
            fr.readAsDataURL(this.files[0]);
        }

        $.ajax({
                url: 'http://172.19.144.219:12345/images',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST'
            })
            .done(function(data) {
                data.sort(sortY);

                text = "";
                rowY = 0;
                arr = [];
                index = 0;
                for (var i = 0; i < data.length; ++i) {
                    if (rowY == 0) rowY = data[i].y_start;
                    if (Math.abs(rowY - data[i].y_start) >= data[i].y_dim) {
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
                    for (var k = 0; k < arr[i].length; k++) {
                        for (var key in letters) {
                            var res = distForm(arr[i][k].img, letters[key]);
                            console.log(key[0] + ": " + res);
                            if (res < 1500) {
                                text += key[0];
                            }
                        }
                    }
                    text += "\n";
                }
                writeToTextarea(text);
            })
            .always(function() {

            });
    });

    $(document).on("click", "#save", function(e) {
        e.preventDefault();
        var text = $("#text").val();
        var filename = "untitled";
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, filename + ".txt");
    });

})();

function writeToTextarea(text) {
    $("#text").val(text);
}