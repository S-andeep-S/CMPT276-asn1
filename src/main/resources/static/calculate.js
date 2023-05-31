var grades=[];
grades.sort(asc);

console.log(grades);
gradeOutput();

var bounds = document.getElementsByName('bound');
var output = document.getElementsByClassName('output');


document.getElementById('new-grade').addEventListener('submit', function(event)
{
    event.preventDefault();
    addGrade();
    outputClear(output);
    gradeOutput();
})


for (var i=0; i < bounds.length; i++)
{
    bounds[i].addEventListener("keyup", function(event){

        event.preventDefault();
        boundchange(event);
        
    });

    bounds[i].addEventListener("submit", function(event){
        event.preventDefault();
    });
}



function gradeOutput()
{
for (var i = 0; i < grades.length; i++ )
 {
    switch(true)
    {
        case (grades[i] >= getBound("f") && grades[i] < getBound("d")):
        {
            document.getElementById("f.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('c-') && grades[i] >= getBound("d")):
        {
            document.getElementById("d.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('c') && grades[i] >= getBound("c-")):
        {
            document.getElementById("c-.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('c+') && grades[i] >= getBound("c")):
        {
            document.getElementById("c.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('b-') && grades[i] >= getBound("c+")):
        {
            document.getElementById("c+.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('b') && grades[i] >= getBound("b-")):
        {
            document.getElementById("b-.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('b+') && grades[i] >= getBound("b")):
        {
            document.getElementById("b.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('a-') && grades[i] >= getBound("b+")):
        {
            document.getElementById("b+.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('a') && grades[i] >= getBound("a-")):
        {
            document.getElementById("a-.show").textContent+="O";
            break
        }

        case (grades[i] < getBound('a+') && grades[i] >= getBound("a")):
        {
            document.getElementById("a.show").textContent+="O";
            break
        }

        case (grades[i] <= getBound('max') && grades[i] >= getBound("a+")):
        {
            document.getElementById("a+.show").textContent+="O";
            break
        }

    }
 }
}

function asc(a,b)
{
    return a-b
}

function getBound(id) {
    var bound = document.getElementById(id).elements[0];
    return bound.value;
}

function boundchange(event)
{

    if (boundRange(bounds) == false)
    {
        document.getElementById("messageOutput1").textContent = "maximal/minimal bound range maybe insufficient to display all grades,";
        document.getElementById("messageOutput1").textContent += " Max grade: " + grades[grades.length-1] + " Min grade: " + grades[0];
    }

    else if (boundRange(bounds) == true)
    {
        document.getElementById("messageOutput1").textContent = "";
    }


    if (boundOrder(bounds) == false)
    {
        document.getElementById("messageOutput2").textContent = "overlapping bound error";
    }

    else
    {
        document.getElementById("messageOutput2").textContent = "";
        outputClear(output);
        gradeOutput();
    }
}

function outputClear(output)
{
    for (var i=0; i < output.length; i++)
{
    output[i].textContent = '';
}
}

function boundOrder(bounds)
{

    for (var i=0; i < bounds.length - 1; ++i)
{
    for (var j=i+1; j < bounds.length; ++j)
    {
        if (Number(bounds[i].elements[0].value) < Number(bounds[j].elements[0].value))
        {
            return false;
        }
    }   
}
    return true;
}

function boundRange(bounds)
{
    if (Number(bounds[0].elements[0].value) < grades[grades.length-1])
    {
        return false;
    }

    if (Number(bounds[11].elements[0].value) > grades[0])
    {
        return false;
    }

    return true;
}

function addGrade()
{
    grades.push(Number(document.getElementById('new-grade').elements[0].value));
    grades.sort(asc);
}

