const assert = require("chai").assert;

const positions = [
    { a: ["C", 2], b: ["D", 4], canAttack: true },
    { a: ["F", 7], b: ["E", 5], canAttack: true },
    { a: ["C", 2], b: ["A", 1], canAttack: true },
    { a: ["A", 6], b: ["B", 4], canAttack: true },
    { a: ["A", 6], b: ["B", 5] },
    { a: ["C", 2], b: ["C", 2] },
    { a: ["A", -1], b: ["B", 3] },
    { a: ["D", 4], b: ["E", 5] },
];

// Mapping letters to number
const chessBoardMappingLookup = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
};

// Chess board - Just for matrix reference = It is better to be on the documentation
const chessBoardMatrix = [
   // a, b, c, d, e, f, g, h     
    [11,12,13,14,15,16,17,78],
    [21,22,23,24,25,26,27,78],
    [31,32,33,34,35,36,37,78],
    [41,42,43,44,45,46,47,78],
    [51,52,53,54,55,56,57,78],
    [61,62,63,64,65,66,67,78],
    [71,72,73,74,75,76,77,78],
    [81,82,83,84,85,86,87,88],  
];

// Lookup positions
const movements = [
    [-2,-1],
    [-2, 1],
    [-1, 2],
    [ 1, 2],
    [ 2,-1],
    [ 2, 1],
    [-1,-2],
    [ 1,-2],
]

// Validate entries for Knight positions
const validateEntry = async (a, b, count) => {
    const numberOfLines = Object.keys(chessBoardMappingLookup).length;
    const firstLetter = Object.keys(chessBoardMappingLookup)[0];
    const lastLetter = Object.keys(chessBoardMappingLookup)[Object.keys(chessBoardMappingLookup).length-1];
    //console.log("Validandno Entry");
    if(chessBoardMappingLookup[a[0]]=="undefined" || a[1]>(numberOfLines) || a[1]<1 || 
       chessBoardMappingLookup[b[0]]=="undefined" || b[1]>(numberOfLines) || b[1]<1){
        throw "Test Position " + count + ". Invalid entry either " + a[0] + a[1] + " or "+ b[0] + b[1] + ". It is only allowed letters between " + firstLetter +" and " + lastLetter + " and integers between 1 and " + numberOfLines + ".";
    }
}

// implement this method to test if two knights threaten eachother
const canAttack = async (a, b, count) => {
    let threat = false;

    try{
        await validateEntry(a, b, count+1);
    }catch(exception){
        console.log('Exception: ' + exception);
        return false;
        //throw exception; // I don't want to stop processing
    }

    const positionKnight1Translated = String(chessBoardMappingLookup[a[0].toUpperCase()]) + a[1];
    const positionKnight2Translated = String(chessBoardMappingLookup[b[0].toUpperCase()]) + b[1];
    for(let l=0; l<movements.length; l++){
        const lineThreat2ToTest = parseInt(positionKnight2Translated.charAt(0)) + movements[l][0];
        const columnThreat2ToTest = parseInt(positionKnight2Translated.charAt(1)) + movements[l][1];
        if(positionKnight1Translated==(String(lineThreat2ToTest) + String(columnThreat2ToTest))){
            threat = true;
            break;
        }
    }

    return threat;
}

positions.forEach(async (test, index) => {
    try {
        assert.equal(await canAttack(test.a, test.b, index), !!test.canAttack);
    } catch (e) {
        console.error("FAILED", test);
    }
});