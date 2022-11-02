document.querySelector('[api="account"]').addEventListener('mousedown', getAccount);
document.querySelector('[api="notification"]').addEventListener('mousedown', getNotification)
document.querySelector('[api="security"]').addEventListener('mousedown', getSecurity)


function getAccount() {
    fetch('settings_content/account.html')
    .then(function(res){
        // Get new Promise
        return res.text();
    }) 
    // Get promise data
    .then((element) => {
        document.querySelector('[api="settings"]').innerHTML = element;
    })

    // Get error
    .catch((err) => console.log(err))
}

function getNotification() {
    fetch('settings_content/notification.html')
    .then(function(res){
        // Get new Promise
        return res.text();
    }) 
    // Get promise data
    .then((element) => {
        document.querySelector('[api="settings"]').innerHTML = element;
    })

    // Get error
    .catch((err) => console.log(err))
}

function getSecurity() {
    fetch('settings_content/security.html')
    .then(function(res){
        // Get new Promise
        return res.text();
    }) 
    // Get promise data
    .then((element) => {
        document.querySelector('[api="settings"]').innerHTML = element;
    })

    // Get error
    .catch((err) => console.log(err))
}