const ITEA_COURSES = ["Курс HTML & CSS", "JavaScript базовый курс", "JavaScript продвинутый курс", "JavaScript Professional", "Angular 2.4 (базовый)", "Angular 2.4 (продвинутый)", "React.js", "React Native", "Node.js", "Vue.js"];

const searchRes = document.querySelector(".results");
const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("keyup", showRes)

//Задача №1
let newArr = [...ITEA_COURSES].slice();
newArr = newArr.map(elem =>  elem.length);
//------------------------------------------

//Задача №2
newArr.sort(function (a, b) {
    return (a - b)
})
//-------------------------------------------

//Задача №3
function showRes(event) {

    const regex = new RegExp(event.target.value, "i")
    let showList = ITEA_COURSES.filter(elem => regex.test(elem));
    if (event.target.value.length === 0) {
        searchRes.innerHTML = "";
        return
    }
    if (showList.length > 0) {
        searchRes.innerHTML = showList.map(elem => {
            return(`
                <li>${elem}</li>
            `)
        }).join("")
    }
}
//--------------------------------------------
