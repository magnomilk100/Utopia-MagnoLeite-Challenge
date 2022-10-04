const assert = require("chai").assert;

const names = [
  "Michael Daniel Jäger",
  "LINUS HARALD christer WAHLGREN",
  "Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter LÅNGSTRUMP",
  "Kalle Anka",
  "Ghandi",
]

const expected = [
  { 
    first: "Michael", 
    middle: ["Daniel"], 
    last: "Jäger" 
  },
  { 
    first: "Linus", 
    middle: ["Harald", "Christer"], 
    last: "Wahlgren" 
  },
  {
    first: "Pippilotta",
    middle: ["Viktualia", "Rullgardina", "Krusmynta", "Efraimsdotter"],
    last: "Långstrump",
  },
  { 
    first: "Kalle", 
    middle: [], 
    last: "Anka" 
  },
  { 
    first: "Ghandi", 
    middle: [], 
    last: null 
  },
];

const results = async (names) => {
  // Final array with the new format
  const formatedNames = []; 
  const separator = ' '; 

  // Just console unexpected values, don't break the processing
  if(!(names instanceof Array)){
    console.log("An Array was expected. got " + typeof names);
  }else{
    if(names.length<=0){
      console.log("Array has " + names.length + " element.");
    }
  }

  for(let k=0; k<names.length;k++){
    nameRow = names[k]; 

    const name = {
      first: '',
      middle: [],
      last: null
    };

    const splitNames = await capitalizeFirstLetter(nameRow.split(separator));
    if(splitNames[0]<1){
      throw 'Exception: Incorrect number of elements for an item of the array with names.'
    }
    name.first=splitNames[0];

    if(splitNames.length>2){
      for(var j=1; j<splitNames.length-1; j++){
        name.middle.push(splitNames[j]);
      }
      name.last=splitNames[splitNames.length-1];
    }else if(splitNames.length>1){
      name.middle = [];      
      name.last=splitNames[1];
    }else{
      name.middle = [];
      name.last = null;
    }
    formatedNames.push(name);
  };

  return formatedNames;
};

// capitalize Just the first letter of any string
const capitalizeFirstLetter = async (text) => {
  for(let i=0; i<text.length; i++){
    text[i] = text[i].charAt(0).toUpperCase() + text[i].toLowerCase().slice(1);
  }  
  return text;
}

const validate = (result) => {
  try {
    assert.deepEqual(result, expected);
    console.log("Success");
  } catch (e) {
    console.error("Failed", e);
  }
};

// implement code generating result
const result = results(names).then((result) => {
  // At the end call validate
  validate(result);
}).catch(exception => {
  console.error(exception);
});

