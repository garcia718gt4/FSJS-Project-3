const name = document.getElementById('name').focus();
const otherTitle = document.getElementById('other-title').hidden = true;


// Update the “Color” field to read “Please select a T-shirt theme”.
const selectShirt = document.createElement('OPTION');   
selectShirt.value = 'theme';
selectShirt.textContent = 'Please select a T-shirt theme.';
selectShirt.selected = true;

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

/* When one of the two themes is selected, 
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
            - Activity Section -
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
    const checkbox = e.target; 

    // 3. Update and display the total activity cost
    //    First, convert the 'data-cost' value into a number data type
    const data_cost_string = checkbox.getAttribute('data-cost');
    const data_cost_number = parseInt(data_cost_string);
    
    if(checkbox.checked){
        totalCost += data_cost_number; 
    } else {
        totalCost -= data_cost_number;
    }

    pCost.textContent = `Total: $${totalCost}`;

    // 4. Disable conflicting activities
});












