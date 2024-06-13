const form = document.getElementById('form')
const btnSubmit = document.getElementById('btn-submit')
const email_error_slot = document.getElementById('email-error-msg-slot')

btnSubmit.addEventListener('click', Submit)

function Submit(e) {
 e.preventDefault()

 form.classList.add('submitting')

 const formData = new FormData(form)

 // Validate Consent
 const consent = formData.get('consent')
 if (!consent) return 1

 // Validate Email
 const email = formData.get('email')
 if (!email) return 1

 // Validate Required Fields
 const entries = formData.entries()
 for (const iterator of entries) {
  if (!iterator[1]) break;

  // const element = document.getElementById(iterator[0])
  // console.log('Element: ', element.parentElement);

 }

 // Submit
 form.classList.remove('submitting')

 // Notify

 const notificationWrapper = document.createElement('div')
 notificationWrapper.id = 'notification-wrapper'

 const notification = `
 <div class="row-1">
   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
    <path fill="currentColor"
     d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
   </svg>
   <strong>Message Sent!</strong>
  </div>
  <p>Thanks for completing the form. We'll be in touch soon!</p>
 `

 notificationWrapper.innerHTML = notification
 document.body.appendChild(notificationWrapper)

 const animationDuration = 2
 notificationWrapper.style.animationDuration = `${animationDuration}s`

 setTimeout(() => {
  notificationWrapper.style.animationName = 'slideOutNotification'
  notificationWrapper.style.animationDuration = `${animationDuration * 2}s`

  setTimeout(() => document.body.removeChild(notificationWrapper), animationDuration * 1000);
 }, animationDuration * 2000);
}