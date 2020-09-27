import {Table} from "../components/Table.js";



const root = document.querySelector("#root");
const newTable = new Table(root);

document.addEventListener("DOMContentLoaded", function () {
    newTable.render(root)
})
