'use strict'

const btnSubmit = document.getElementById('btn-submit')
const email_error_slot = document.getElementById('email-error-msg-slot')

btnSubmit.addEventListener('click', HandleSubmit)

function HandleSubmit(e) {
 e.preventDefault()

 const form = document.getElementById('form')

 form.classList.add('submitting')

 const result = Submit(form)
 if (result) {
  form.classList.add('invalid')
  form.classList.remove('submitting')
  return 1
 }

 if (form.classList.contains('invalid')) form.classList.remove('invalid')
}

function Submit(form) {
 const formData = new FormData(form)
 let request_body = {
  username: '',
  last_name: '',
  email: '',
  query_type: '',
  message: '',
 }

 // Validate Consent
 const consent = formData.get('consent')
 if (!consent) return 1

 // Validate Email
 const email = formData.get('email')
 if (!email) return 1

 // Validate Query Type
 const query_type = document.querySelector('input[type="radio"]:checked')
 if (!query_type) return 1

 // Validate Required Fields
 const entries = formData.entries()
 for (const iterator of entries) {
  if (!iterator[1]) break;
  if (iterator[0] !== 'query_type') request_body[iterator[0]] = iterator[1]
  else request_body.query_type = query_type.id
 }

 // Submit
 fetch("https://formsubmit.co/ajax/adrydevmateo@gmail.com", {
  method: "POST",
  headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json'
  },
  body: JSON.stringify(request_body)
 })
  .then(response => response.json())
  .then(data => {
   if (data.success) Notify('success', 'Thanks for completing the form. We\'ll be in touch soon!')
   else Notify('error', 'Sorry, we couldn\'t receive your message, please try again!')
  })
  .catch(error => {
   Notify('error', 'Sorry, we are currently facing problems please try again later!')
   throw new Error(error)
  })
  .finally(() => {
   form.classList.remove('submitting')
   form.reset()
  });
 return 0
}

function Notify(type, msg) {
 let animationDuration = 2
 const notificationWrapper = document.createElement('div')
 notificationWrapper.id = 'notification-wrapper'

 let title = 'Message Sent!'
 let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>`

 if (type === 'error') {
  animationDuration = 3
  notificationWrapper.id = 'notification-wrapper-error'
  title = 'Error'
  icon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path fill="currentColor" d="M9 10.555L10.555 9L23 21.444L21.444 23z"/><path fill="currentColor" d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14a13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12.035 12.035 0 0 1-12 12"/></svg>`
 }

 const notification = `
 <div class="row-1">
   ${icon}
   <strong>${title}</strong>
  </div>
  <p>${msg}</p>
 `

 notificationWrapper.innerHTML = notification
 document.body.appendChild(notificationWrapper)


 notificationWrapper.style.animationDuration = `${animationDuration}s`

 setTimeout(() => {
  notificationWrapper.style.animationName = 'slideOutNotification'
  notificationWrapper.style.animationDuration = `${animationDuration * 2}s`

  setTimeout(() => document.body.removeChild(notificationWrapper), animationDuration * 1000);
 }, animationDuration * 2000);
}