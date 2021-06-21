import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App/Layout/App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./App/Layout/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
