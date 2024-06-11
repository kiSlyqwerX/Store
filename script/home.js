import { getProducts, renderProdCard, getFeedBacks, renderFeedBacks, postFeedBack, saveLSData, getLSData } from "../service/service.js";



function initialHomePage() {
	let hitsProducts = document.querySelector("#hits-products")
	let discountsProducts = document.querySelector("#discounts-products")
	let accessoriesProducts = document.querySelector("#accessories-products")
	let feedbackButton = document.querySelector(".feedback__add")
	let feedBackModal = document.querySelector(".feedback__modal")
	let feedBackClose = document.querySelector(".feedback__modal-close")
	let feedBackSend = document.querySelector(".feedback-send")
	let feedBackList = document.querySelector(".feedback__list")
	let feedBackInput = document.querySelector(".feedback__modal input")
	let feedBackText = document.querySelector(".feedback__modal textarea")

	let busketList = getLSData()

	hitsProducts.addEventListener("click", (event) => {
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
	discountsProducts.addEventListener("click", (event) => {
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
	accessoriesProducts.addEventListener("click", (event) => {
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

	getProducts("?popular=true").then(data => {
		let indexes = []

		data.forEach(element => {
			let index = busketList.findIndex(el => el.id == element.id)
			if (index >= 0) {
				indexes.push(busketList[index].id)
			}
		})
		renderProdCard(data, hitsProducts, indexes)
	})
	getProducts("?discount=true").then(data => {
		let indexes = []

		data.forEach(element => {
			let index = busketList.findIndex(el => el.id == element.id)
			if (index >= 0) {
				indexes.push(busketList[index].id)
			}
		})
		renderProdCard(data, discountsProducts, indexes)
	})
	getProducts("?category=accessories").then(data => {
		let indexes = []

		data.forEach(element => {
			let index = busketList.findIndex(el => el.id == element.id)
			if (index >= 0) {
				indexes.push(busketList[index].id)
			}
		})
		renderProdCard(data, accessoriesProducts, indexes)
	})

	getFeedBacks().then(data => renderFeedBacks(data, feedBackList))
	feedbackButton.addEventListener("click", () => {
		feedBackModal.classList.add("active")
	})
	feedBackClose.addEventListener("click", (event) => {
		feedBackModal.classList.remove("active")
		event.preventDefault()
	})
	feedBackSend.addEventListener("click", (event) => {
		event.preventDefault()
		if (feedBackInput.value == "" || feedBackText.value == "") {
			alert("Ви маєте написати щось")

		} else {
			let newComment = {
				author: feedBackInput.value,
				text: feedBackText.value,
				date: Date.now()
			}
			postFeedBack(newComment).then(() => {
				getFeedBacks().then(data => renderFeedBacks(data, feedBackList))
			})
			feedBackModal.classList.remove("active")
		}
	})

}

export { initialHomePage }