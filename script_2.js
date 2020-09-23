'use strict';

console.log('Working')

const xeFormElem = document.querySelector('.xe-form');
const productsWrapperElem = document.querySelector('.products-wrapper')
const xeFormXeElem = document.querySelector('.xe-form__xe')
const xeFormCarbohydratesElem = document.querySelector('.xe-form__carbohydrates');
const xeFormWeightProductElem = document.querySelector('.xe-form__weight-product');
const xeFormXeResultElem = document.querySelector('.xe-form__xe-result');
const summaryElem = document.querySelector('.header__sum-value');

let resultItems = [];

xeFormXeElem.addEventListener('input', handleForm);
xeFormCarbohydratesElem.addEventListener('input', handleForm);
xeFormWeightProductElem.addEventListener('input', handleForm);
xeFormElem.addEventListener('submit', addProduct);
productsWrapperElem.addEventListener('click', delProductCard);

function renderProduct() {
	while (productsWrapperElem.firstChild) {
		productsWrapperElem.removeChild(productsWrapperElem.firstChild);
	}

	resultItems.forEach((item) => {
		productsWrapperElem.insertAdjacentHTML('afterbegin',
			`
			<div id="${item.id}" class="product-card">
			<section class="product-card__section">
				<h4 class="product-card__title">Углеводы в одной ХЕ:</h4>
				<div class="product-card__xe">${item.xe} г.</div>
			</section>
			
			<section class="product-card__section">							
				<h4 class="product-card__title">Углеводы в 100 г. продукта:</h4>
				<div class="product-card__carbohydrates">${item.carbohydrates} г.</div>
			</section>
			
			<section class="product-card__section">				
				<h4 class="product-card__title">Общий вес продукта:</h4>
				<div class="product-card__weight-product">${item.weight} г.</div>
			</section>
				
				<div class="product-card__xe-result">${item.xeResult} ХЕ</div>
				
				<button class="product-card__del-btn" type="button">Удалить</button>
			</div>
			`
		)
	})
}

function getFloat(value){
	return parseFloat(value.replace(/,/, '.'));
}

function handleForm() {
	const xe = getFloat(xeFormXeElem.value);
	const carbohydrates = getFloat(xeFormCarbohydratesElem.value);
	const weight = getFloat(xeFormWeightProductElem.value);
	let result = (carbohydrates / 100 * weight / xe).toFixed(2)
	isNaN(Number(result)) ? xeFormXeResultElem.innerHTML = '0.00' : xeFormXeResultElem.innerHTML = result;
}

function addProduct (event) {
	event.preventDefault();
	resultItems.push(
		{
			id: String(Date.now()),
			xe: Number(getFloat(xeFormXeElem.value)),
			carbohydrates: Number(getFloat(xeFormCarbohydratesElem.value)),
			weight: Number(getFloat(xeFormWeightProductElem.value)),
			xeResult: Number(getFloat(xeFormXeResultElem.textContent)),
		}
	);

	const s = resultItems.reduce((total, item) => {
		return total + item.xeResult
	}, 0)

	summaryElem.innerHTML = s.toFixed(2);

	xeFormCarbohydratesElem.value = '';
	xeFormWeightProductElem.value = '';
	xeFormXeResultElem.textContent = '0.00';
	renderProduct();
}

function delProductCard(event) {
	if (!event.target.classList.contains('product-card__del-btn')) return;
	const productCardId = event.target.parentElement.getAttribute('id');
	const arr = resultItems.filter(item => item.id !== productCardId);
	resultItems = [...arr];

	const s = resultItems.reduce((total, item) => {
		return total + item.xeResult
	}, 0)

	summaryElem.innerHTML = s.toFixed(2);

	renderProduct();
}







