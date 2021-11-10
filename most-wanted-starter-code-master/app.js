"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits 
      searchResults = traitSearchHub(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

function traitSearchHub(people, list=[]){
  let promptMessage = "What trait would you like to filter the database by?: \nAvailable trait Filter methods: \nGender:\nDate of Birth\nHeight\nWeight\nEye Color\nOccupation\nPlease Enter One below!\nOr Restart if you have a name.";
  let input = promptFor(promptMessage, autoValid);
  input = input.toLowerCase().trim();
  let result = traitFilter(input, people, list);
  

  //Add Function or logic to support multiple returns and minimalism list

}

function traitFilter(input, people, list) {
  let result;
  switch(input){

    case "gender":
      result = searchByGender(people, list); //TODO: searchByGender function
      break;
    case "date of birth":
      result = searchByDatOfBirth(people, list); //TODO: searchByDateOfBirth function
      break;
    case "height":
      result = searchByHeight(people, list) //TODO: searchByHeight Function
      break;
    case "weight":
      result = 0 //TODO: searchByWeight function
      break;
    case "eye color":
      result = searchByEyeColor(people, list);
      break;
    case "occupation":
      result = 0 //TODO: searchByOccupation function
      break;
    default:
      traitSearchHub(people); // If input does not match any of the above, ask again
  }
  return result;
}

//TODO: add other trait filter functions here.

function searchByGender(people, list){
  let userAnswer = promptFor("What Gender do you want to filter by?: ", autoValid)
  var passedListOfPeople = list.length;
  let newList = [];
  if (passedListOfPeople == 0){
    newList = people.filter(function(person){
      if(userAnswer == person.gender){
        return true;
      }else{
        return false;
      }
    })
  }else if(passedListOfPeople > 0){
    newList = list.filter(function(person){
      if(userAnswer == person.gender){
        return true;
      }else{
        return false;
      }
    })
  }
  return newList;
}

function searchByEyeColor(people, list){
  let userAnswer = promptFor("What Eye Color do you want to filter by?:\nAvailable options:\nPlease Select One: \n Brown,\n Black,\n Hazel,\n Blue,\n Green,\nPlease Type One ", autoValid)
  var passedListOfPeople = list.length;
  let newList = [];
  if (passedListOfPeople == 0){
    newList = people.filter(function(person){
      if(userAnswer == person.eyeColor){
        return true;
      }else{
        return false;
      }
    })
  }else if(passedListOfPeople > 0){
    newList = list.filter(function(person){
      if(userAnswer == person.eyeColor){
        return true;
      }else{
        return false;
      }
    })
  }
  return newList;
}

function searchByDatOfBirth(people, list){
  let userAnswer = promptFor("Please Enter the D.O.B that you want to fetch from the data base:\nWARNING - Format must follow MM/DD/YYYY, With NO '0' before single digit entry ", autoValid)
  var passedListOfPeople = list.length;
  let newList = [];
  if (passedListOfPeople == 0){
    newList = people.filter(function(person){
      if(userAnswer == person.dob){
        return true;
      }else{
        return false;
      }
    })
  }else if(passedListOfPeople > 0){
    newList = list.filter(function(person){
      if(userAnswer == person.dob){
        return true;
      }else{
        return false;
      }
    })
  }
  return newList;
}

function searchByHeight(people, list){
  let userAnswer = promptFor("Please enter the Height you want to filter by: \nWARNING - Height must be the total inches of someones height.\nEXAMPLE - 6ft 2ins would be inputted as 74. ", autoValid)
  var passedListOfPeople = list.length;
  let newList = [];
  if (passedListOfPeople == 0){
    newList = people.filter(function(person){
      if(userAnswer == person.height){
        return true;
      }else{
        return false;
      }
    })
  }else if(passedListOfPeople > 0){
    newList = list.filter(function(person){
      if(userAnswer == person.height){
        return true;
      }else{
        return false;
      }
    })
  }
  return newList;
}



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion