prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    jpg_quality: 2000
});

camera = document.getElementById(camera);

Webcam.attach("camera");

function capture() {
    Webcam.snap(function(datauri){
document.getElementById("result").innerHTML='<img id="capture_img" src="'+datauri+'"/>';
    });
}

console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EifuAExnE/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "first prediction is" + prediction1;
    speak_data_2 = "second prediction is" + prediction2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function predict() {
    img = document.getElementById("capture_img");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("result_hand_name").innerHTML = prediction1;
        prediction2 = results[1].label;
        document.getElementById("result_hand_name2").innerHTML = prediction2;
        speak();
        if(prediction1=="five"){
            document.getElementById("update_hand").innerHTML="&#128400;";
        }
        if(prediction1=="up"){
            document.getElementById("update_hand").innerHTML="&#128070;";
        }
        if(prediction1=="down"){
            document.getElementById("update_hand").innerHTML="&#128071;";
        }
        if(prediction1=="punch"){
            document.getElementById("update_hand").innerHTML="&#128074;";
        }

        if(prediction1=="five"){
            document.getElementById("update_hand2").innerHTML="&#128400;";
        }
        if(prediction1=="up"){
            document.getElementById("update_hand2").innerHTML="&#128070;";
        }
        if(prediction1=="down"){
            document.getElementById("update_hand2").innerHTML="&#128071;";
        }
        if(prediction1=="punch"){
            document.getElementById("update_hand2").innerHTML="&#128074;";
        }
    }
}