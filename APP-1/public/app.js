$(document).ready(function() {

    // While still in SSO session
    document.body.style.display = 'none';

    // Embeddable login form
    var lock = new Auth0Lock(
        'UyRz3tEqPfUuf3j487JT43mEnoK6tgys',
        'whoisnitin.auth0.com'
    );

    // Client side
    var auth0 = new Auth0({
        domain: 'whoisnitin.auth0.com',
        clientID: 'UyRz3tEqPfUuf3j487JT43mEnoK6tgys',
        callbackOnLocationHash: true
    });

    // Listens for authentication event
    lock.on("authenticated", function(authResult){
        isAuthCallback = true;

        lock.getProfile(authResult.idToken, function(err, profile){
            if (err) {
                return;
            }

            localStorage.setItem('userToken', authResult.idToken);
            goToHomepage(authResult.state, authResult.idToken);
            return;
        });
    });

    var isAuthCallback = false;

    // Check if user is already logged in and token is present in localstorage
    var idToken = localStorage.getItem('userToken');
    if (idToken) {
        goToHomepage(getQueryParameter('targetUrl'), idToken);
        return;
    } else {
        // Check for SSO session if user is not logged in
        auth0.getSSOData(function(err, data) {
            if (!isAuthCallback && !err && data.sso) {
                auth0.signin({
                    connection: data.lastUsedConnection.name,
                    scope: 'openid name picture',
                    params: {
                        state: getQueryParameter('targetUrl')
                    }
                });
            } else {
                // Show the normal login button
                document.body.style.display = 'inline';
            }
        });
    }

    // Event handler
    $('.btn-login').click(function(e) {
        e.preventDefault();
        lock.show({
            flashMessage: {
                type: 'success',
                text: 'successfully logged in!'
            }
        });
    });

    // Redirect function
    function goToHomepage(state, token) {
        document.body.style.display = 'inline';
        $('.login-box').hide();
        $('.logged-in-box').show();
        var profile = jwt_decode(token);
        $('.name').text(profile.name);
        if (state) {
            $('.url').show();
            $('.url span').text(state);
        }
    }

    // Get the the targetUrl from the query
    function getQueryParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});