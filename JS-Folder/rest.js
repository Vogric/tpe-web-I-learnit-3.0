document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let apiURL =
    "https://web-unicen.herokuapp.com/api/groups/94menchonvogrich/courses";

  let data = {
    thing: {
      course: inputCourse.value,
      duration: inputDuration.value,
      subject: inputSubject.value,
      topics: inputTopics.value,
    },
  };

  // function getInformationByGroup() {
  //   event.preventDefault();
  //   var grupo = $("#groupid").val();
  //   var coleccion = $("#collectionid").val();
  //   fetch(baseURL + grupo + "/" + coleccion, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then(function (response) {
  //       if (!response.ok) {
  //         document.querySelector("#infoGroup").innerHTML =
  //           "Error " + response.status;
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then(function (resultData) {
  //       //al ser tipo JSON resultData es un objeto listo para usar
  //       var html = "";
  //       for (var i = 0; i < resultData[coleccion].length; i++) {
  //         html += "Id: " + resultData[coleccion][i]["_id"] + "<br />";
  //         html +=
  //           "Informacion: " +
  //           JSON.stringify(resultData[coleccion][i]["thing"]) +
  //           "<br />";
  //         html += "--------------------- <br />";
  //       }
  //       document.querySelector("#infoGroup").innerHTML = html;
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  // }

  // function getInformationByItem() {
  //   event.preventDefault();
  //   var item = $("#itemid").val();
  //   fetch("https://web-unicen.herokuapp.com/api/thing/" + item, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then(function (response) {
  //       if (!response.ok) {
  //         document.querySelector("#infoItem").innerHTML =
  //           "Error " + response.status;
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then(function (resultData) {
  //       //al ser tipo JSON resultData es un objeto listo para usar
  //       let html = "";
  //       html += "Id: " + resultData.information["_id"] + "<br />";
  //       html += "Grupo: " + resultData.information["group"] + "<br />";
  //       html +=
  //         "Informacion: " +
  //         JSON.stringify(resultData.information["thing"]) +
  //         "<br />";
  //       document.querySelector("#infoItem").innerHTML = html;
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  // }

  // function guardarInformacion() {
  //   event.preventDefault();
  //   var grupo = $("#grupo").val();
  //   var coleccion = $("#coleccion").val();
  //   var informacion = $("#informacion").val();
  //   if (JSON.parse(informacion)) {
  //     informacion = JSON.parse(informacion);
  //   }
  //   //la estructura que debemos enviar es especifica de cada servicio que usemos
  //   //en este caso un hay que enviar un objeto con el numero de grupo y con lo que queramos guardarInformacion
  //   //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
  //   var info = {
  //     thing: informacion, //puede ser un objeto JSON!
  //   };

  //   if (grupo && informacion) {
  //     fetch(baseURL + grupo + "/" + coleccion, {
  //       method: "POST",
  //       mode: "cors",
  //       //se debe serializar (stringify) la informacion (el "data:" de ida es de tipo string)
  //       body: JSON.stringify(info),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then(function (response) {
  //         if (!response.ok) {
  //           document.querySelector("#guardarAlert").innerHTML =
  //             "Error " + response.status;
  //         } else {
  //           return response.json();
  //         }
  //       })
  //       .then(function (resultData) {
  //         $("#guardarAlert").removeClass("alert-danger");
  //         $("#guardarAlert").addClass("alert-success");
  //         //como le dimos dataType:"JSON" el resultData ya es un objeto
  //         //la estructura que devuelve es especifica de cada servicio que usemos
  //         $("#guardarAlert").html(
  //           "Informacion guardada con ID=" + resultData.information._id
  //         );
  //         console.log(resultData);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         $("#guardarAlert").addClass("alert-danger");
  //         $("#guardarAlert").html("Error por favor intente mas tarde");
  //       });
  //   } else {
  //     $("#guardarAlert").addClass("alert-danger");
  //     $("#guardarAlert").html("Grupo e Informacion son campos requeridos");
  //   }
  // }

  // function deleteInformationByItem() {
  //   event.preventDefault();
  //   let item = $("#deleteitemid").val();
  //   //la estructura que debemos enviar es especifica de cada servicio que usemos
  //   //en este caso un hay que enviar un objeto con el numero de grupo y con lo que queramos guardarInformacion
  //   //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
  //   console.log(item);
  //   if (item) {
  //     fetch(apiURL + "thing/" + item, {
  //       method: "DELETE",
  //       mode: "cors",
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then(function (response) {
  //         if (!response.ok) {
  //           document.querySelector("#deleteInfoItem").innerHTML =
  //             "Error " + response.status;
  //         } else {
  //           return response.json();
  //         }
  //       })
  //       .then(function (resultData) {
  //         console.log(resultData);
  //         if (resultData && resultData.status == "OK") {
  //           $("#deleteInfoItem").removeClass("alert-danger");
  //           $("#deleteInfoItem").addClass("alert-success");
  //           $("#deleteInfoItem").html("Informacion eliminada");
  //         } else {
  //           $("#deleteInfoItem").addClass("alert-danger");
  //           $("#deleteInfoItem").html("No se pudo eliminar correctamente.");
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         $("#deleteInfoItem").addClass("alert-danger");
  //         $("#deleteInfoItem").html("Error por favor intente mas tarde");
  //       });
  //   } else {
  //     $("#deleteInfoItem").addClass("alert-danger");
  //     $("#deleteInfoItem").html("Id es campo requerido");
  //   }
  // }
});
