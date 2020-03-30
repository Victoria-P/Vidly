import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import "./App.scss";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
