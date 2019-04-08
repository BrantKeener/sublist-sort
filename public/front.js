
// const buildList = (data) => {
//   const list = document.createElement('ol');
//   const div = document.getElementById('list-div');
//   div.append(list);
//   data.forEach(datum => {
//     const listItem = document.createElement('li');
//     let subItemOf = datum.subItemOfID; 
//     if(subItemOf === 0) {
//       listItem.textContent = datum.Item;
//       list.appendChild(listItem);
//     };
//   });
// };

// const buildList = (data) => {
//   const list = document.createElement('ol');
//   const div = document.getElementById('list-div');
//   const topLevel = [];
//   div.append(list);
//   data.forEach(datum => {
//     console.log(datum);
//     if(datum.subItemOfID === 0) {
//       topLevel.push(datum);
//     }
//     // const listItem = document.createElement('li');
//     // let subItemOf = datum.subItemOfID; 
//     // subItemOfID.push(datum.subItemOfID);
//   });
//   console.log(topLevel);
// };

// const buildList = (data) => {
//   const list = document.createElement('ol');
//   const div = document.getElementById('list-div');
//   const mergedDataArray = [];
//   div.append(list);
//   data.forEach(datum => {
//     const newDataObject = 
//       {
//         Item: datum.Item,
//         parentItem: datum.subItemOfID,
//         subItems: []
//       };
//     data.forEach(element => {
//       if(datum.itemID === element.subItemOfID) {
//         newDataObject.subItems.push(element.Item);
//       };
//     });
//     mergedDataArray.push(newDataObject);
//   });
//   mergedDataArray.forEach(element => {
//     const listItem = document.createElement('li');
//     if(element.parentItem === 0) {
//       listItem.textContent = element.Item;
//       list.appendChild(listItem);
//       div.append(list);
//     };
//     if(element.subItems)
//     // } else {
//     //   forEach(element => {

//     //   })
//     // }
//   });
// };

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
  console.log(mergedDataArray);
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
    });
})();