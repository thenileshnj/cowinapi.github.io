const displayStateL = document.getElementById("displayStateL");
const addCenters = document.getElementById("addCenters");


date = new Date();
var d = date.getDate();
// d = 28;
var m = date.getMonth();
// m = 5;
var y = date.getFullYear();
// function to get list of states
async function getState() {
    const states = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states");
    // console.log(states);

    const listState = await states.json();
    // console.log(listState);
    // console.log(listState.states);
    // console.log(listState.states[4].state_name);

    const sListLen = listState.states.length;
    // console.log(sListLen);

    for (var i = 0; i < sListLen; i++) {
        const btns = document.createElement("a");
        // const btns = `<a class="btn btn-primary m-2" href="">Maharashtra</a>`;
        btns.innerText = listState.states[i].state_name;
        btns.classList.add('btn');
        btns.classList.add('m-2');
        btns.classList.add('btn-outline-warning');
        // btns.setAttribute("href", "./selectDist.html");
        function somefunc(index) {
            btns.addEventListener("click", function () {
                var stateID = listState.states[index].state_id;
                // console.log(stateID);
                // console.log(index);

                displayStateL.innerHTML = "";



                // function to get list of dist
                async function getDist() {
                    // const sID = 21;
                    var sID = stateID;
                    const dists = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${sID}`);
                    // console.log(dists);
                    const listDist = await dists.json();
                    // console.log(listDist.districts.length);
                    const dListLen = listDist.districts.length;


                    for (var i = 0; i < dListLen; i++) {
                        const dbtns = document.createElement("a");
                        // const dbtns = `<a class="btn btn-primary m-2" href="">Maharashtra</a>`;
                        dbtns.innerText = listDist.districts[i].district_name;
                        dbtns.classList.add('btn');
                        dbtns.classList.add('m-2');
                        dbtns.classList.add('btn-outline-warning');
                        function somefunc2(index) {
                            dbtns.addEventListener("click", function () {
                                const distID = listDist.districts[index].district_id;
                                // console.log(listDist.districts);
                                // console.log(distID);
                                // console.log(index);

                                // function to get center details
                                async function getCenter() {
                                    const dID = distID;
                                    const centers = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dID}&date=${d}-${m}-${y}`);
                                    // console.log(centers);
                                    const listCenters = await centers.json();
                                    console.log("hello");
                                    console.log(listCenters.sessions);
                                    const listOfCenters = listCenters.sessions;
                                    // console.log(listOfCenters[1].name);

                                    displayStateL.innerHTML = "";
                                    dbtns.addEventListener("click", function () {
                                        if (listOfCenters.length == 0) {
                                            addCenters.innerHTML = `<p>Sorry, data not available please try another pin coder</p>`;
                                        }

                                        else {
                                            // addCenters.innerHTML = "";
                                            for (let i = 0; i < listOfCenters.length; i++) {
                                                dataCards = `
                                            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 m-2">
                                            <div class="card border-info" >
                                              <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Center name: ${listOfCenters[i].name}</li>
                                                <li class="list-group-item">center ID: ${listOfCenters[i].center_id}</li>
                                                <li class="list-group-item">Pin code: ${listOfCenters[i].pincode}</li>
                                                <li class="list-group-item">Address: ${listOfCenters[i].address}</li>
                                                <li class="list-group-item">Available Vaccine: ${listOfCenters[i].vaccine}</li>
                                                <li class="list-group-item">Fee: ${listOfCenters[i].fee}, ${listOfCenters[i].fee_type}</li>
                                                <li class="list-group-item">Available capacity: ${listOfCenters[i].available_capacity}</li>
                                                <li class="list-group-item">Slots: ${listOfCenters[i].slots}</li>
                                              </ul>
                                            </div>
                                          </div>
                                            `;
                                            console.log(listOfCenters[i].name);

                                            addCenters.innerHTML += dataCards;

                                            }
                                        }
                                    })

                                }

                                getCenter();

                            })
                        }
                        somefunc2(i);
                        // console.log(index);

                        displayStateL.appendChild(dbtns);
                    }


                };
                getDist();



            })
        }
        somefunc(i);


        displayStateL.appendChild(btns);
    }

};


getState();
// getDist();