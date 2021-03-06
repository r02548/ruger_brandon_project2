/* Brandon Ruger
 * Project 2
 * VFW 1308 */

window.addEventListener("DOMContentLoaded", function(){
    
    //Function to get elements from HTML file.
    function getElements(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    
    
    //Dynanmically create select field and populate it with options.
    function makeFleaMedOptions() {
        var formTag = document.getElementsByTagName("form");
        var chooseList = getElements('select');
        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "fleaRx");
        for (var i=0, j=fleaMedication.length; i<j; i++) {
            var createOption = document.createElement('option');
            var optionText = fleaMedication[i];
            createOption.setAttribute("value", optionText);
            createOption.innerHTML = optionText;
            makeSelect.appendChild(createOption);
        }
        chooseList.appendChild(makeSelect);
    }
    
    //Function to determine which check boxes are checked:
    function getSelectedCheckedBoxes() {
        if (getElements('fleaValue').checked) {
            fleaValue = getElements('fleaValue').value;
        } else {
            fleaValue = "No"
        };
        if (getElements('heartwormValue').checked){
            heartwormValue = getElements('heartwormValue').value;
        } else {
            heartwormValue = "No"
        };
        if (getElements('otherValue').checked) {
            otherValue = getElements('otherValue').value;
        } else{
            otherValue = "No"
        };
    };

    function toHideForm(n) {
        switch (n){
            case "on":
                getElements('addReminderForm').style.display = "none";
                getElements('clearData').style.display = "inline";
                getElements('displayData').style.display = "none";
                getElements('addNewReminder').style.display = "inline";
                break;
            case "off":
                getElements('addReminderForm').style.display = "block";
                getElements('clearData').style.display = "inline";
                getElements('displayData').style.display = "inline";
                getElements('addNewReminder').style.display = "none";
                getElements('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    //Create function to submit data.
    function submitData() {
        var generateId = Math.floor(Math.random()*100000001);
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input value.
        //getSelectedCheckedBoxes(); <Create Reminder button will not work unless I deactivate this function.
        var itemList            = {};
            itemList.fleaRx     = ["Flea Rx:", getElements('fleaRx').value];
            itemList.petname    = ["Pet Name:", getElements('petname').value];
            itemList.petage     = ["Pet Age:", getElements('petage').value];
            itemList.pettype    = ["Pet Type:", getElements('pettype').value];
            itemList.flea       = ["Flea:", fleaValue];
            itemList.heartworm  = ["Heartworm:", heartwormValue];
            itemList.other      = ["Other:", otherValue];
            itemList.date       = ["Date:", getElements('date').value];
            itemList.range      = ["Range:", getElements('range').value];
            itemList.note       = ["Note:", getElements('note').value];
            
            //Save data into Local Storage
            localStorage.setItem(generateId, JSON.stringify(itemList));
            alert("Reminder has been added!");
    }
    
    function getDataFromStorage() {
        toHideForm("on");
        //Write Data from local storage to the browser
        var createDiv = document.createElement('div');
        createDiv.setAttribute("id", "items");
        var createList = document.createElement('ul');
        createDiv.appendChild(createList);
        document.body.appendChild(createDiv);
        getElements('items').style.display = "block";
        for (var i=0; i<localStorage.length; i++) {
            var createListItem = document.createElement('li');
            createList.appendChild(createListItem);
            var dataKey = localStorage.key(i);
            var dataValue = localStorage.getItem(dataKey);
            //Convert string from local storage back to an Object.
            var findObject = JSON.parse(dataValue);
            var subList = document.createElement('ul');
            createListItem.appendChild(subList);
            for (var n in findObject) {
                var makeSublist = document.createElement('li');
                subList.appendChild(makeSublist);
                var subText = findObject[n][0]+ " " +findObject[n][1];
                makeSublist.innerHTML = subText;
            }
        }
        
    }
    
    function clearLocalStorage() {
        if (localStorage.length === 0) {
            alert("There is no data to clear.")
        } else {
            localStorage.clear();
            alert("All Reminders have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    //Variable Defaults
    var fleaMedication = ["--Type of Flea Medication--", "Topical", "Oral", "Spray-On"];
    var fleaCheckBox;
    var fleaValue;
    var heartwormValue;
    var otherValue;
    makeFleaMedOptions();
    
    //Set Link & Submit Click Events
    
    var displayData = getElements('displayData');
    displayData.addEventListener("click", getDataFromStorage);
    var clearData = getElements('clearData');
    clearData.addEventListener("click", clearLocalStorage);
    var createButton = getElements('button');
    createButton.addEventListener("click", submitData);
    
    
    
    
    
});

