const _URL = "https://66323010c51e14d69563a0ee.mockapi.io/products"
const _FEEDBACK_URL = "https://66323010c51e14d69563a0ee.mockapi.io/feedbacks"
const _CHAT_ID = "-1002204079526"
const _TG_TOKEN_BOT = "6338578235:AAG1SmdryZxDi88lJipSkrKpeFqXI2u_JI0"
const _TG_URL = `https://api.telegram.org/bot${_TG_TOKEN_BOT}/sendMessage`

async function sendTelegram(message) {
	try {
		return await fetch(_TG_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: _CHAT_ID,
				text: message,
				parse_mode: "html"
			}),
		})
	} catch (error) {
		return error
	}
}

async function getProducts(param = "") {
	let res = await fetch(_URL + param)
	let data = await res.json()
	return data
}

async function getFeedBacks() {
	let res = await fetch(_FEEDBACK_URL)
	let data = await res.json()
	return data
}

async function postFeedBack(newFeedBack) {
	let res = await fetch(_FEEDBACK_URL, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(newFeedBack)
	})
	let data = await res.json()
	return data
}


function renderFeedBacks(feedbacks, selector) {
	selector.innerHTML = ""

	feedbacks.forEach(feedback => {
		selector.innerHTML += `
		<div class="feedback__list-item">
							<h4>${feedback.author}</h4>
							<p>${feedback.text}</p>
							<p>${convertTime(feedback.date)}</p>
						</div>

		`
	})
}

function renderProdCard(products, selector, indexs = []) {
	selector.innerHTML = ""

	products.forEach((prod, i) => {
		selector.innerHTML += `
			<div class="product-card swiper-slide" data-id="${prod.id}">
				<img src="${prod.img}" alt="${prod.title}">
				<h3>${prod.title}</h3>
				<p class="product-card__descr">${prod.info}</p>
				<div class="product-card__bottom">
					<p class="product-card__price">${prod.price} грн</p>
					<button>${indexs.includes(prod.id) ? "В корзині" : "Купити"}</button>
				</div>
			</div>
		`
	})
}

function renderProdBusket(products, selector) {
	selector.innerHTML = ""

	products.forEach(prod => {
		selector.innerHTML += `
			<div class="product-card swiper-slide" data-id="${prod.id}">
				<img src="${prod.img}" alt="${prod.title}">
				<h3>${prod.title}</h3>
				<p class="product-card__descr">${prod.info}</p>
				<div class="product-card__bottom">
					<p class="product-card__price">${prod.price} грн</p>
					<button>Видалити</button>
				</div>
			</div>
		`
	})
}


function convertTime(time) {
	let date = new Date(time)

	let day = +date.getDate()
	let month = +date.getMonth() + 1
	let year = date.getFullYear()

	if (day < 10) {
		day = "0" + day
	}
	if (month < 10) {
		month = "0" + month
	}
	return `${day}.${month}.${year}`
}
function saveLSData(data) {
	localStorage.setItem("shop-card", JSON.stringify(data))
}

function getLSData() {
	let data = JSON.parse(localStorage.getItem("shop-card"))
	if (data) {
		return data
	}
	return []
}

export { getProducts, renderProdCard, getFeedBacks, renderFeedBacks, postFeedBack, saveLSData, getLSData, renderProdBusket, sendTelegram }


