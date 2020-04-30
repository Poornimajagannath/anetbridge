// the capture context that was requested server-side for this transaction
var captureContext = '............................';

// custom styles that will be applied to each field we create using Microform
var myStyles = {  
  'input': {    
    'font-size': '14px',    
    'font-family': 'helvetica, tahoma, calibri, sans-serif',    
    'color': '#555'  
  },  
  ':focus': { 'color': 'blue' },  
  ':disabled': { 'cursor': 'not-allowed' },  
  'valid': { 'color': '#3c763d' },  
  'invalid': { 'color': '#a94442' }
};

// setup
var flex = new Flex(captureContext);
var microform = flex.microform({ styles: myStyles });
var number = microform.createField('number', { placeholder: 'Enter card number' });
var securityCode = microform.createField('securityCode', { placeholder: '•••' });

number.load('#number-container');
securityCode.load('#securityCode-container');

var form = document.querySelector('#my-form')
var payButton = form.querySelector('button');
var errorsOutput = document.querySelector('#errors-output');

payButton.addEventListener('click', function() {  
  var options = {    
    expirationMonth: document.querySelector('#expirationMonth').value,    
    expirationYear: document.querySelector('#expirationYear').value  
  };

  microform.createToken(options, function (err, token) {
    if (err) {
      // handle error
      console.error(err);
      errorsOutput.textContent = err.message;
    } else {
      // At this point you may pass the token back to your server as you wish.
      // In this example we append a hidden input to the form and submit it.      
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'transientToken');
      hiddenInput.setAttribute('value', token);
      form.appendChild(hiddenInput);
      form.submit();
    }
  });
});