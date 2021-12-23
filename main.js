Status1="";
Value="";
Objects=[];


function setup(){
canvas=createCanvas(300,300)
canvas.position(530,290)
video=createCapture(VIDEO);
video.hide();
}


function Stugart(){
    console.log("I'M SARA");
    objectDetector=ml5.objectDetector('cocossd', model_loaded);
    document.getElementById("Status").innerHTML="Status:Detecting Objects";
    Value=document.getElementById("Input").value;
}


function model_loaded(){
    console.log("Model has loaded");
    Status1=true;
}

function got_results(error, results){
    if(error){
     console.error(error);
    }
    else{
        console.log(results);
        Objects=results;
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    if(Status1 != ""){
        objectDetector.detect(video, got_results);
        document.getElementById("Status").innerHTML="Status: Object Detected!"
        for(i=0; i<Objects.length; i++){
         fill("blue");
         percentage=floor(Objects[i].confidence*100);
         text(Objects[i].label+" "+percentage+"%",Objects[i].x, Objects[i].y );
         noFill();
         stroke("red");
         rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)

         if(Objects[i].label == Value){
            video.stop();
            objectDetector.detect(got_results);
            document.getElementById("Statuss").innerHTML="Object mentioned found";
            synth=window.speechSynthesis;
            utter_this=new SpeechSynthesisUtterance("Object mentioned found");
            synth.speak(utter_this);
            }
            else{
            document.getElementById("Statuss").innerHTML="Object mentioned not found.";   
            }
    
            }
        }
        
      
}