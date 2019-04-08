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

const buildList = (data) => {
  const list = document.createElement('ol');
  const div = document.getElementById('list-div');
  const mergedDataArray = [];
  div.append(list);
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


(grabData = () => {
  let sublistData;
  fetch('/sublist')
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      sublistData = myJson;
      buildList(sublistData);
    })
    .catch(error => {
      console.log(error);
      buildList(offLineArray);
    });
})();