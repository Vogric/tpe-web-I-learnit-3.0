document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  /*-------variables------- */
  let buttonAddItem = document.querySelector("#button-add");
  let buttonAddThreeItems = document.querySelector("#button-add-three");
  let buttonDeletedAll = document.querySelector("#button-deleted");

  let tbody = document.querySelector("#tbody");

  let inputCourse = document.querySelector("#course");
  let inputDuration = document.querySelector("#duration");
  let inputSubject = document.querySelector("#subject");
  let inputTopics = document.querySelector("#topics");

  let url =
    "https://web-unicen.herokuapp.com/api/groups/94menchonvogrich/courses";
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

  /*--------- general functions ------------------ */
  function GetData() {
    fetch(url, {})
      .then(function (r) {
        if (!r.ok) {
          alert("No se pudieron traer los datos del servidor");
        } else {
          return r.json();
        }
      })
      .then(function (json) {
        let idAllItems = [];
        let index = 0;
        for (let item of json.courses) {
          AddTable(tbody, item);
          idAllItems[index] = item._id;
          index++;
        }
        //deleteOne(idAllItems);
        deleteAll(idAllItems);
        //enviarEjemplos();
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
    if (
      item.thing.course === "" ||
      item.thing.duration === "" ||
      item.thing.subject === "" ||
      item.thing.topics === ""
    ) {
      //alerta.innerHTML = "¡Todos los campos deben estar completos!";
      //return false;
    }
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
      .then(function () {
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteAll(idItem) {
    buttonDeletedAll.addEventListener("click", function () {
      for (let i = 0; i < idItem.length; i++) {
        fetch(url + "/" + idItem[i], {
          method: "DELETE",
        })
          .then(() => {
            contTabla.innerHTML = "";
          })
          .catch((err) => {
            console.log("Error al remover");
          });
      }
    });
  }
  //ver
  //modificadoooo: recordad; para cuando sea agregar uno nuevo, paso los inputs a los parametros
  //cuando sea para editar paso los EditCourse por parametro.
  function CreateItem(Course, Duration, Subject, Topics) {
    let item = {
      thing: {
        course: Course,
        duration: Duration,
        subject: Subject,
        topics: Topics,
      },
    };
    return item;
  }
  //MODIFICADOOOOOO
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
    /*load delete row button in 5 cell*/
    let td5 = document.createElement("td");
    let deletebutton = document.createElement("button");
    deletebutton.id = item._id;
    deletebutton.innerHTML = "<img src='../Images/icons/edit.png'>";
    td5.appendChild(deletebutton);
    tr.appendChild(td5);
    /*load edit row button in 6 cell*/
    let td6 = document.createElement("td");
    let editbutton = document.createElement("button");
    editbutton.id = item._id;
    editbutton.innerHTML = "<img src='../Images/icons/deleted.png'>";
    td6.appendChild(editbutton);
    tr.appendChild(td6);

    /*VERIFICATION*/
    if (td2.innerText == "7 weeks long") {
      tr.classList.add("change-row");
    }
    /*load row in final of tbody*/
    tbody.appendChild(tr);
  }
});
