import { saveLSData, getLSData, renderProdBusket, sendTelegram } from "../service/service.js";
import { headerBurger } from "./header.js"

let products = document.querySelector(".products")
let title = document.querySelector("h1")
let fullprice = document.querySelector(".full-price-title")
let fullpriceCounter = document.querySelector(".full-price-title span")
let checkout = document.querySelector(".checkout")
let busketList = getLSData()

let modal = document.querySelector(".modal")
let modalClose = document.querySelector(".modal__window-cross")
let modalForm = document.querySelector(".modal form")
let modalInps = document.querySelectorAll(".modal input")
let checkoutSendNotify = document.querySelector(".modal__window-message")

checkout.addEventListener("click", () => {
	modal.classList.add("active")
})

modalClose.addEventListener("click", () => {
	modal.classList.remove("active")
})

modalForm.addEventListener("submit", (event) => {
	event.preventDefault()

	let prodsListMessage = ""
	let messageSuma = busketList.reduce((acc, el) => acc + el.price, 0)

	busketList.forEach((element) => {
		prodsListMessage += `${element.title}\n`
	})

	let message = `Нове замовлення:\n\nДані отримувача:\nЗамовник: ${modalInps[0].value}\nТелефон: ${modalInps[1].value}\nАдрес: ${modalInps[2].value}\n\nТовари які замовив:\n${prodsListMessage}\nНа суму: ${messageSuma} грн`

	sendTelegram(message).then(() => {
		checkoutSendNotify.innerHTML = "Ваша покупка успішно оформлена!"

		setTimeout(() => {
			checkoutSendNotify.innerHTML = ""
		}, 3000)
	})
})

if (busketList.length <= 0) {
	title.innerHTML = "Корзина пуста!"
	fullprice.style.opacity = 0
	checkout.style.opacity = 0
} else {
	title.innerHTML = "Корзина"
	fullprice.style.opacity = 1
	checkout.style.opacity = 1

	renderProdBusket(busketList, products)

	fullpriceCounter.innerHTML = busketList.reduce((acc, el) => acc + el.price, 0)

	products.addEventListener("click", (event) => {
		let clickedBtn = event.target.closest(".product-card button")
		if (clickedBtn) {
			let prodId = event.target.closest(".product-card ").dataset.id
			let index = busketList.findIndex(element => element.id == prodId)
			if (index >= 0) {
				busketList.splice(index, 1)
				renderProdBusket(busketList, products)
				saveLSData(busketList)
				fullpriceCounter.innerHTML = busketList.reduce((acc, el) => acc + el.price, 0)
				if (busketList.length <= 0) {
					title.innerHTML = "Корзина пуста!"
					fullprice.style.opacity = 0
					checkout.style.opacity = 0
				}
			}
		}
	})
}

headerBurger()



