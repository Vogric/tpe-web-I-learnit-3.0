document.addEventListener("DOMContentLoaded", StartPage);

function StartPage(){
    "use strict";
    /*-------variables------- */
    let buttonAddItem = document.querySelector('#button-add');
    let buttonAddThreeItems = document.querySelector('#button-add-three');
    let buttonDeletedAll = document.querySelector('#button-deleted');

    let arr_table = [
        {
            "course": "First steps on Big Data",
            "duration": "7 weeks long",
            "subject": "Data Science",
            "topics": "Data Mining - Models - Analytics - Algorithms"
        },
        {
            "course": "Cyber Security for Begginers",
            "duration": "10 weeks long",
            "subject": "Computing",
            "topics": "Security technologies - Risk management - Attacks"
        }
    ];

    let tbody = document.querySelector('#tbody');

    let inputCourse = document.querySelector('#course');
    let inputDuration = document.querySelector('#duration');
    let inputSubject = document.querySelector('#subject');
    let inputTopics = document.querySelector('#topics');
    
    /*--------- start ------------------ */

    ShowDefaults();
    console.log(arr_table);

    /*--------- event and functions buttons ------------------ */
    
    buttonAddItem.addEventListener('click', ()=>{
            AddJSON();
    }
    );

    buttonDeletedAll.addEventListener('click', ()=>{
        /*clean tbody*/
        for(let index = 0; index < arr_table.length; index++){
            tbody.lastChild.remove();
        }
        /*clean arr_table*/
        arr_table.splice(0,arr_table.length);
        console.log("Deleted Array");
        console.log(arr_table);
    }
    );

    buttonAddThreeItems.addEventListener('click', ()=>{
        for(let index = 1; index <= 3; index++){
            AddJSON();
        }
    }
    );

    /*--------- general functions ------------------ */
    
    function ShowDefaults(){
        for(let index = 0; index < arr_table.length; index++){
            AddTable(arr_table, tbody, index);
        }
    }

    function AddJSON(){
        let item = CreateItem(inputCourse, inputDuration, inputSubject, inputTopics);
        AddInArray(arr_table, item);
        let lastPosition = arr_table.length -1;
        AddTable(arr_table, tbody, lastPosition);
        console.log(arr_table);
    }

    function CreateItem(){
        let item = {
            "course": inputCourse.value,
            "duration": inputDuration.value,
            "subject":inputSubject.value,
            "topics": inputTopics.value
        }
        return(item);
    }

    function AddInArray (arr_table,item){
        arr_table.push(item);
    }
    
    function AddTable(arr_table, tbody, indexRow){
            /*create row*/
            let tr = document.createElement("tr");
            /*load data courses in 1 cell*/
            let td1 = document.createElement("td");
            td1.innerText = arr_table[indexRow].course;
            tr.appendChild(td1);
            /*load data duration in 2 cell*/
            let td2 = document.createElement("td");
            td2.innerText = arr_table[indexRow].duration;
            tr.appendChild(td2);
            /*load data subject in 3 cell*/
            let td3 = document.createElement("td");
            td3.innerText = arr_table[indexRow].subject;
            tr.appendChild(td3);
            /*load data topics in 4 cell*/
            let td4 = document.createElement("td");
            td4.innerText = arr_table[indexRow].topics;
            tr.appendChild(td4);
            /*VERIFICATION*/
            if(td2.innerText == "7 weeks long"){
                tr.classList.add('change-row');
            }
           /*load row in final of tbody*/
            tbody.appendChild(tr);
    }
}

    
