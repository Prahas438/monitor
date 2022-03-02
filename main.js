song="";
status=""
object=[];
function preload(){
    song=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(490,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(490,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : Detecting Humans";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
}
}
function draw(){
    image(video,0,0,490,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("objects").innerHTML="Baby Found ";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("objects").innerHTML="Baby Not Found ";
                console.log("play");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("objects").innerHTML="Baby Not Found ";
                console.log("stop");
                song.play();
        }
    }
}
