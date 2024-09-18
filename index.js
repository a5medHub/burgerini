import {
    menuArray
} from "./data.js"
import {
    v4 as uuidv4
} from 'https://jspm.dev/uuid';

const menuEl = document.getElementById("menu")
const paymentEl = document.getElementById("payment")
const totalEl = document.getElementById("total")
const allData = []
const priceOfId = {}
let totalPriceListCounter = 0

document.addEventListener("click", (event) => {
    if (event.target.dataset.icon) {
        addToMenu(event.target.dataset.icon)

    } else if (event.target.dataset.delete) {
        removeItemFromOrder(event.target.dataset.delete)
    }
})

function removeItemFromOrder(id) {
    const order = document.getElementById(id)
    totalPriceListCounter -= 2

    Object.entries(priceOfId).forEach(function (e) {
        if (e[0] === order.id) {
            delete priceOfId[e[0]]
            totalAmmount(e[0], -e[1])
        }
    })
    if (totalPriceListCounter > 0) {
        order.innerHTML = ''
    } else {
        order.innerHTML = ''
        totalEl.innerHTML = ''
    }
}

function addToMenu(e, counter) {
    let id = uuidv4()
    const addItem = menuArray.filter(item => item.id == e)[0]
    let theHtmlRender = `
            <div class="orders" id="${id}">
                <div class="itemAdded">
                    <h3>${addItem.name} <!--<small class="${addItem.name}">x${counter}</small>--></h3>
                    <button class='delete' data-delete="${id}" >remove</button>
                    <h5>$${addItem.price}</h5>
                </div>
            </div>`
    priceOfId[id] = addItem.price
    paymentEl.innerHTML += theHtmlRender
    totalAmmount(id, addItem.price, addItem.name, addItem.id)
}

function totalAmmount(uid, price, name, id) {
    let pair = [uid, price]
    allData.push(pair)
    const itemsPriceSum = allData.map(function (item) {
            return item[1]
        })
        .reduce(function (first, last) {
            return first + last
        })
    totalPriceList(itemsPriceSum)
}

function totalPriceList(itemPrice) {
    totalPriceListCounter += 1
    totalEl.innerHTML = `
    <hr class='hrPriceList'>
    <div class='totalPriceList'>
        <h3>Total Price:</h3>
        <p>$${itemPrice}</p>
    </div>
    <button class="submitOrder">Complete order</button>`
}

function getMenuItems() {
    return menuArray.map(e => {
        return `
         <div class="item">
            <p>${e.emoji}</p>
            <div class="itemType">
                <h3 class="name">${e.name}</h3>
                <p class="ingredients">${e.ingredients}</p>
                <p class="price">$${e.price}</p>
            </div>
            <button data-icon="${e.id}" id="add-button" class="icon">+</button>
         </div>
         <hr>`
    }).join('')
}

function render() {
    menuEl.innerHTML = getMenuItems()

}
render()