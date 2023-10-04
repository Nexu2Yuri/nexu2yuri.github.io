/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
async function getCountries(){
    var result = [];
    var response = await fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            var tab = [];
            for(var i in data)
                tab.push([i, data [i]]);
            for(let i = 0; i < data.length ;i++){
                //console.log(data[i]['translations']['fra']['official']);
                result.push(data[i]['translations']['fra']['official']);
                //tab = data.push([data[i]['code']] = data[i]['translations']['FR']['translation']);
            }
        });
    countriesJSON = JSON.stringify(result);
    localStorage.setItem("restcountries", countriesJSON);
    displayCountries(result);
}
function displayCountries(countries){
    for (let i = 0; i < countries.length; i++) {
        listCountries.innerHTML += "<option value='" + countries[i] + "'>" + countries[i] + "</option>";
    }
    
}
var countries;
var localSto = localStorage.getItem("restcountries");
var localStoCountries = JSON.parse(localSto);
if(localStoCountries != null){
    countries = localStoCountries;
    displayCountries(countries);
}
else
    getCountries();