document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let apiURL =
    "https://web-unicen.herokuapp.com/api/groups/94menchonvogrich/courses";

  function sendData() {
    let course = document.querySelector("#course").value;
    if (course.length === 0) {
      item.innerHTML = "";
      return;
    }
    let data = {
      thing: {
        nombre: course,
      },
    };
    fetch(baseURL + groupID + "/" + collectionID, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (r) {
        if (!r.ok) {
          console.log("error");
        }
        return r.json();
      })
      .then(function (json) {
        contenedor.innerHTML = JSON.stringify(json);
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  document.querySelector("button").addEventListener("click", sendData);

  let data = {
    thing: {
      course: inputCourse.value,
      duration: inputDuration.value,
      subject: inputSubject.value,
      topics: inputTopics.value,
    },
  };
});
