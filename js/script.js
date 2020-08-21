const name = document.getElementById('name').focus();
const otherTitle = document.getElementById('other-title').hidden = true;


// Update the “Color” field to read “Please select a T-shirt theme”.
const selectShirt = document.createElement('OPTION');   
selectShirt.value = 'theme';
selectShirt.textContent = 'Please select a T-shirt theme.';
selectShirt.setAttribute('selected', true);

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
    
});



















// const target = e.target.value; 
// if(target === 'js puns'){
//     if(option.includes('JS Puns')){
//         for(let i = 4; i < colorOptions.length; i++){
//             colorOptions[i].hidden = false;
//             colorOptions[i].hidden = true;             
//         }
//         colorOptions[1].setAttribute('selected', true);
//     }
    

// }  else if (target === 'heart js') {

//      if(option.includes('I')){
        
//         for(let j = 1; j < 4; j++){
//             colorOptions[i].hidden = false; 
//             colorOptions[j].hidden = true;              
//         }
//             colorOptions[4].setAttribute('selected', true);
//         }
//     }