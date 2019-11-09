//json array of fields we're tracking. Note that checkboxes and radios are using "name" not "id" attributes as to grab the group/collection
var inputData = [{
    "field_name": "age",
    "field_id": "comp-k2qjgqegcollection",
    "field_type": "select"
},
{
    "field_name": "gender",
    "field_id": "comp-k2nqpuilcollection",
    "field_type": "select"
},
{
    "field_name": "location",
    "field_id": "comp-k2nqy2hbinput",
    "field_type": "text"
},
{
    "field_name": "relationship",
    "field_id": "comp-k2qjlhgecollection",
    "field_type": "select"
},
{
    "field_name": "focus",
    "field_id": "comp-k2qepdz6",
    "field_type": "checkbox"
},
{
    "field_name": "goals",
    "field_id": "comp-k2nta64ztextarea",
    "field_type": "text"
},
{
    "field_name": "motivation",
    "field_id": "comp-k2ntedsmtextarea",
    "field_type": "text"
},
{
    "field_name": "values",
    "field_id": "comp-k2qh1frq",
    "field_type": "checkbox"
},
{
    "field_name": "attribute",
    "field_id": "comp-k2qj5t61",
    "field_type": "radio"
}
]

//json array of page redirect possibilities
var successPages = [
    { "page_name": "acceptance", "page_url": "/success-acceptance"},
    { "page_name": "balance", "page_url": "/success-balance"},
    { "page_name": "body composition", "page_url": "/success-body-composition"},
    { "page_name": "coachability", "page_url": "/success-coachability"},
    { "page_name": "confidence", "page_url": "/success-confidence"},
    { "page_name": "endurance", "page_url": "/success-endurance"},
    { "page_name": "fluidity", "page_url": "/success-fluidity"},
    { "page_name": "next", "page_url": "/success-next"},
    { "page_name": "perserverance", "page_url": "/success-perserverance"},
    { "page_name": "power", "page_url": "/success-power"},
    { "page_name": "quickness", "page_url": "/success-quickness"},
    { "page_name": "resilience", "page_url": "/success-resilience"},
    { "page_name": "speed", "page_url": "/success-speed"}
    ]

//generic function to set a cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


//generic function for grabbing a cookie's value
function getCookie(cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}

//function that grabs a field's value, different methods for different field types
function getFieldValue (inputID, inputType){
    if ( inputType === "text" ){
        var textField  = document.getElementById( inputID );
        if(textField){
            return textField.value;
        } else{
            return false;
        }
    } else if (inputType === "select"){
        var selectInput = document.getElementById( inputID );
        if(selectInput){
            return selectInput.options[selectInput.selectedIndex].value;
        } else{
            return false;
        }
    }
    else if (inputType === "checkbox"){
        var checkboxes = document.getElementsByName( inputID );
        if( checkboxes ){
            var checkVals = new Array;
            for (var i=0; checkboxes.length > i ; i++ )  {
                if ( checkboxes[i].checked ) {
                    checkVals.push( checkboxes[i].value );
                }
            }
        }
        if(checkVals){
            return checkVals;
        } else{
            return false;
        }
    }else if (inputType === "radio"){
        var radios = document.getElementsByName( inputID );
        if( radios ){
            var radioVal; 
            for (var i = 0; radios.length > i ; i++){
                if ( radios[i].checked ){
                    radioVal = radios[i].parentNode.textContent.toLowerCase();
                    break;
                }
            }
        }
        if(radioVal){
            return radioVal;
        } else{
            return false;
        }
    }    

}


//function that handles adding onchange and/or onclick events, different for different field types
function detectFieldChange ( inputID, inputType ){
    if ( inputType == "text" ){
        var textField  = document.getElementById( inputID );
        if(textField){
            
            textField.addEventListener('input', function (evt) {
                updateData(inputID, getFieldValue (inputID, inputType));
            });
            
        }
    }else if ( inputType === "select" ){
        var selectField = document.getElementById( inputID );
        if( selectField ){
            selectField.addEventListener("change", function() {
                updateData(inputID, getFieldValue (inputID, inputType));
            });
        }
    }else if ( inputType === "checkbox" || inputType === "radio" ){
        var inputItems = document.getElementsByName( inputID );
        if( inputItems ){
            for (var i=0; inputItems.length > i; i++) {
                inputItems[i].addEventListener("click", function() {
                    updateData(inputID, getFieldValue (inputID, inputType));
                });
                inputItems[i].addEventListener("change", function() {
                    updateData(inputID, getFieldValue (inputID, inputType));
                   
                });
            }
        }
    }
}

//function to update the cookie that stores input data
function updateData(inputID, inputValue){
    for(var i = 0; i < inputData.length; i++) {
        if ( inputData[i].field_id === inputID ){
            inputData[i].value = inputValue;
            console.log( "UPDATING: field name: " + inputData[i].field_name + " | field value: " + inputData[i].value);
        }
    }
    setCookie('inputData',JSON.stringify(inputData),1);
    
}

//start watching all form fields we're tracking
for(var i = 0; i < inputData.length; i++) {
    detectFieldChange ( inputData[i].field_id, inputData[i].field_type );
}


$("#comp-k2qivcerform").submit(function(e) {
    //grab collective form data
    var updatedData = JSON.parse(getCookie('inputData'));
    
    //verify form data was received correctly
    if( updatedData ){
        e.preventDefault();
        var form = $(this);
        
        var redirectPage
        //verify the most valuable attribute
        updatedData.forEach(function(inputField){
            if(inputField.field_name == 'attribute'){
                redirectPage = inputField.value;
            }
            
        });
        var redirectURL
        //grab the correct page_url for redirection based on selection
        successPages.forEach(function(pages){
            if(pages.page_name === redirectPage){
                redirectURL = pages.page_url;
            }    
        });
        console.log(redirectURL);
        //default to speed page if somehow we've failed to get the proper page.
        if(!redirectURL){redirectURL = "/success-speed" };

        $.ajax({
            data: form.serialize(), // serializes the form's elements.
            success: function(data){
                window.location.href = redirectURL;
            }
            });
    }
});