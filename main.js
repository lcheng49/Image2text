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
                console.log(data);

                // Mockup
                writeToTextarea("Hello World!");
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

function compareGlyphs() {

}

function writeToTextarea(text) {
    $("#text").val(text);
}