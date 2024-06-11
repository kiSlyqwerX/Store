function headerBurger() {
	let burger = document.querySelector("header .burgers")
	let headerNav = document.querySelector("header nav")

	burger.addEventListener("click", () => {
		burger.classList.toggle("active")
		headerNav.classList.toggle("active")
		document.body.classList.toggle("active")
	})
}

export { headerBurger }