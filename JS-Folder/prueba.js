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
          alert("No se pudieron traer los datos del servidor");//veerr
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
        deleteOne(/*idAllItems*/);
        deleteAll(idAllItems);
        //enviarEjemplos(); no sirve ma creo
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
        //FORMA 1 sin refresh
        //tbody.innerHTML = "";
        //GetData();

        //segunda forma de la 1:
        //deberia agregar el ultimo al final de la tabla!!!!
        //AddTable();.......

        //FORMA 2 con refresh
        location.reload(); //a ver esto luegoooooo

      })
      .catch((e) => {
        console.log(e);
      });
  }
  function editarUno () {

    let id_a_editar = idObjeto.value;
    let level = nivelEditado.value;
    let name = nombreEditado.value;
    let surname = apellidoEditado.value;
    let email = mailEditado.value;
    let cellphone = telefonoEditado.value;
    let perfil = {
        "thing": {
            "nivel": level,
            "nombre": name,
            "apellido": surname,
            "mail": email,
            "telefono": cellphone
        }
    };
    /*if (level === "" || name === "" || surname === "" || email === "" || cellphone === ""){
        //alertaEdit.innerHTML = "¡Todos los campos deben estar completos!";   
       // return false;
    }*/
    fetch(url + "/"+id_a_editar, {
        "method": "PUT",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(perfil)

    }).then((r) => {
        if (!r.ok) {
            alert("No se pudieron editar los datos correctamente");
        }
        return r.json();
    }).then((/*json*/) => {
        location.reload();
    }).catch( () => {
        console.log("Error");
    })
}
function deleteOne(/*idItem*/) {

  let buttons = document.querySelectorAll('.deleteButtons');
  console.log(buttons);
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
          let idButton = buttons[i].parentNode.parentNode.id;
          console.log(idButton);
          fetch(url + "/" + idButton, {
              "method": "DELETE",
          })
          .then(() => {
              tbody.innerHTML = ""; 
              GetData();
          })
          .catch( ()=> {
              console.log("Error al remover")
          })
      });
  }
}
  function deleteAll(idAllItems) {
    buttonDeletedAll.addEventListener("click", function () {
      for (let i = 0; i < idAllItems.length; i++) {
        fetch(url + "/" + idAllItems[i], {
          method: "DELETE",
        })
          .then(() => {
            tbody.innerHTML = "";
          })
          .catch(() => {
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
    let editbutton = document.createElement("button");
    editbutton.innerHTML = "<img src='../Images/icons/edit.png'>";
    editbutton.className = "editButtons";
    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = "<img src='../Images/icons/deleted.png'>";
    deletebutton.className = "deleteButtons";
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
