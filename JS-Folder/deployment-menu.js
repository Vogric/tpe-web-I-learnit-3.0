document.addEventListener("DOMContentLoaded", StartPage);

function StartPage(){
    "use strict";
    document.querySelector("#menu-button").addEventListener("click", () =>{
        document.querySelector("#menu-bar").classList.toggle("hide-bar");
    }
    );
}