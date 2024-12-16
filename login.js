const login = document.getElementById("login-page");
login.innerHTML = `

<div class="div-left">
<img src = "/images/movie.png" />
<p>Welcome to our login page! </p>
<p>Please enter your username and password to login!</p>
</div>
<div class="div-right">
<label>USERNAME:</label>
<input type = "text" id="username" placeholder = "username"</>
<label>PASSWORD:</label>
<input type = "password" id="password" placeholder = "password"/>
<button><a href = "index.html">LOGIN</a></button>
<p>You don't have an account?</p>
<p>Please enter our SIGN UP page:</p>
<button id="signup"><a href = "signup.html">SIGN UP</a></button>
</div>

`;