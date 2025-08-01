export default function Login() {

    return (
        <div className="card">
            <div className="login-card-header">
                <h2>Log in to Get Started</h2>
                <p>Let DJ Joubi manage your wedding music so you can kick back, eat, and dance.</p>
            </div>
            <div className="login-button-container">
            <a className="login" href="https://dj-joubi-d0bdbvdta9hycrc5.eastus2-01.azurewebsites.net/api/login">
                Log in to Spotify
            </a>
            </div>
        </div>
    );
}