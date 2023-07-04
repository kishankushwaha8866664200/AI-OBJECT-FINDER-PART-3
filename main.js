var speechSys = window.speechSynthesis;
var status = "";
var objName = "";
var objects = [];
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    objName = document.getElementById("objName").value;
}

function modelLoaded() {
    status = true;
    console.log("Model Loaded!");
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status : Object detecting";
        for(var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object detected";
            stroke("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 2, objects[i].y + 10);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objName){
                objectDetector.detect(gotResult);
                document.getElementById("objFound").innerHTML = objName + " is Found";
                utterThis = new SpeechSynthesisUtterance(objName + " is Found");
                speechSys.speak(utterThis)
            }else{
                document.getElementById("objFound").innerHTML = objName + " is Not Found";
            }
        }
    }
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results)
    objects = results;
}