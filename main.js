Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = '<img id="captured_image" src = "' + data_uri + '"/>';
    })
}

console.log("Ml5 version - " + ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iNg0moMNr/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model has loaded.");
}

function identifyObject(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultObjectname").innerHTML = results[0].label;
        document.getElementById("resultObjectaccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}