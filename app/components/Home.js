"use strict";
var React = require('react');
var react_1 = require('react');
var react_router_1 = require('react-router');
const styles = require('./Home.module.css');
class Home extends react_1.Component {
    render() {
        var test = 10;
        return (React.createElement("div", null, React.createElement("div", {className: styles.container}, React.createElement("h2", null, "Home"), React.createElement(react_router_1.Link, {to: "/counter"}, "to Counter"))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
