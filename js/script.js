const name = document.getElementById('name').focus();
const otherTitle = document.getElementById('other-title').hidden = true;

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
const colorOptions = color.querySelectorAll('#color option'); 
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

    if(target === 'js puns') {
     for(let i = 0; i < colorOptions.length; i++) {
        const text = colorOptions[i].textContent; 
        if (text.includes('JS Puns')) {
            colorOptions[i].hidden = false; 
            colorOptions[1].selected = true; 
        } else {
            colorOptions[i].hidden = true;
        }
    
     }

    } else if (target === 'heart js') {
        for(let i = 0; i < colorOptions.length; i++) {
           const text = colorOptions[i].textContent; 
           if (text.includes('I')) {
               colorOptions[i].hidden = false; 
               colorOptions[4].selected = true;
           } else {
               colorOptions[i].hidden = true;
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

// Hide the “Select Payment Method” `option` so it doesn’t show up in the drop-down menu.
const payment_section = document.getElementById('payment');
const payment_options = document.querySelectorAll('#payment option'); 
payment_options[0].hidden = true; 

payment_section.addEventListener('change', (e) => {   
    const type_of_payment = e.target.value;

    const credit_card = document.getElementById('credit-card');
    const pay_pal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');

    for (let i = 0; i < payment_options.length; i++) {
        // Get the value of the payment select element, and if it’s equal to ‘credit card’, 
        // set the credit card payment section in the form to show, and set the other two options to hide.
        if(type_of_payment === 'credit card') {
            credit_card.hidden = false;
            pay_pal.hidden = true; 
            bitcoin.hidden = true; 
        } else if(type_of_payment === 'paypal') {
            credit_card.hidden = true;
            pay_pal.hidden = false; 
            bitcoin.hidden = true; 
        } else if(type_of_payment === 'bitcoin') {
            credit_card.hidden = true;
            pay_pal.hidden = true; 
            bitcoin.hidden = false; 
        }
        
    }


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


});


/*
    - FORM VALIDATION AND VALIDATION MESSAGES SECTION -
  
*/







