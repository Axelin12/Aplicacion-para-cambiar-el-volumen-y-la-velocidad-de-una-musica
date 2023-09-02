song="";
leftwristY= 0;
leftwristX=0;
rightwristY=0;
rightwristX=0;
scoreleft=0;
scoreright=0;
function preload(){
song=loadSound("music.mp3");
console.log("musica_cargada");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("el modelo esta cargado");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    console.log("longitud ",results.length);
    leftwristY=results[0].pose.leftWrist.y;
    leftwristX=results[0].pose.leftWrist.x;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("muñeca izquierda "+leftwristY+" muñeca derecha "+ rightwristY);
    scoreleft=results[0].pose.keypoints[9].score;
    scoreright=results[0].pose.keypoints[10].score;
    console.log("score left "+ scoreleft+" score right"+ scoreright);
}
}
function draw(){
    image(video,0,0,600,500);
    
    if(scoreleft>0.2){
        fill("#5BFD05");
    stroke("#67AD62");
        circle(leftwristX,leftwristY,20);
        numero_entero_izquierda_y=Number(leftwristY);
        console.log(numero_entero_izquierda_y);
        sin_decimal=floor(numero_entero_izquierda_y);
        volumen=sin_decimal/500;
        console.log(volumen+" volumen");
document.getElementById("volum").innerHTML="volumen= "+volumen;
song.setVolume(volumen);
    }
    if(scoreright>0.2){
        fill("#04F3FA");
        stroke("#0443FA");
        circle(rightwristX,rightwristY,20);
        if(rightwristY>0&&rightwristY<=100){
            document.getElementById("speed").innerHTML="La velocidad ahora es de 0.5";
            song.rate(0.5);
        }else if(rightwristY>100&&rightwristY<=200){
            document.getElementById("speed").innerHTML="La velocidad ahora es de 1.0";
            song.rate(1.0);
        }else if(rightwristY>200&&rightwristY<=300){
            document.getElementById("speed").innerHTML="La velocidad ahora es de 1.5";
            song.rate(1.5);
        }else if(rightwristY>300&&rightwristY<=400){
            document.getElementById("speed").innerHTML="La velocidad ahora es de 2.0";
            song.rate(2.0);
        }else if(rightwristY>400&&rightwristY<=500){
            document.getElementById("speed").innerHTML="La velocidad ahora es de 2.5";
            song.rate(2.5);
        }
    }
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Stop(){
    song.stop();
}