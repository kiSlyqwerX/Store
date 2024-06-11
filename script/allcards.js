import { getProducts, renderProdCard, saveLSData, getLSData } from "../service/service.js";
import { headerBurger } from "./header.js"

let products = document.querySelector(".products")
let busketList = getLSData()

getProducts("").then(data => {
	let indexes = []

	data.forEach(element => {
		let index = busketList.findIndex(el => el.id == element.id)
		if (index >= 0) {
			indexes.push(busketList[index].id)
		}
	})

	renderProdCard(data, products, indexes)
})

products.addEventListener("click", (event) => {
	let clickedBtn = event.target.closest(".product-card button")
	if (clickedBtn) {
		let prodId = event.target.closest(".product-card").dataset.id
		getProducts(`/${prodId}`).then(data => {
			busketList.push(data)
			saveLSData(busketList)
			event.target.innerHTML = "В корзині"
		})
	}
})

headerBurger()

