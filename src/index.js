import './styles/style.scss';
import './styles/transition.scss';

const NUM_TRANSITEMS = 5;
let index = 0;

const container = document.querySelector('.home-container');
const transBtn = document.querySelector('.trans-btn');

transBtn.textContent = 'Next';

function toggleTransBtnText() {
	transBtn.textContent = transBtn.textContent == 'Next' ? 'Back' : 'Next';
}

function initTransition() {
	console.log('init trans');
	createTransItems();
	toggleTransBtnText();
}

function createTransItems() {
	if (index <= NUM_TRANSITEMS) {
		setTimeout(() => {
			let item = document.createElement('div');
			item.className = `item-${index + 1}`;
			item.classList.add('item');
			console.log(item);
			container.appendChild(item);
			index++;
			createTransItems();
		}, 200);
	} else {
		index = 0;
		dissolveItems();
		// toggleTransBtnText();
	}
}

function dissolveItems() {
	let items = document.querySelectorAll('.item');
	console.log(items);

	if (index <= NUM_TRANSITEMS) {
		setTimeout(() => {
			items[index].classList.remove(`item-${index + 1}`);
			console.log(items[index]);
			index++;
			dissolveItems();
		}, 200);
	} else {
		index = 0;
		toggleTransBtnText();
		console.log(transBtn.textContent);
		console.log(index);
	}
}

function removeTransItems() {}

transBtn.onclick = initTransition;
