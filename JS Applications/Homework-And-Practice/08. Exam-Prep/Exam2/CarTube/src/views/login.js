import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js'

const loginTemplate = (formChecker) => html`
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post" @submit=${formChecker}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(loginForm));

    async function loginForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');

        if (username == '' || password == '') return window.alert('All fields must be filled!');

        await login(username, password);
        ctx.page.redirect('/all-listings');
        ctx.navView();
    }
}