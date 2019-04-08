
const buildList = (data) => {
  const list = document.createElement('ol');
  const div = document.getElementById('list-div');
  div.append(list);
  data.forEach(datum => {
    const listItem = document.createElement('li');
    let subItemOf = datum.subItemOfID; 
    console.log(datum);
    listItem.textContent = datum.Item;
    list.appendChild(listItem);
  })
}

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