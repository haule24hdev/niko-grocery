import { createBrowserHistory } from "history";

const AppHistory = createBrowserHistory();
// history.listen((location, action) => {
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state);
// });

export default AppHistory;
