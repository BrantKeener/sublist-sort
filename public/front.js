// This array is utilized when no database can be found (ie with github pages)
const offLineArray = 
[
  { itemID: 1, Item: "Item1", subItemOfID: 0 },
  { itemID: 2, Item: "Item2", subItemOfID: 0 },
  { itemID: 3, Item: "Item3", subItemOfID: 0 },
  { itemID: 4, Item: "Item10", subItemOfID: 1 },
  { itemID: 5, Item: "Item11", subItemOfID: 1 },
  { itemID: 6, Item: "Item12", subItemOfID: 1 },
  { itemID: 7, Item: "Item100", subItemOfID: 4 },
  { itemID: 8, Item: "Item101", subItemOfID: 4 },
  { itemID: 9, Item: "Item102", subItemOfID: 4 },
  { itemID: 10, Item: "Item30", subItemOfID: 3 },
  { itemID: 11, Item: "Item31", subItemOfID: 3 },
  { itemID: 12, Item: "Item33", subItemOfID: 3 },
]

// This particular function utilizes a forEach within another forEach giving it a O(n^2)
const buildListOn2 = (data) => {
  const list = document.createElement('ol');
  const div = document.getElementById('list-div');
  const mergedDataArray = [];
  div.append(list);
  // Build a new object that will tell us if a parent has subitems
  data.forEach(datum => {
    const newDataObject = 
      {
        itemID: datum.itemID,
        item: datum.Item,
        parentItem: datum.subItemOfID,
        subItems: []
      };
    data.forEach(element => {
      if(datum.itemID === element.subItemOfID) {
        newDataObject.subItems.push({ id: element.itemID, item: element.Item, parent: element.subItemOfID });
      };
    });
    mergedDataArray.push(newDataObject);
  });
  // Look through the newly merged data, and build the toplevel list if it has no parent items, or sublists if it does.
  mergedDataArray.forEach(element => {
    const listItem = document.createElement('li');
    if(element.parentItem === 0) {
      listItem.textContent = element.item;
      listItem.id = element.itemID;
      list.appendChild(listItem);
      div.append(list);
    };
    if(element.subItems.length > 0) {
      const sublist = document.createElement('ol');
      element.subItems.forEach(subItem => {
        const parentListItem = document.getElementById(subItem.parent);
        const subListItem = document.createElement('li');
        subListItem.textContent = subItem.item;
        subListItem.id = subItem.id;
        sublist.appendChild(subListItem);
        parentListItem.appendChild(sublist);
      });
    };
  });
};

// An O(n) function with 3 forEach loops, and zero nested loops.
const buildListOn = (data) => {
  const subItemArray = [];
  const topLevelArray = [];
  const list = document.createElement('ol');
  const div = document.getElementById('list-div');
  // Seperate subitems from top level items for faster loopin later
  data.forEach(datum => {
    if(datum.subItemOfID !== 0) {
      subItemArray.push(datum);
    } else {
      topLevelArray.push(datum);
    };
  });
  // Build our top level list
  topLevelArray.forEach(element => {
    const listItem = document.createElement('li');
    listItem.textContent = element.Item;
    listItem.id = element.itemID;
    list.appendChild(listItem);
    div.appendChild(list);
  });
  // Add all the subitems to the top level list
  subItemArray.forEach(element => {
    const itemParent = document.getElementById(element.subItemOfID);
    const subList = document.createElement('ol');
    const subListItem = document.createElement('li');
    subListItem.textContent = element.Item;
    subListItem.id = element.itemID;
    subList.appendChild(subListItem);
    itemParent.appendChild(subList);
  })
};

const grabData = (method) => {
  let sublistData;
  fetch('/sublist')
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      sublistData = myJson;
      if(method === 'On') {
        buildListOn(sublistData);
      } else if(method === 'On2') {
        buildListOn2(sublistData);
      };
    })
    .catch(error => {
      console.log(error);
      if(method === 'On') {
        buildListOn(sublistData);
      } else if(method === 'On2') {
        buildListOn2(sublistData);
      };
    });
};

document.addEventListener('click', (event) => {
  const { id } = event.target;
  if(id === 'query-db') {
    const selection = document.getElementById('method-select').value;
    const div = document.getElementById('list-div');
    while(div.firstChild) {
      div.removeChild(div.firstChild);
    }
    if(selection === 'O(n)') {
      grabData('On');
    } else if(selection === 'O(n2)') {
      grabData('On2');
    };
  };
});