import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import * as Actions from './Actions/actions';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import { FormPoint } from './Components/Form-Point';
import { Logo } from './Components/Logo';
import { Map } from './Components/Map';

import { USERS, getPoint } from './Data/users';

class App extends Component {
	constructor(props) {
		super(props);
		this.users = USERS;
	}

	login = (evt) => {
		evt.preventDefault();
		const formData = evt.target;
		const {auth, loggedInUser} = this.confirmCredentials(formData.username.value, formData.password.value);

		if(auth) {
			const a = Actions.login(loggedInUser);
			this.props.store.dispatch(a);
			const homePointInfo = getPoint(loggedInUser.homePoint);
			console.log('got homePoint:', homePointInfo);
			this.props.store.getState().map.flyTo({
				center: homePointInfo.center,
				speed: 1.5,
				zoom: 10
			});
		} else {
			alert('Failed Login');
		}
	}

	confirmCredentials = (username, password) => {
		const foundUser = this.users.find(u => u.username === username && u.password === password);
		return {
			auth: foundUser ? true : false,
			loggedInUser: foundUser
		};
	}

	logout = () => {
		const a = Actions.logout();
		this.props.store.dispatch(a);
		this.props.store.getState().map.flyTo({
			center: [0, 0],
			speed: 1.5,
			zoom: 2
		});
	}

	setMap = (mapObj) => {
		const a = Actions.setMap(mapObj);
		this.props.store.dispatch(a);
	}

	render() {
		return (
			<Router>
				<div className="App">
					{
						this.props.store.getState().loggedIn ?
						<section>
							<nav>
								<NavLink exact to="/" activeClassName="link-active">
									<i className="fa fa-home" aria-hidden="true"></i>
								</NavLink>
								<NavLink to="/account" activeClassName="link-active">
									<i className="fa fa-user" aria-hidden="true"></i>
								</NavLink>
								<NavLink to="/add" activeClassName="link-active">
									<i className="fa fa-plus" aria-hidden="true"></i>
								</NavLink>
							</nav>
							<div className="side-body">
								<Route exact path="/" component={Welcome} />
								<Route path="/account" component={Account} />
								<Route path="/add" component={FormPoint} />
							</div>
							<footer>
								<div>M3H</div>
								<i className="fa fa-sign-out" aria-hidden="true" onClick={this.logout}></i>
							</footer>
						</section>
						:
						<Login login={this.login}/>
					}
					<Map loggedIn={this.props.store.getState().loggedIn} setMap={this.setMap} mapboxAccessToken={this.props.store.getState().mapboxAccessToken} />
				</div>
			</Router>
		);
	}
}

const Account = () => {
	return (
		<div>Manage your account preferences...</div>
	);
}

const Login = ({login}) => {
	return (
		<div className="login-wrapper">
			<Logo width={150} />
			<form onSubmit={e => login(e)}>
				<div className="input-wrapper">
					<input type="text" name="username" placeholder="Username" autoFocus />
					<i className="fa fa-user-o" aria-hidden="true"></i>
				</div>
				<div className="input-wrapper">
					<input type="password" name="password" placeholder="Password" />
					<i className="fa fa-key" aria-hidden="true"></i>
				</div>
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}

const Welcome = () => {
	return (
		<div>
			<h1 className="App-title">Welcome to Mappy!</h1>
			<h4>Mappy makes me happy &#8482;</h4>
			Next Steps...
			<ul>
				<li>Sidebar router animations</li>
				<li>Mongo or PostGres for storing points?  all should show on launch, also show on add</li> 
				<li>Fix flow?</li>
				<li>on root, if not logged in, redir to /login, show form, hide nav and footer, gray out map</li>
				<li>Redux installed, but is really ugly- find better way to subscribe (connect() doesn't seem to be doing the trick!)</li>
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => (Object.assign({}, state));

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
