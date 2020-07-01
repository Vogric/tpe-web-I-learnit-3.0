document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  /*-------principal buttons------- */
  let buttonAddItem = document.querySelector("#button-add");
  let buttonAddThreeItems = document.querySelector("#button-add-three");
  let buttonDeletedAll = document.querySelector("#button-deleted");
  /*-------input add one / three------- */
  let inputCourse = document.querySelector("#course");
  let inputDuration = document.querySelector("#duration");
  let inputSubject = document.querySelector("#subject");
  let inputTopics = document.querySelector("#topics");
  /*-------edit------- */
  let buttonSendEdition = document.querySelector("#button-edit");
  let inputEditCourse = document.querySelector("#course-edit");
  let inputEditDuration = document.querySelector("#duration-edit");
  let inputEditSubject = document.querySelector("#subject-edit");
  let inputEditTopics = document.querySelector("#topics-edit");
  /*-------filter------- */
  let buttonFilter = document.querySelector("#button-filter");
  let inputFilter = document.querySelector("#input-filter");
  /*-------others------- */
  let url = "https://web-unicen.herokuapp.com/api/groups/94menchonvogrich/courses";
  let tbody = document.querySelector("#tbody");

  /*--------- start ------------------ */
  
  GetData();

  /*--------- event and functions buttons ------------------ */

  buttonAddItem.addEventListener("click", () => {
    AddToAPI();
  });

  buttonAddThreeItems.addEventListener("click", () => {
    for (let index = 1; index <= 3; index++) {
      AddToAPI();
    }
  });

  buttonFilter.addEventListener("click", () => {
    filterData();
  })

  /*--------- general functions ------------------ */

  function GetData() {
    fetch(url, {})
    .then( (r) => {
      if (!r.ok) {
        alert("No se pudieron traer los datos del servidor");//veerr
      }
      else {
        return r.json();
      }
    })
    .then((json) => {
      tbody.innerHTML = "";
      for (let item of json.courses) {
        AddTable(tbody, item);
      }
      deleteOne();
      deleteAll();
      editOne();
    })
    .catch((e) => {
      console.log(e);
    });
  }

  function AddToAPI() {
    let item = CreateItem(
      inputCourse.value,
      inputDuration.value,
      inputSubject.value,
      inputTopics.value
    );
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    .then(function (r) {
      if (!r.ok) {
        alert("Error al enviar los datos, intente nuevamente");
      }
    })
    .then( () =>{
      GetData();
    })
    .catch((e) => {
      console.log(e);
    });
  }

  function editOne() {
    let buttons = document.querySelectorAll('.editButtons');
    let idButton = "";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        document.querySelector('#selectRow').innerHTML = "You choice the row " + (i + 1);
        idButton = buttons[i].parentNode.parentNode.id;
        console.log("id en el for", idButton);
      });
    }
    buttonSendEdition.addEventListener("click", () => {
      let item = CreateItem(inputEditCourse.value, inputEditDuration.value, inputEditSubject.value, inputEditTopics.value);
      console.log("id antes del fetch", idButton);
      //if(idButton !== ""){
        fetch(url + "/" + idButton, {
          "method": "PUT",
          "headers": { "Content-Type": "application/json" },
          "body": JSON.stringify(item)
        })
        .then((r) => {
          if (!r.ok) {
            alert("No se pudieron editar los datos correctamente");
          }
        })
        .then(() => {
          document.querySelector('#selectRow').innerHTML = "";
          idButton = "";
          GetData();
        })
        .catch((e) => {
          console.log(e);
        })
     // }
    });
  }

  function deleteOne() {
    let buttons = document.querySelectorAll('.deleteButtons');
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        let idItem = buttons[i].parentNode.parentNode.id;
        console.log(idItem);
        fetch(url + "/" + idItem, {
          "method": "DELETE",
        })
        .then(() => {
          GetData();
        })
        .catch((e) => {
          console.log("Error al remover" + e);
        })
      });
    }
  }

  function deleteAll() {
    buttonDeletedAll.addEventListener("click", () => {
      let buttons = document.querySelectorAll('.deleteButtons');
      for (let i = 0; i < buttons.length; i++) {
        let idItem = buttons[i].parentNode.parentNode.id;
        console.log(idItem);
        fetch(url + "/" + idItem, {
          method: "DELETE",
        })
        .then(() => {
          tbody.innerHTML = "";
        })
        .catch((e) => {
          console.log("Error al remover" + e);
        });
      }
    });
  }

  function filterData() {
    if (inputFilter.value !== "ALL") {   
        tbody.innerHTML = "";
        fetch(url, {
        })
        .then(function (r) {
          if (!r.ok) {
            //mensaje de error
          }
          else {
            return r.json();
          } 
        })
        .then( (json) => {
          tbody.innerHTML = "";
          for (let item of json.courses) {
              if (item.thing.subject === inputFilter.value) {
                AddTable(tbody, item);
              }
          }
          deleteOne();
          deleteAll();
          editOne();
        });
    }
    else {
      GetData();
    }
  }

  function CreateItem(Course, Duration, Subject, Topics) {
    let item = {
      thing: {
        course: Course,
        duration: Duration,
        subject: Subject,
        topics: Topics
      }
    };
    return item;
  }
  
  function AddTable(tbody, item) {
    /*create row*/
    let tr = document.createElement("tr");
    /*load data courses in 1 cell*/
    let td1 = document.createElement("td");
    td1.innerText = item.thing.course;
    tr.appendChild(td1);
    /*load data duration in 2 cell*/
    let td2 = document.createElement("td");
    td2.innerText = item.thing.duration;
    tr.appendChild(td2);
    /*load data subject in 3 cell*/
    let td3 = document.createElement("td");
    td3.innerText = item.thing.subject;
    tr.appendChild(td3);
    /*load data topics in 4 cell*/
    let td4 = document.createElement("td");
    td4.innerText = item.thing.topics;
    tr.appendChild(td4);
    /*load edit row button & delete row button in 5 cell*/
    let td5 = document.createElement("td");
        /*create edit button */
    let editbutton = document.createElement("button");
    editbutton.innerHTML = "<img src='../Images/icons/edit.png'>";
    editbutton.className = "editButtons";
        /*create delete button */
    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = "<img src='../Images/icons/deleted.png'>";
    deletebutton.className = "deleteButtons";
        /*add buttons to parent node*/
    td5.appendChild(editbutton);
    td5.appendChild(deletebutton);
    tr.appendChild(td5);
    /*VERIFICATION*/
    if (td2.innerText == "7 weeks long") {
      tr.classList.add("change-row");
    }
    /*load row in final of tbody*/
    tr.id = item._id;
    tbody.appendChild(tr);
  }
});
