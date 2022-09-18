# A Test App Using Passport-Local with Express

I created this project to learn how to use passport, specifically the local strategy, to add basic authentication to an Express application. I purposely made the project as minimal as possible to focus on learning how passport works. The bcrypt library is used for encryption.

## Details

* Contains four pages: index, register, login, and protected.
* The index page is the home page for the project and has links to the other pages.
* The register page has a form allowing you to create an account.
* The login page allows you to authenticate.
* The protected page is blocked by default unless you're authenticated. You are automatically redirected to this page once you log in and it displays the name you registered with your account.
* User information is stored in memory and will be cleared every time the app restarts.