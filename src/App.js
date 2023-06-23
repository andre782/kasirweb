import React, { Component } from 'react'
import "./App.scss"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { NavbarComponent } from './component';

import Home from './pages/Home';
import Sukses from './pages/Sukses';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent/>
        <main>
          <Routes>
            <Route path="/" Component={Home} exact/>
            <Route path="/sukses" Component={Sukses} exact/>
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}





