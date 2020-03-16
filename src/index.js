import './styles/style.scss';
import './styles/transition.scss';

const NUM_TRANSITEMS = 5;

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
	for (let index = 0; index < NUM_TRANSITEMS; index++) {
		let item = document.createElement('div');
		item.className = `item-${index + 1}`;
		console.log(item);
		container.appendChild(item);
	}
}

function removeTransItems() {}

transBtn.onclick = initTransition;
