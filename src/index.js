import './styles/style.scss';
import './styles/transition.scss';

const NUM_TRANSITEMS = 5;
const container = document.querySelector('.home-container');
const transBtn = document.querySelector('.trans-btn');

function initTransition() {
	console.log('init trans');
	createTransItems();
}

function createTransItems() {
	for (let index = 0; index < NUM_TRANSITEMS; index++) {
		let item = document.createElement('div');
		item.className = `item-${index + 1}`;
		console.log(item);
		container.appendChild(item);
	}
}

transBtn.onclick = initTransition;
