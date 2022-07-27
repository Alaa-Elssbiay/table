var recordname = document.getElementById("name");
var recordage = document.getElementById("age");
var recordemail = document.getElementById("email");
var recordaddress = document.getElementById("address");
var recordgender = document.getElementById("gender");
var recorddateOfBirth = document.getElementById("dateOfBirth");
var addBtn=document.getElementById("addBtn");
var save=document.getElementById("save");
var currentindex=0;
var myData = [];
var http = new XMLHttpRequest();
http.open(`GET`, `http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_data?authorization=3995005&staff_id=&poffset=0&staff_short_code&staff_name=`);
http.send();
http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
        myData = JSON.parse(http.response);
        myData = myData.data;
        save.style.display="none"
        show();
    }
}
function show() {
    var cont = ``;
    for (var i = 0; i < myData.length; i++) {
        cont += `<tr>
            <td>` + myData[i].staff_name + `</td>
            <td>`+ myData[i].age + `</td>
            <td>`+ myData[i].email + `</td>
            <td>`+ myData[i].address + `</td>
            <td>`+ myData[i].genger + `</td>
            <td>`+ myData[i].date_of_birth + `</td>
            <td><button onclick="updateproduct(`+i+`)" class="btn btn-success" >Edit</button></td>
            <td><button onclick="deleterecord(`+i+`)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cont;
}
function displayrecord() {
    var record =
    {
        authorization:"201792",
        "data":[{
            record_status:"n",
            staff_name: recordname.value,
            age: recordage.value,
            email: recordemail.value,
            address: recordaddress.value,
            genger: recordgender.value,
            date_of_birth:recorddateOfBirth.value,
            flag:"A",
            staff_id:"staff_id",
            data_start_service:"data_start_service"
        }]
             

    }
    myData.push(record);
    let post = JSON.stringify(record)
    const url = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.send(post);
    show();
    clearform();
}
function updateproduct(index) {
    currentindex = index;
    recordname.value = myData[index].staff_name;
    recordage.value = myData[index].age;
    recordemail.value = myData[index].email;
    recordaddress.value = myData[index].address;
    recordgender.value = myData[index].genger;
    recorddateOfBirth.value= myData[index].date_of_birth;
    addBtn.style.display='none';
    save.style.display="inline-block";
    scroll({top:0,behavior:'smooth'})
}
function clearform() {
    recordname.value = "";
    recordage.value = "";
    recordemail.value = "";
    recordaddress.value = "";
    recordgender.value = "";
    recorddateOfBirth.value="";
}
function saveupdate()
{
    var record =
         {
             authorization:"201792",
              "data":[{
                 record_status:"u",
                 staff_name: recordname.value,
                 age: recordage.value,
                 email: recordemail.value,
                 address: recordaddress.value,
                 genger: recordgender.value,
                 date_of_birth:recorddateOfBirth.value,
                 flag:"A",
                 staff_short_code:"AZ",
                 staff_id:myData[currentindex].staff_id,
                 data_start_service:"data_start_service"
              }] }
        myData[currentindex] =record;
    fetch("http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml", {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
        })
    .then((response) => response.json())
    .then((record) => {
    console.log('Success:', record);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    addBtn.style.display='inline-block';
    save.style.display="none";
    show();
    clearform();
}
function deleterecord(index)
{
    var record =
    {
            authorization:"201792",
            "data":[{
                record_status:"d",
                staff_name: recordname.value,
                age: recordage.value,
                email: recordemail.value,
                address: recordaddress.value,
                genger: recordgender.value,
                date_of_birth:recorddateOfBirth.value,
                flag:"A",
                staff_id:myData[index].staff_id,
                date_start_service:"date_start_service"
                }]}

    myData[currentindex] = record;

    myData.splice(index,1)
    let post = JSON.stringify(record)
    const url = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml"
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.send(post);
    show();
}

