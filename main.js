Status="";

Alarm="";

function preload()
{
    Alarm="Alarm sound.wav"
}

function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("note/detection").innerHTML="<b>Note : </b>If a person is not detected, it will play the alert sound"
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    Status=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        Objects=results
    }
}

function draw()
{
    image(video, 0, 0, 400, 400);
    if(Status != "")
    {
        redShades=random(255);
        blueShades=random(255);
        greenShades=random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0 ; i < Objects.length ; i++)
        {
            document.getElementById("note/detection").innerHTML="Baby found!";
            document.getElementById("detectedObjects").innerHTML="COCOSSD has detected " + Objects.length + " object(s)";
            fill(redShades, blueShades, greenShades);
            percent=floor(Objects[i].confidence * 100);
            text("Baby " + percent + "%", Objects[i].x, Objects[i].y);
            noFill();
            stroke(redShades, blueShades, greenShades);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
    else
    {
        Alarm.play();
        document.getElementById("note/detection").innerHTML="Baby not found!";

    }
}