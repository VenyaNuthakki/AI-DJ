song="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
leftwristscore=""
function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded)
    posenet.on("pose", getposes)
}

function modelloaded(){
    console.log("posenet is intialised");
}

function playsound(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pausesound(){
    song.pause();
}

function getposes(results){
    if (results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log(leftwristx);
        console.log(leftwristy);
        console.log(rightwristx);
        console.log(rightwristy);
        leftwristscore=results[0].pose.keypoints[9].score;
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("purple");
    stroke("blue");
    if(leftwristscore>0.2){
    circle(leftwristx,leftwristy,20);
    newleftwristy=Number(leftwristy);
    removedecimals=floor(newleftwristy)
    volume=removedecimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume:"+volume;
    }
}