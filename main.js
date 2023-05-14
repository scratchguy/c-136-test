status = "";
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw()
{
    image(video, 0, 0, 380, 380);

        if (status != "")
        {   
            r = random(255);
            g = random(255);
            b = random(255);
            for (i = 0; i < objects.length; i++)
            {   
                if (objects[i].label == "person")
                {

                }
                objectDetector.detect(video, gotResult);
                document.getElementById("status").innerHTML = "Status : Object Detected";
                
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function stop()
{
    alarm.stop();
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

