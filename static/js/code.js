/*-------------------------
  # Offline Status
-------------------------*/
// window.onload = () => {
//   if(window.navigator.onLine === false) confirm("You're Currently Offline");
// }


/*------------------------------------
  # Header active status
------------------------------------*/
const navLinks = document.querySelectorAll('nav .nav-link');
if(navLinks)
navLinks.forEach((navLink, index, all) => {

  navLink.addEventListener('click', (e) => {
      if(e){
          let i = 0;
          while(i < all.length){
              if(all[i].classList.contains('active')){
                  all[i].classList.remove('active');
              }
              i++;
          }
          navLink.classList.toggle('active');
      }
  })
});



/*------------------------------------
  # News Letter Validation
------------------------------------*/
const validateEmail = document.querySelector('[validate="subscribe-event"]')

if(validateEmail)
validateEmail.addEventListener('click',  (e) => {
  e.preventDefault()

  const NewsLetterEmail = document.querySelector('[validate="email"]')
  const toast = document.querySelector('.social-links .toast');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  
  if(NewsLetterEmail)
  if(!re.test(NewsLetterEmail.value)){

      toast.querySelector('.toast-header strong').className = 'me-auto text-danger';
      toast.querySelector('.toast-header strong').innerHTML = 'Error';
      toast.querySelector('.toast-body').innerHTML = 'Invalid Email Address';
      toggleToast()
      
    NewsLetterEmail.focus()
  } else{

      toast.querySelector('.toast-header strong').className = 'me-auto text-success';
      toast.querySelector('.toast-header strong').innerHTML = 'Success';
      toast.querySelector('.toast-body').innerHTML = 'Hurray! you have sucessfully subscribed to our Newsletter';
      setTimeout(() => {
        NewsLetterEmail.value = null;
      }, 1000)
      toggleToast()
  }
  
  function toggleToast() {
    toast.className = 'toast show';

    setTimeout(() => {
      toast.className = 'toast hide';
    }, 3000)
  }

});

/* -----------------------------
    -----------------------------
        -----------------------------
            -----------------------------
            # Dashboard Screens           >
            -----------------------------
        -----------------------------
    -----------------------------
----------------------------- */


/*------------------------------------
  # Header active status
------------------------------------*/
const navProfile = document.querySelector('nav#logged_in .profile_content')
if(navProfile)
navProfile.addEventListener('mousedown',  (e) => {
  if(e.target === navProfile) {
    fetch('settings.html')
    .then(res => res.text())
    .then(element => {
      document.querySelector('main').outerHTML = element;
    })

    // Get error
    .catch((err) => console.log(err))
  }
  
  
})
/*-----------------------------------
  # QUICKBUY >   >   >   >   >   >  >
-------------------------------------
  # Redirect to Wishlist
------------------------------------*/

const directToWishList = document.querySelector('[selection="direct-to-wishlist"]')

if(directToWishList)
directToWishList.onclick = () => {
   // Fetch the contents
   fetch('quickbuy_contents/wishlist.html')
   .then(function(res){
       // Get new Promise
       return res.text();
     }) 
   // Get promise data
   .then((element) => {
       document.querySelector('main').innerHTML = element;
     })
   // Get error
   .catch((err) => console.log(err))
}

/*----------------------------------
  # QUICKBUY >   >   >   >   >   >  >
------------------------------------
<   <   <   <   <   <   <   <   <   <
------------------------------------
  # Add To Wishlist
------------------------------------*/


document.querySelectorAll('.bundle_container .bundle')
.forEach(bundle => {
  
  bundle.addEventListener('click', (e) => {
    let addFavBtn = e.target.classList.contains('bi-heart');
    let rmFavBtn = e.target.classList.contains('bi-heart-fill');

    if(addFavBtn){
      e.target.classList = 'bi bi-heart-fill'
      alert('Bundle added to wishlist')
    }
    if(rmFavBtn){
      e.target.classList = 'bi bi-heart'
      alert('Bundle removed from wishlist')
    }


  })
})


/*-----------------------------------
  # QUICKBUY >   >   >   >   >   >  >
-------------------------------------
  # Redirect to Payment Methods
------------------------------------*/

const redirect_bundles = document.querySelectorAll('main .bundle_row .bundle')
redirect_bundles.forEach(redirectbundle => {

redirectbundle.addEventListener('click', (e) => {
  e.preventDefault();

  if(e.target.hasAttribute('buy')) {
    // Fetch the contents
    fetch('quickbuy_contents/payment.html')
    .then(function(res){
        // Get new Promise
        return res.text();
      }) 
    // Get promise data
    .then((element) => {
        document.querySelector('main').innerHTML = element;
      })
    // Get error
    .catch((err) => console.log(err))
  }
  
  
  });
})


/*------------------------------------
  # Countdown Timer Function
------------------------------------*/
const countDown = () => {

  const quizBtn = document.querySelector('button[quiz-time]')
  if(quizBtn)
  quizBtn.onclick = (e) =>{
    e.preventDefault();
  
    if(e.target.hasAttribute('quiz-time')){
      document.querySelector('#quiz_section .start-modal').style.display = 'none';
  
      
      var time_up = false;
      var defaultTime = 2; // Set time for quiz. To change time, change defaultTime value
      var minutes = defaultTime;
      var seconds = 60;
      var Quiztime = minutes + ':' + seconds;
  
      setInterval(() =>{
        while(!time_up){
  
          seconds--;
          Quiztime = minutes + ':' + seconds;
          document.querySelector('#quiz_section .timer').textContent = Quiztime; 
  
          if(seconds === 1){
            
            if(true) defaultTime--, minutes = defaultTime, seconds = 60;
            Quiztime = minutes + ':' + seconds;
            // break;
          }
          if(time_up = true && defaultTime < 0){
            if(true) Quiztime = 0 +':'+ 0 + 0;
            document.querySelector('#quiz_section .timer').innerHTML = Quiztime;
            document.querySelector('#quiz_section .modal.end-quiz').classList.toggle('active');
          }
          break;
        }
  
      }, 1000);
    }
  }
}
countDown();




/*------------------------------------
  # Truncate Function
------------------------------------*/
let TruncateFunction = () =>{

  let description = document.querySelector('.description .details [truncate-words]');
  let limit = 600;
  let details;

  
  if(description){
    details = description.innerHTML;
  
  if(description.innerHTML.length > limit){
    let truncated = details.slice(0, limit);
    let hiddenText = details.substring(limit);
  
    description.innerHTML = `${truncated} <span class="hidden_text active">${hiddenText}</span> <small class="truncate">read more...</small>`;
  
    let trun = document.querySelector('.description small.truncate');
    trun.addEventListener('click', (e) => {
      if(e.target === trun){
        document.querySelector('.description .hidden_text').classList.toggle('active');
       if(document.querySelector('.description .hidden_text').classList.contains('active')){
        trun.textContent = 'read more..'
       } else{
         trun.textContent = 'read less...'
       }
      }
      
    });
  }
  }
}
TruncateFunction()



/*----------------------------------
  # Quiz >   >   >   >   >   >  >   >
------------------------------------
<   <   <   <   <   <   <   <   <   <
------------------------------------
  # Quiz Function (Active State)
------------------------------------*/
let quizFunction = () => {
  var btnSpan = document.querySelectorAll('#quiz_section .answer div')
  const btns = document.querySelectorAll('#quiz_section .answer')
  // Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(e) {
  
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      
    });
  }
  
}
quizFunction()


/*------------------------------------
  # Quiz >   >   >   >   >   >    >  
--------------------------------------
  # Profile Picture Selection
-------------------------------------*/
const profileBtn = document.querySelector('[selection="profile-picture"]')

if(profileBtn)
profileBtn.addEventListener('mousedown', () => {
  
  window.showOpenFilePicker()
  .then((res) => res[0].getFile() )
  .then((data) => {
    var reader = new FileReader()
    reader.addEventListener("load", (e) => {
      // document.querySelector("[profile-picture]").src = e.target.result;
      document.querySelectorAll("[profile-picture]").forEach(profileImage => {
        profileImage.src = e.target.result;
      })
      
    })
    reader.readAsDataURL(data)
  
  })
  .catch(err => console.log(err) )
  
});

/*---------------------------------
    # Setting Active Status
-----------------------------------*/
const settings = document.querySelectorAll('#settings_bar .setting');
settings.forEach((setting, index, all) => {
    setting.addEventListener('mousedown', (e) => {
        if(e){
            let i = 0;
            while(i < all.length){
                if(all[i].classList.contains('active')){
                    all[i].classList.remove('active');
                }
                i++;
            }
            setting.classList.toggle('active');
        }
    })
});





/* -----------------------------
    -----------------------------
        -----------------------------
            -----------------------------
            # Authentication Screens      >
            -----------------------------
        -----------------------------
    -----------------------------
----------------------------- */

// * Input Validation
const allInputs = document.querySelectorAll('form input[validate]');
const form = document.querySelector('form#form');


if(form)
form.onsubmit = function (e) {
  e.preventDefault();


  const pass1 = document.querySelector('form #lock');
  const pass2 = document.querySelector('form .lock-two');
  // Alert Message
  const alertMsg = document.createElement('div');
  alertMsg.className += "alert";
  alertMsg.style.display = 'none';
  alertMsg.setAttribute('error-message', null)

  let form = document.querySelector('#form .form')
  const div = form.querySelector('#inp-div');
  form.insertBefore(alertMsg, div);


  let isError = false

  let trackIndex = 0;
  while(trackIndex < allInputs.length){
    let input = allInputs[trackIndex];

    // Validation Code
    // *null state
    if(input.value ==="" || input.value === null){
      isError = true;
        errorMsg = null;
        
      if(input.value === null || input.value === '') {
        isError = true
        errorMsg = "Inputs are empty"
        input.focus()
        
      }
      if (isError && errorMsg != null && errorMsg != "") {
        showAlert(`${errorMsg}`,'alert-danger');
        setTimeout(hideAlert, 3000)
        input.focus()
        
      }

      break;
    } else if(isError = true){
      // *password confirmation

      if(pass1.value !== pass2.value){
        errorMsg = "Please check password"
        showAlert(`${errorMsg}`, ' alert-danger');
        setTimeout(hideAlert, 3000)

        input.focus()
      }

    } else{
      // *Successful
      isError = false;
      errorMsg = "Form submitted successfully";
      showAlert(`${errorMsg}`, 'alert-success');
      setTimeout(hideAlert, 3000)

      input.value = '';
    }
    
    trackIndex++;
  }
}

function showAlert(errorMessage, type) {
  document.querySelector('#form .alert[error-message]').style.display = 'block';
  document.querySelector('#form .alert[error-message]').textContent = errorMessage
  document.querySelector('#form .alert[error-message]').className = `alert ${type}`;


}

function hideAlert() {
  document.querySelector('.alert').style.display = 'none';
}


/* --------------------------------
  # Password Hide And Show fn
--------------------------------- */ 
if(form)
form.onclick = function(e) {
  let show = e.target.classList.contains('bi-eye-slash');
  let hide = e.target.classList.contains('bi-eye');

  if(show) {
    e.target.classList = 'bi bi-eye';
    e.target.parentElement.previousElementSibling.setAttribute('type', 'text')
  }
  if(hide) {
    e.target.classList = 'bi bi-eye-slash';
    e.target.parentElement.previousElementSibling.setAttribute('type', 'password')
  }
}