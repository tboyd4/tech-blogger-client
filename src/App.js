// css imports
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// package imports
import { BrowserRouter as Router, Route } from "react-router-dom";

// component imports
import Navbar from "./components/global-components/navbar.component";
import PostList from "./components/page-components/post-list.component";
import AddPost from "./components/page-components/add-post.component";
import EditPost from "./components/page-components/edit-post.component";
import AddAuthor from "./components/page-components/add-author.component";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <br></br>
      <div id="wrap">
        <div id="main" className="container clear-top">
          <Route path="/" exact component={PostList} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/add/post" component={AddPost} />
          <Route path="/add/author" component={AddAuthor} />
        </div>
      </div>
    </Router>
  );
}

export default App;
