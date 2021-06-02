const findBtn = document.getElementById("findBtn");
const addCenters = document.getElementById("addCenters");


date = new Date();
var d = date.getDate();
// d = 28;
var m = date.getMonth();
// m = 5;
var y = date.getFullYear();



findBtn.addEventListener("click", function () {
    // const inputPin= inputPin.value;
    const inputPinV = document.getElementById("inputPin").value;
    // console.log(inputPinV);
    // alert(inputPinV.length);

    if (inputPinV.length != 6) {
        alert("Please enter valid Pin Code");

    }
    else {
        // alert("you are good to go");
        // console.log(inputPinV);

        async function getByPin() {
            const pinApi = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${inputPinV}&date=${d}-${m}-${y}`);
            const getPin = await pinApi.json();
            console.log(getPin.sessions);
            const getPinData = getPin.sessions;
            // console.log(getPin.sessions[1]);
            // console.log(getPin.sessions[1].address);
            // console.log(getPin.sessions[1].name);

            if (getPinData.length ==0 ) {
                addCenters.innerHTML = `<p>Sorry, data not available please try another pin coder</p>`;
            }

            else {
            addCenters.innerHTML = "";
            for (let i = 0; i < getPinData.length; i++) {
                dataCard = `
                <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 m-2">
                <div class="card border-info" >
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Center name: ${getPinData[i].name}</li>
                    <li class="list-group-item">center ID: ${getPinData[i].center_id}</li>
                    <li class="list-group-item">Pin code: ${getPinData[i].pincode}</li>
                    <li class="list-group-item">Address: ${getPinData[i].address}</li>
                    <li class="list-group-item">Available Vaccine: ${getPinData[i].vaccine}</li>
                    <li class="list-group-item">Fee: ${getPinData[i].fee}, ${getPinData[i].fee_type}</li>
                    <li class="list-group-item">Available capacity: ${getPinData[i].available_capacity}</li>
                    <li class="list-group-item">Slots: ${getPinData[i].slots}</li>
                  </ul>
                </div>
              </div>
                `;

                addCenters.innerHTML += dataCard;

            }
            }
        }
        getByPin();

    }
});