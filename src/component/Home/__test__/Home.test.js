import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home';

it("render Home without crash", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Home></Home>, div);
})