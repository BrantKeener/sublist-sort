// Create an array of length "length" filled with pseudo-random values
function generate(length) {

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const noDupsObjArr = []

  for (var i = 0; i < length; i += 1) {
    arr.push(Math.ceil(Math.random() * length));
  };
  arr.sort((a, b) => a - b);
  let noDups = [...new Set(arr)];
  noDups.forEach((element, index) => {
    const stringyElement = element.toString();
    const stringyElementLength = stringyElement.length;
    switch(stringyElementLength) {
      case 1 :
        noDupsObjArr.push({ itemID: (index + 1), Item: element, subItemOfID: 0 });
        break;
      case 2 :
        noDupsObjArr.forEach(item => {
          const char1 = stringyElement.charAt(0);
          const itemCompareString = item.Item.toString();
          if(char1 === itemCompareString) {
            noDupsObjArr.push({ itemID: (index + 1), Item: element, subItemOfID: item.itemID });
          };
        });
        break;
      case 3 :
        noDupsObjArr.forEach(item => {
          const char1 = stringyElement.charAt(0)
          const char2 = stringyElement.charAt(1);
          const itemComp1 = item.Item.toString().charAt(0);
          const itemComp2 = item.Item.toString().charAt(1);
          if(char1 === itemComp1 && char2 === itemComp2 && item.Item.toString().length !== 3) {
            return noDupsObjArr.push({ itemID: (index + 1), Item: element, subItemOfID: item.itemID })
          };
        });
        break;
      };
  });
  return noDupsObjArr;
};

module.exports = generate;
