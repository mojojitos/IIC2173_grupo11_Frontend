import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div class="hero is-fullheight is-primary">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-8 is-offset-2">
            <h3 class="title has-text-white">Login</h3>
            <hr class="login-hr"></hr>
            <p class="subtitle has-text-white">Please login to see our cool stuff!</p>
            <div class="box">
            <div class="box">
                <img src="https://miro.medium.com/proxy/0*4fHRBbNhF_1jpdCM.jpeg"></img>
            </div>
            <div class="title has-text-grey is-5">Please enter your email and password.</div>
            </div>
            <form>
                <div class="field">
                    <div class="control">
                    <input class="input is-large" type="email" placeholder="Email" autofocus=""></input>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                    <input class="input is-large" type="password" placeholder="Password"></input>
                    </div>
                </div>
            </form>
            <label class="checkbox" style="margin: 20px;">
                <input type="checkbox">
                    Remember me
                </input>
            </label>
            <button class="button is-block is-danger is-large is-fullwidth">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default Login;