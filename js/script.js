const form = document.querySelector('form');  // Store a reference to the form input 

// Store a reference to the name input
const name = document.getElementById('name'); 
name.focus();

// Under the job role, store a reference to the select drop-down element 
const title = document.getElementById('title');
const titleOptions = document.querySelectorAll('#title option'); // a static list of the options 

// Store a reference to the 'other-title' input
const otherTitle = document.getElementById('other-title');
otherTitle.style.display = 'none'; // hide the element when page loads

// toggle the 'otherTitle' to show/hide when selected 
title.addEventListener('change', (e) => {
    const other = e.target.value;

    for (let i = 0; i < titleOptions.length; i++){
        if(other === 'other'){
            otherTitle.style.display = 'inline';
        } else {
            otherTitle.style.display = 'none';
        }
    }
});



/*
    - T-SHIRT SECTION -
    Goal is to filter the available "Color" options by the selected theme in the "Design" field.
    Doing this ensures that the user cannot select an invalid combination of values
    for the "Design" and "Color" fields.
*/



// Create a new option element to read “Please select a T-shirt theme”.
const selectShirt = document.createElement('OPTION');   
selectShirt.value = 'theme';
selectShirt.textContent = 'Please select a T-shirt theme.';
selectShirt.selected = true;

// Append the new option to the 'Color' field 
const color = document.getElementById('color');
const option1 = document.querySelector('option[value=cornflowerblue]'); 
color.insertBefore(selectShirt, option1);

// Hide the colors in the “Color” drop-down menu.
const colorOptions = color.querySelectorAll('#color option'); // get a reference to the node list of option
    for(let i = 0; i < colorOptions.length; i++){
        if (i != 0) {
            colorOptions[i].hidden = true; 
        }
    }
 

/*  When one of the two themes is selected, 
    only the appropriate colors should show in the “Color” drop-down menu, 
    and the “Color” field should update to the first available color. 
    Use a `change` event listener on the “Design” menu `select` element
    to listen for changes. Inside the event listener, 
    use a conditional to determine what to hide, show, and update.
*/ 

const design = document.getElementById('design');


design.addEventListener('change', (e) => { 
    const target = e.target.value; 
    const select_theme = design.firstElementChild; 

    if(target === 'js puns') {
     for(let i = 0; i < colorOptions.length; i++) {
        const text = colorOptions[i].textContent; 
        
        if (text.includes('JS Puns')) {
            colorOptions[i].hidden = false; 
            colorOptions[1].selected = true; 
            select_theme.hidden = true; 
        } else {
            colorOptions[i].hidden = true;
            select_theme.hidden = true; 
        }
    
     }

    } else if (target === 'heart js') {
        for(let i = 0; i < colorOptions.length; i++) {
           const text = colorOptions[i].textContent; 
           if (text.includes('I')) {
               colorOptions[i].hidden = false; 
               colorOptions[4].selected = true;
               select_theme.hidden = true;
           } else {
               colorOptions[i].hidden = true;
               select_theme.hidden = true;
           }
        }
     }
});


/* 
            - ACTIVITY SECTION -
    1. Create an element to display the total activity cost
    2. Listen for changes in the Activity section
       Create helpful variables to store important values
    3. Update and display the total activity cost
    4. Disable conflicting activities

*/ 

// 1. Create a DOM element to display the total cost and 
//    create the global variable to store the total activity cost 
const activity = document.querySelector('.activities');

const pCost = document.createElement('p');
activity.appendChild(pCost);
let totalCost = 0; 


// 2. Listen for changes in the Activity section
activity.addEventListener('change', (e) => {
    const clicked = e.target; 

    // 3. Update and display the total activity cost
    //    First, convert the 'data-cost' value into a number data type
    const clicked_type_string = clicked.getAttribute('data-cost');
    const clicked_type_number = parseInt(clicked_type_string);
    
    if(clicked.checked){
        totalCost += clicked_type_number; 
    } else {
        totalCost -= clicked_type_number;
    }

    pCost.textContent = `Total: $${totalCost}`;

    // 4. Disable conflicting activities
    const checkboxes = document.querySelectorAll('.activities input');
    const day_time_value = clicked.getAttribute('data-day-and-time');

    for(let i = 0; i < checkboxes.length; i++){
        const currentCBValue = checkboxes[i].getAttribute('data-day-and-time');
        
        if(day_time_value === currentCBValue && clicked !== checkboxes[i]){
            if(clicked.checked) {
                checkboxes[i].disabled = true; 
            } else {
                checkboxes[i].disabled = false; 
            }
        }
    }
    
});


/*
    - PAYMENT SECTION -
    The user should be able to change payment options at any time, 
    but shouldn’t be able to select the “Select Payment Method” option.
    Check the currently selected payment option, 
    and hide and show the payment sections in the form accordingly.
*/
// Select the type of payment divs
const credit_card = document.getElementById('credit-card');
credit_card.hidden = false;


// Store a reference to each input element used for the card information 
const cc_num = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const exp_month = document.getElementById('exp-month');
const exp_year = document.getElementById('exp-year');


const pay_pal = document.getElementById('paypal');
pay_pal.hidden = true; 
const bitcoin = document.getElementById('bitcoin');
bitcoin.hidden = true;


// Hide the “Select Payment Method” `option` so it doesn’t show up in the drop-down menu.
const payment_section = document.getElementById('payment');
const payment_options = document.querySelectorAll('#payment option'); 
payment_options[0].hidden = true; 


// Remove the first payment option value when page first loads. 
const select_payment_option = payment_options[0]; 
payment_section.removeChild(select_payment_option);


let select_credit_card = false; 
payment_section.addEventListener('change', (e) => {   
     const type_of_payment = e.target.value;

    if(type_of_payment === 'credit card') {
        select_credit_card = true; 
        credit_card.hidden = false;
        pay_pal.hidden = true; 
        bitcoin.hidden = true; 
        ccnValidator();       // Validate the credit card information 
        zipcodeValidator();         
        cvvValidator(); 
    } 
    if(type_of_payment === 'paypal') {  
        credit_card.hidden = true;
        pay_pal.hidden = false; 
        bitcoin.hidden = true; 
        select_credit_card = false; 
    }  
    
    if(type_of_payment === "bitcoin") {
        credit_card.hidden = true;
        pay_pal.hidden = true; 
        bitcoin.hidden = false;  
        select_credit_card = false;
    }

});


 

    // // A refactor approach - does not work b/c 
    // // the property 'creditcard' does not match the two-word value
    // // 'credit card' in the option
    // // i.e, A property CANNOT be two words with a space
    // const credit_card = document.getElementById('credit-card');
    // const pay_pal = document.getElementById('paypal');
    // const bitcoin = document.getElementById('bitcoin');

    // // An object with 3 properties whose values are arrow functions
    // const payments = {
    //     creditcard: () => {
    //         credit_card.hidden = false;
    //         pay_pal.hidden = true; 
    //         bitcoin.hidden = true; 
    //     },
    //     paypal: () => {  
    //         credit_card.hidden = true; 
    //         bitcoin.hidden = true; 
    //         pay_pal.hidden = false;
    //     },
    //     bitcoin: () => {
    //         credit_card.hidden = true; 
    //         pay_pal.hidden = true; 
    //         bitcoin.hidden = false;
    //     }
    // };
    
    // // run payment based on type
    // payments[type_of_payment](); 




/*
    --- FORM MESSAGES AND VALIDATION FUNCTIONS SECTION ---
    1. NAME  
    2. EMAIL 
    3. ACTIVITIES 
    4. Credit Card
        a. card number
        b. zip code
        c. security(cvv) number 
*/

// 1.   Create and append a span element when 'name' input is invalid
const name_msg = document.createElement('span');
name_msg.textContent = ' Please enter a name';
name_msg.style.color = '#cc0000';
name_msg.hidden = true;
const name_label = name.previousElementSibling;
name_label.appendChild(name_msg);

    // Helper function to validate name input 
    const nameValidator = () => {
        const name_value = name.value;

        if(name_value.length > 0){
            name.style.borderColor = 'white';
            name_msg.hidden = true; 
            return true; 
        } else {         
            name.style.borderColor = '#cc0000'; 
            name_msg.hidden = false;  
            return false; 
        }
    }




// 2.   Create and append a span element when the 'email' input is invalid
const email = document.getElementById('mail'); // store a reference to the email input
const email_msg = document.createElement('span');
email_msg.textContent = ' Please enter a valid email';
email_msg.style.color = '#cc0000';
email_msg.hidden = true;
const email_label = email.previousElementSibling;
email_label.appendChild(email_msg);

    //  Helper function to validate 'email' input 
    const emailValidator = () => {
        const email_value = email.value;

        if ( /^[^@]+@[^@.]+\.[a-z]+$/i.test(email_value) ) {
            email.style.borderColor = 'white';
            email_msg.hidden = true;
            return true;
        } else {
            email.style.borderColor = '#cc0000';
            email_msg.hidden = false;
            return false;
        }
    }

// 3.   Create and append a span element when the 'activity' input is invalid
const activity_msg = document.createElement('span');
activity_msg.textContent = ' Please select at least one activity';
activity_msg.style.color = '#cc0000';
activity_msg.hidden = true;
const activity_legend = activity.firstElementChild;
activity_legend.appendChild(activity_msg);

    // Helper function to validate the activities section 
    const activitiesValidator = () => {
        if (totalCost > 0) {
            activity_msg.hidden = true; 
            return true; 
        } else {
            activity_msg.hidden = false; 
            return false; 
        }   
    }



// 4.   VALIDATE CREDIT CARD NUMBER (if selected)

// a.   Create and append a span element when the 'card number' input is invalid
const ccn_msg = document.createElement('span');
ccn_msg.textContent = ' 13 to 16 digits required';
ccn_msg.style.color = '#cc0000';
ccn_msg.hidden = true;
const ccn_label = cc_num.previousElementSibling;
ccn_label.appendChild(ccn_msg);

    // Helper function to validate the card number input 
    /* ----- function declarations are hoisted and can be used in the above 'Payment Section' ----- */
    function ccnValidator() {
        const cc_num_value = cc_num.value; 

        if ( /^\d{13,16}$/.test(cc_num_value) ) {
            cc_num.style.borderColor = 'white';
            ccn_msg.hidden = true; 
            return true;
        } else {
            cc_num.style.borderColor = '#cc0000';
            ccn_msg.hidden = false;
            return false;
        }
    }


// b.    Create and append a span element when the 'ZIP CODE' input is invalid
const zipcode_msg = document.createElement('span');
zipcode_msg.textContent = ' Invalid';
zipcode_msg.style.color = '#cc0000';
zipcode_msg.hidden = true;
const zip_label = zip.previousElementSibling;
zip_label.appendChild(zipcode_msg);
       
    // Helper function to validate the zip code
    function zipcodeValidator() {
        const zip_value = zip.value; 
        
        if( /^\d{5}$/.test(zip_value) ) {
            zip.style.borderColor = 'white'; 
            zipcode_msg.hidden = true;
            return true;
        } else {
            zip.style.borderColor = '#cc0000';
            zipcode_msg.hidden = false; 
            return false; 
        }
    }


// c.    Create and append a span element when the 'CVV' input is invalid
const cvv_msg = document.createElement('span');
cvv_msg.textContent = ' Invalid';
cvv_msg.style.color = '#cc0000';
cvv_msg.hidden = true;
const cvv_label = cvv.previousElementSibling;
cvv_label.appendChild(cvv_msg);
       
    // Helper function to validate the CVV 
    function cvvValidator() {
        const cvv_value = cvv.value; 
        
        if( /^\d{3}$/.test(cvv_value) ) {
            cvv.style.borderColor = 'white'; 
            cvv_msg.hidden = true;
            return true;
        } else {
            cvv.style.borderColor = '#cc0000';
            cvv_msg.hidden = false; 
            return false; 
        }
    }

    

/* Real time validation */
// To add real time validation, use the .addEventListener() method on the form elements/sections
// Use events like `keyup`, `blur` and/or `mouseout`
// As the callback, use the validation functions above

name.addEventListener('blur', () => {
    nameValidator();
});
  
email.addEventListener('blur', () => {
    emailValidator();
});

activity.addEventListener('blur', () => {
    activitiesValidator();
});

cc_num.addEventListener('blur', () => {
    ccnValidator();
})

zip.addEventListener('blur', () => {
    zipcodeValidator();
})

cvv.addEventListener('blur', () => {
    cvvValidator();
})



/* Submit listener on the form element */
form.addEventListener('submit', (e) => {
    
    if(!nameValidator()) {
        e.preventDefault();
    } 
        
    if(!emailValidator()) {
        e.preventDefault();
    } 

    if(!activitiesValidator()){
        e.preventDefault();
    }
    if (select_credit_card){
        if(!ccnValidator()) {
            e.preventDefault();
        }
    }
    if(select_credit_card){ 
        if(!zipcodeValidator()){
            e.preventDefault();
        }
    }
    if(select_credit_card){
        if(!cvvValidator()){
            e.preventDefault();
        } 
    }   
}); 
