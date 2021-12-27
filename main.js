song="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
leftwristscore="";
rightwristscore="";
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
        rightwristscore=results[0].pose.keypoints[10].score;
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
    if(rightwristscore>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0&rightwristy<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="speed:0.5x";
        }
        else if(rightwristy>100&rightwristy<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="speed:1x";
        }
        if(rightwristy>200&rightwristy<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="speed:1.5x";
        }
        if(rightwristy>300&rightwristy<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="speed:2x";
        }
        if(rightwristy>400&rightwristy<=500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="speed:2.5x";
        }
    }
}