import React from 'react';
import * as Redux from 'react-redux';

import * as actions from '../actions/actions';

class AppLogin extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			showEmail: false,
			registerEmail: false
		};
	}

	render() {

		var loginOptionsJSX =
							<div className="row small-centered">
							<div className="columns">
								<button className="button" style={{width:"175px"}}
									onClick={() => this.props.dispatch(actions.startLogin('GOOGLE'))}>Login with Google</button>
								<button className="button" style={{width:"175px"}}
									onClick={() => this.props.dispatch(actions.startLogin('GITHUB'))}>Login with Github</button>
								<button className="button" style={{width:"175px"}}
									onClick={() => this.setState({showEmail: true, registerEmail: false})}>Login with Email</button>
								<button className="button" style={{width:"175px"}}
									onClick={() => this.setState({showEmail: true, registerEmail: true})}>Register with Email</button>
							</div>
							</div>;
		if (this.props.auth.status === actions.AUTH_WORKING) {
			loginOptionsJSX = <div className="row small-centered">Working...</div>
		}
		if (this.state.showEmail && this.state.registerEmail) {
			var emailJSX =
						<div className="row">
							<div className="columns small-centered small-12 callout callout-auth">
								<form onSubmit={(e) => {
									e.preventDefault();
									var email = this.refs.email.value;
									var password = this.refs.password.value;
									var verifyPassword = this.refs.verifyPassword.value;
									if (email === '' || password === '' || verifyPassword === '') {
										this.refs.email.focus();
										alert ('Must fill in all input fields');
									}
									if (password !== verifyPassword) {
										this.refs.password.value = '';
										this.refs.verifyPassword.value = '';
										this.refs.password.focus();
										alert(`Passwords don't match`);
									}
									console.log('REG email/password', email, password);
									var res = this.props.dispatch(actions.startEmailRegistration(email, password));
								}}>
									<label>Email Address
									<input
										type="text"
										ref="email"
										/>
									</label>
									<label>Password
									<input
										type="password"
										ref="password"
										/>
									</label>
									<label>Verify Password
									<input
										type="password"
										ref="verifyPassword"
										/>
									</label>
									<button type="submit" className="button">Register</button>
								</form>
							</div>
						</div>;
		} else {
						var emailJSX =
						<div className="row">
							<div className="columns small-centered small-12 callout callout-auth">
								<form onSubmit={(e) => {
									e.preventDefault();
									var email = this.refs.email.value;
									var password = this.refs.password.value;
									var res = this.props.dispatch(actions.startLogin('EMAIL', email, password));
								}}>
									<label>Email Address
									<input
										type="text"
										ref="email"
										/>
									</label>
									<label>Password
									<input
										type="password"
										ref="password"
										/>
									</label>
									<button type="submit" className="button">Login</button>
								</form>
							</div>
						</div>;
		}
		var onAuthErrorJSX = <div>{this.props.auth.errorMessage}</div>
		return (
			<div>
				<div className="row">
					<div className="columns small-centered small-10 medium-6" >
						<div className="callout callout-auth">
							<h3>Login</h3>
								{this.props.auth.status === actions.AUTH_ERROR ? onAuthErrorJSX : null}
								{loginOptionsJSX}

						</div>

						{this.state.showEmail ? emailJSX : null}

					</div>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
};

export default Redux.connect(mapStateToProps)(AppLogin);
