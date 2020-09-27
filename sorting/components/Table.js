

export class Table {

    constructor(root) {
        this.path = root
        this.data = null
    }

    sortByBalance = () =>{
        let data = this.data
        data = data.sort(function (a, b) {
            a.balance = a.balance.replace(/^\$/, "");
            b.balance = b.balance.replace(/^\$/, "");
            return (+a.balance - +b.balance)
        })
        this.path.innerHTML= (`
                        <ul class="navigation">
                            <li>Company</li>
                            <li class="companyInfoBalance">Balance</li>
                            <li>Registered</li>
                            <li>Show address</li>
                            <li>Employers</li>
                            <li>Show employers</li>
                        </ul>
                        ${data.map(elem => {
                            return(`
                                <ul class="companyInfo" id=${elem._id}>
                                    <li>${elem.company}</li>
                                    <li>${elem.balance}</li>
                                    <li>${elem.registered}</li>
                                    <li class="companyAdr">Show address</li>
                                    <li>Employers: ${elem.employers.length}</li>
                                    <li class="companyEmp">Show employers</li>
                                </ul>
                            `)
                    }).join("")}
              `);
    }
    showEmployers = (event) =>{
        const id = event.target.parentElement.id;
        const targetAddress = this.data.filter(elem => elem._id === id);
        const employers = targetAddress[0].employers;
        let empInfo = document.createElement("div");
        empInfo.classList.add("empInfo");
        empInfo.innerHTML = `
            <ul class="companyEmployersModal">
                ${employers.map(elem =>{
                    return(`
                        <li>Name: ${elem.name}</li>
                        <li>Gender: ${elem.gender}</li>
                        <li>Age: ${elem.age}</li>
                        <li>Emails: ${elem.emails.map(emails => emails)}</li>
                        <li>Phones: ${elem.phones.map(phones => phones)}</li>
                    `)
                }).join("")}
            </ul>
        `;
        empInfo.addEventListener("click", function f() {
            document.body.removeChild(empInfo)
        })
        document.body.appendChild(empInfo)
    }

    showAddress = (event) =>{
        const id = event.target.parentElement.id;
        const targetAddress = this.data.filter(elem => elem._id === id);
        const location = targetAddress[0].address
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerText= `${location.country}, ${location.state}, (${location.zip}) ${location.city}, ${location.street}, ${location.house}`;
        document.body.appendChild(modal)
        modal.addEventListener("click", function () {
            document.body.removeChild(modal)
        })
    }

    render(){

        fetch("http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2")
            .then(response => response.json())
            .then(data =>{
                this.data = data;
                this.path.innerHTML= (`
                        <ul class="navigation">
                            <li>Company</li>
                            <li class="companyInfoBalance">Balance</li>
                            <li>Registered</li>
                            <li>Show address</li>
                            <li>Employers</li>
                            <li>Show employers</li>
                        </ul>
                        ${data.map(elem => {
                            return(`
                                <ul class="companyInfo" id=${elem._id}>
                                    <li>${elem.company}</li>
                                    <li>${elem.balance}</li>
                                    <li>${elem.registered}</li>
                                    <li class="companyAdr">Show address</li>
                                    <li>Employers: ${elem.employers.length}</li>
                                    <li class="companyEmp">Show employers</li>
                                </ul>

                    `)
                }).join("")}
              `);
                let employersBut = document.querySelectorAll(".companyEmp");
                let adrBut = document.querySelectorAll(".companyAdr");
                let balBut = document.querySelector(".companyInfoBalance");
                employersBut.forEach(elem => elem.addEventListener("click", this.showEmployers));
                adrBut.forEach(elem => elem.addEventListener("click", this.showAddress));
                balBut.addEventListener("click", this.sortByBalance)
            })
    }
}
