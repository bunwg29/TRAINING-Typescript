import './styles/index.scss';
import * as views from './views/index';


const root = document.getElementById('app');
if (root) {
	root.appendChild(new views.Header().render())
}
