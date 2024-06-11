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
}