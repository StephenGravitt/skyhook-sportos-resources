

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
    "field_id": "comp-k2nr33orinput",
    "field_type": "text"
},
{
    "field_name": "focus",
    "field_id": "comp-k2qepdz6[]",
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
    "field_id": "comp-k2qh1frq[]",
    "field_type": "checkbox"
},
{
    "field_name": "attribute",
    "field_id": "comp-k2qivcl7[]",
    "field_type": "radio"
}
]


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
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


function getFieldValue (inputID, type){
    if ( type === "text" ){
        var textField  = document.getElementById( inputID );
        if(textField){
            return textVal.value;
        } else{
            return false;
        }
    } else if (type === "select"){
        var selectInput = document.getElementById( inputID );
        if(selectInput){
            return selectInputoptions[selectInput.selectedIndex].value;
        } else{
            return false;
        }
    }
    else if (type === "checkbox"){
        var checkboxes = document.getElementsByName( inputID );
        if( checkboxes ){
            var checkVals = new Array;
            for (var i=0; checkboxes.length<i; i++) {
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
    }else if (type === "radio"){
        var radios = document.getElementsByName( inputID );
        if( radios ){
            var radioVal; 
            for (var i = 0, length = radios.length; i < length; i++){
                if ( radios[i].checked ){
                    radioVal = radios[i].value;
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


for(var i = 0; i < inputData.length; i++) {
    var inputObj = inputData[i];

    console.log(inputObj.field_name);
    console.log( getFieldValue( inputObj.field_id, inputObj.field_type ) );
}



/*

var onChangeInput = function(el) {
  console.info(this.value);
};
var input = document.getElementById('some-id');
input.addEventListener('input', onChange, false); 


*/