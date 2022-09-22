const dragList = document.getElementById('drag-list')
const chcekBtn = document.getElementById('check')

const favFood = [
  "Pao Bhaji", "Chole Bhature", "Chocolate Truffle Pastry", "Rajma Chawal", "Paneer Roll", "Macaroni", "Chocolate Pudidng"
]

// it is goig to store the sortable list items
const listItems = []

let dragStartIndex;
createList();

// Insert list item into DOM
function createList() {
  [...favFood]
    .map(a => ({ value: a, sort: Math.random() }))// made an object out an an array item
    .sort((a, b) => a.sort - b.sort)//sort it according to the random value
    .map(a => a.value)//map each sorted item and extract its value with item.value
    .forEach((food, index) => {
      // console.log(food)
      const listItem = document.createElement('li')
      // listItem.classList.add('wrong')
      listItem.setAttribute('data-index', index);
      listItem.innerHTML =
        `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="food-name">${food}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
    `;

      listItems.push(listItem);

      dragList.appendChild(listItem)
    })

  addEventListeners()
}

function dragStart() {
  // console.log('dragstart')
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex)
}

function dragOver(e) {
  // console.log('dragOver')
  e.preventDefault();

}

function dragDrop() {
  // console.log('dragDrop')
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')
  // console.log(itemOne, itemTwo)
  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function dragEnter() {
  // console.log('dragEnter')
  this.classList.add('over')
}

function dragLeave() {
  // console.log('dragLeave')
  this.classList.remove('over')
}


// check the order of items in the list
function checkOrder() {
  listItems.forEach((item, index) => {
    const itemName = item.querySelector('.draggable').innerText.trim()

    if (itemName !== favFood[index]) {
      item.classList.add('wrong')
    } else {
      item.classList.remove('wrong')
      item.classList.add('right')
    }
  })
}


function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.drag-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)

  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave);
  })
}

chcekBtn.addEventListener('click', checkOrder)