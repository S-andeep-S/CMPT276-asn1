var grades=[];
grades.sort(asc);

// stores the bounds limit values 
var bounds = document.getElementsByName('bound');
// stores the output elements in table 2
var output = document.getElementsByClassName('output');

//event listener for new grade form, clears output and outputs grade array again
document.getElementById('new-grade').addEventListener('submit', function(event)
{
    event.preventDefault();
    addGrade();
    boundchange(event);
})

// event listener for the bound forms, dynamically change grade output
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


// function to output grade array to table 2 elements
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
// compare function for array sort to sort in ascending order
function asc(a,b)
{
    return a-b
}
// gets value from bound form
function getBound(id) {
    var bound = document.getElementById(id).elements[0];
    return bound.value;
}
// event handler for bound changes, dynamically adjust output based on bound changes and keypress
// handles errors and edge cases
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
// clears the output elements in table 2
function outputClear(output)
{
    for (var i=0; i < output.length; i++)
{
    output[i].textContent = '';
}
}
// checks the bound limit order to ensure no overlapping takes place
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
// checks the maximal and minimal bound limits encompasses the entire grade range
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
// pushs the value from new-grade form into the array and sorts it
function addGrade()
{
    grades.push(Number(document.getElementById('new-grade').elements[0].value));
    grades.sort(asc);
}

