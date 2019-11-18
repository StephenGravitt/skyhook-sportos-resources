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
	{
	   "page_name": "acceptance",
	   "page_url": "/success-acceptance",
       "parent_box": ""
	},
	{
	   "page_name": "balance",
	   "page_url": "/success-balance",
	   "parent_box": ""
	},
	{
	   "page_name": "body composition",
	   "page_url": "/success-body-composition",
	   "parent_box": ""
	},
	{
	   "page_name": "coachability",
	   "page_url": "/success-coachability",
	   "parent_box": ""
	},
	{
	   "page_name": "confidence",
	   "page_url": "/success-confidence",
	   "parent_box": "comp-k2qofn76",
       "share_button": "comp-k2qofq2blabel"
	},
	{
	   "page_name": "endurance",
	   "page_url": "/success-endurance",
	   "parent_box": "comp-k2qoe4lg",
       "share_button": "comp-k2qoe78mlink"
	},
	{
	   "page_name": "fluidity",
	   "page_url": "/success-fluidity",
	   "parent_box": ""
	},
	{
	   "page_name": "next",
	   "page_url": "/success-next",
	   "parent_box": ""
	},
	{
	   "page_name": "perserverance",
	   "page_url": "/success-perserverance",
	   "parent_box": ""
	},
	{
	   "page_name": "power and strength",
	   "page_url": "/success-power",
	   "parent_box": "comp-k2pdr41m",
       "share_button": "comp-k2ru50aslabel"
	},
	{
	   "page_name": "quickness",
	   "page_url": "/success-quickness",
	   "parent_box": "comp-k2qof0d6",
       "share_button": "comp-k2qof3e7label"
	},
	{
	   "page_name": "resilience",
	   "page_url": "/success-resilience",
	   "parent_box": "comp-k2qog9bl",
       "share_button": "comp-k2qogcdolink"
	},
	{
	   "page_name": "speed",
	   "page_url": "/success-speed",
	   "parent_box": "comp-k2ru4y04",
       "share_button": "comp-k2ru50aslabel"
	}
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
        if(checkVals.length > 0){
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
    
    var cookieData = getCookie('inputData');

    if(!cookieData){
        //if cookie has not been set yet, load default json
        setCookie('inputData',JSON.stringify(inputData),1);
        cookieData = inputData;
    }else{
        //parse cookie data as JSON
        cookieData = JSON.parse(cookieData);
    }
    
    for(var i = 0; i < cookieData.length; i++) {
        if ( cookieData[i].field_id === inputID && inputValue ){
            cookieData[i].value = inputValue;
            console.log( "UPDATING: field name: " + cookieData[i].field_name + " | field value: " + cookieData[i].value);
            break;
        }
    }
    setCookie('inputData',JSON.stringify(cookieData),1);
}

//change final form redirect behavior
function changeFormRedirect(){
    //check to see if form 2 exists before doing form 2 tasks
    if (document.getElementById("comp-k2qivcerform")){
        
        console.log('updating form 2 redirection');
   
        $("#comp-k2qivcerform").submit(function(e) {
            //grab collective form data
            var cookieData = JSON.parse(getCookie('inputData'));
            
            //verify form data was received correctly
            if( cookieData ){
                console.log('update form 2 redirection');
                e.preventDefault();
                var form = $(this);
                
                //confirm selected value attribute which dictates redirect page
                var redirectPage
                redirectPage = getValueByName( cookieData , "attribute" );
                
                //grab the correct page_url for redirection based on selection
                var redirectURL
                successPages.forEach(function(pages){
                    if(pages.page_name === redirectPage){
                        redirectURL = pages.page_url;
                    }    
                });
                console.log(redirectURL);
                //default to speed page if somehow we've failed to get the proper page.
                if(!redirectURL){redirectURL = "/success-speed" };
                
                //submit via ajax and force updated redirect upon successful submission
                $.ajax({
                    data: form.serialize(),
                    success: function(data){
                        window.location.href = redirectURL;
                    }
                });
            }
        });
    }
}

//start watching all form fields we're tracking, load initial values seen on page (as this code loads at page footer)
function initDataTracking(){
    console.log('start tracking field changes');
    for(var i = 0; i < inputData.length; i++) {
        detectFieldChange ( inputData[i].field_id, inputData[i].field_type );
    }
    
    changeFormRedirect();
    
}

//is this a pre-defined results page?
function initResultsOutput( pagePath ){
    var parentBox = false;
    var shareButtonID;
    

    for(var i = 0; i < successPages.length; i++) {
        
        if(successPages[i].page_url === pagePath){
            parentBox = successPages[i].parent_box;
            shareButtonID = successPages[i].share_button;
            outputData(parentBox);
            linkifyShareButton(shareButtonID);
            break;
        }
    }
    return parentBox;
}

function getValueByName(jsonArray, field_name){
    for(var i = 0; i < jsonArray.length; i++) {
        if(jsonArray[i].field_name === field_name){
            return jsonArray[i].value;
        }
    }
}

function outputData(parentBox){
    var outputEl = document.getElementById(parentBox);
    /* while(outputEl.attributes.length > 0){
        outputEl.removeAttribute(outputEl.attributes[0].name);
    }
    outputEl.setAttribute("id",parentBox); */
    outputEl.classList.add("rendered");
    var cookieData = JSON.parse(getCookie('inputData'));
    var outputHTML = "";
    outputHTML += "<div id=\"sportos-results\">";
        outputHTML += "<div class=\"results-col col1\">";
            outputHTML += "<div class=\"gender-relationship sportos-block\">";
                outputHTML += "<h3 class=\"sportos-gender\" >" + getValueByName(cookieData, "gender") + "</h3>";
                outputHTML += "<h3 class=\"sportos-relationship\" >" + getValueByName(cookieData, "relationship") + "</h3>";
            outputHTML +="</div><!--/.gender-relationship-->"
            outputHTML += "<div class=\"age-location sportos-block\">";
                outputHTML += "<h3 class=\"sportos-age\" >" + getValueByName(cookieData, "age") + "</h3>";
                outputHTML += "<h3 class=\"sportos-location\" >" + getValueByName(cookieData, "location") + "</h3>";
            outputHTML +="</div><!--/.age-location-->"
            outputHTML += "<div class=\"focus sportos-block\" >";
                var focusVals = new Array;
                focusVals = getValueByName(cookieData, "focus");
                if(focusVals.length > 0 ){
                    for ( i=0 ; focusVals.length > i ; i++){
                        outputHTML += "<div class=\"sportos-focus-item\" >" + focusVals[i] + "</div>";
                    }
                }
            outputHTML += "</div><!--/.focus-->";
        outputHTML += "</div><!--/.results-col.col1-->";
        outputHTML += "<div class=\"results-col col2\">";
            outputHTML += "<div class=\"sportos-block goals\">";
                outputHTML += "<h3 class=\"goals sportos-label\">Goals</h3>";
                outputHTML += "<div class=\"tool-tip-container\"><img src=\"https://static.wixstatic.com/media/b42ed2_7571210680424427a4dbc7a87b152500~mv2.png/v1/fill/w_24,h_26,al_c,q_80/icon-question-rev.png\"><div class=\"tool-tip-inner\"><p>Driven by motivation and shaped by values, goals are targeted, desired results.</p></div></div>";
                outputHTML += "<p class=\"goals sportos-value\">" + getValueByName(cookieData, "goals") + "</p>";
            outputHTML += "</div><!--/.sportos-block.goals-->";
            outputHTML += "<div class=\"sportos-block motivation\">";
                outputHTML += "<h3 class=\"motivation sportos-label\">Motivation</h3>";
                outputHTML += "<div class=\"tool-tip-container\"><img src=\"https://static.wixstatic.com/media/b42ed2_7571210680424427a4dbc7a87b152500~mv2.png/v1/fill/w_24,h_26,al_c,q_80/icon-question-rev.png\"><div class=\"tool-tip-inner\"><p>Underpinned by values, motivation is the combination of desires, reasons, and needs that drive an athlete to set goals and upgrade behaviors.</p></div></div>";
                outputHTML += "<p class=\"motivation sportos-value\">" + getValueByName(cookieData, "motivation") + "</p>";
            outputHTML += "</div><!--/.sportos-block.motivation-->";
            outputHTML += "<div class=\"sportos-block values\">";
                var valueVals = new Array;
                valueVals = getValueByName(cookieData, "values");
                outputHTML += "<h3 class=\"values sportos-label\">Values</h3>";
                outputHTML += "<div class=\"tool-tip-container\"><img src=\"https://static.wixstatic.com/media/b42ed2_7571210680424427a4dbc7a87b152500~mv2.png/v1/fill/w_24,h_26,al_c,q_80/icon-question-rev.png\"><div class=\"tool-tip-inner\"><p>The athlete’s most important and cherished ideals, values are at the core of what drives the desire to set goals and create positive change.</p></div></div>";
                outputHTML += "<div class=\"values sportos-value\">";
                for ( i=0 ; valueVals.length > i ; i++){
                    outputHTML += "<div class=\"sportos-values-item\" >" + valueVals[i] + "</div>";
                }
                outputHTML += "</div><!--/.values.sportos-value-->";
            outputHTML += "</div><!--/.sportos-block.values-->";
        outputHTML += "</div><!--/.results-col.col2-->";
    outputHTML += "</div><!--#sportos-results-->";
    outputEl.innerHTML = outputHTML;
}

function linkifyShareButton(shareButtonID){
    var shareButton = document.getElementById(shareButtonID);
    linkURL = "mailto:?subject=SportOS%20Results&body=" + window.location.href + "?inputData=" + encodeURIComponent(JSON.stringify(getCookie("inputData")));
    shareButton.innerHTML = "<a href=\""+linkURL+"\">" + shareButton.innerHTML + "</a>";
}

function initSportOS(){
    console.log('wix rendered, loading sportos');
    //reset inputData to be blank if on first page of form, verified via age field
    var ageField = document.getElementById("comp-k2qjgqegcollection"); 
    if (ageField){
        console.log('resetting form data');
        setCookie('inputData',JSON.stringify(inputData),1);
    }

    var isResultsPage = initResultsOutput( window.location.pathname );
    if(!isResultsPage){
        initDataTracking();
    }
    
}

function loadTestData(){
    setCookie('inputData',"[{\"field_name\":\"age\",\"field_id\":\"comp-k2qjgqegcollection\",\"field_type\":\"select\",\"value\":\"30+\"},{\"field_name\":\"gender\",\"field_id\":\"comp-k2nqpuilcollection\",\"field_type\":\"select\",\"value\":\"MALE\"},{\"field_name\":\"location\",\"field_id\":\"comp-k2nqy2hbinput\",\"field_type\":\"text\",\"value\":\"Crescent City, CA\"},{\"field_name\":\"relationship\",\"field_id\":\"comp-k2qjlhgecollection\",\"field_type\":\"select\",\"value\":\"Vertical athlete\"},{\"field_name\":\"focus\",\"field_id\":\"comp-k2qepdz6\",\"field_type\":\"checkbox\",\"value\":[\"FOOTBAL / SOCCER\",\"US SPORTS\",\"OTHER\"]},{\"field_name\":\"goals\",\"field_id\":\"comp-k2nta64ztextarea\",\"field_type\":\"text\",\"value\":\"Pizza and Donuts\"},{\"field_name\":\"motivation\",\"field_id\":\"comp-k2ntedsmtextarea\",\"field_type\":\"text\",\"value\":\"See Goals\"},{\"field_name\":\"values\",\"field_id\":\"comp-k2qh1frq\",\"field_type\":\"checkbox\",\"value\":[\"Determination\",\"Ambition\",\"Integrity\",\"Leadership\",\"Expression\",\"Achievement\"]},{\"field_name\":\"attribute\",\"field_id\":\"comp-k2qj5t61\",\"field_type\":\"radio\",\"value\":\"speed\"}]", 1);
}

function isRendered(){
    if( document.getElementById("comp-k2s91jvplink").getAttribute("target") === "_blank" ){
        clearInterval(checkRendered);
        initSportOS();
       
    }else{
        console.log('wix not yet rendered, waiting to load sportos');
    }

}
var checkRendered = setInterval(isRendered, 500);

