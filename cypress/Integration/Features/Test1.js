
describe('Green Cart Test Suit', function(){

    it('1. Place the First Raw order', function()
 {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca');
    cy.get('.products').as('ProductLocator');
    cy.get('.product:visible').should('have.length', 4);
    //Parent child chaining to reduce the scope of the filteration 
    cy.get('@ProductLocator').find('.product').eq(2).contains('ADD TO CART').click().should('have.text','✔ ADDED');
    
    

    //Lets add the Item dynamically rather than adding it by index value
    cy.get('@ProductLocator').find('.product').each(($el, index,$list) => {

        const producttext = $el.find('h4.product-name').text();
        if(producttext.includes('Cashews'))
        {
            cy.wrap($el).find('button').click();
        }

    })
    /*Explainantion: This each loop iterator will itrate through out the Products list and dynamically clcik on the Cashwe item. 
    coz if the index of the item changes after adding more products in future you cannot rely on the 
    index size 2 at that point of time.
    hence clciking it by unique identifier taht is the name of teh item.
    Also while just searching with button tag it elemeinates the scope of the 
    filter so basically it will directly clcik on the button in that pertiucular item. and not the entiore page object buttons*/


    //Clciking on the Cart image icon to chekck the items added are dispalyed in the list
    cy.get('img[alt="Cart"]').click();

    //cy.get('.cart-item:visible').should('have.length',1).contains('Capsicum'); -- this was written intially just to chekc the added item in the list

    /*Lets check cart items dynamically */

    cy.get('.cart-item:visible').should('have.length', 2)
    .then((cartItems)=> {
        const ItemArray = ['Capsicum','Cashews'];
        ItemArray.forEach((item, index) =>
        {
           cy.wrap(cartItems).eq(index).contains(item);
        })
    })

    cy.get('button').contains('PROCEED TO CHECKOUT').click();
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/cart');
    cy.get('button').contains('Place Order').click();
    cy.wait(3000);
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/country');
    
    cy.get('select').select('India').should('have.value','India');
    cy.get('input[type="checkbox"]').check();
    cy.get('button').contains('Proceed').click();
    cy.get('.wrapperTwo').should('be.visible'); 
    cy.get('.wrapperTwo').invoke('text').then((text) => {
        const cleanText = text.replace(/\s+/g,' ').trim();
        expect(cleanText).to.eq('Thank you, your order has been placed successfully You\'ll be redirected to Home page shortly!!');
    })
})

     it("To verify the Website Name", function(){

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#');
        cy.get('.brand.greenLogo').then(function(logoElement){
            
            //This statment is printed in console of Cypress Test runner
            cy.log("This is the Name of the Website : "+logoElement.text());
        })

        //This is an assert statement for checking the Text is displayed correct ort not
        cy.get('.brand.greenLogo').should('have.text','GREENKART');
         
        //This stament is printed in console of JS
        console.log("I am a javascript Logger statement");
     })

     it("To verify check boxes functionality in manual way", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('#checkBoxOption1').check().should('be.checked');
        cy.get('#checkBoxOption2').check().should('be.checked');
        cy.get('#checkBoxOption3').check().should('be.checked');

        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
        cy.get('#checkBoxOption2').uncheck().should('not.be.checked');
        cy.get('#checkBoxOption3').uncheck().should('not.be.checked');


     })

     it("To verify check boxes functionality in Looping way", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('input[type="checkbox"]').each(($el) => {
            cy.wrap($el).check().should('be.checked'); 
        })
        cy.log("I Checked the all Checked boxes");

        cy.get('input[type="checkbox"]').each(($el) => {

            cy.wrap($el).uncheck().should('not.be.checked');    
        })
        cy.log("I UnChecked the all Checked boxes");

     })

       it("To verify Dynamic check boxes click from drop down list", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('#autocomplete').type('ind')
        
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
          if( $el.text() === 'India')
          {
             $el.click();
          }
        })
        cy.get('#autocomplete').should('have.value','India');

     })

     it("To verify dynamic check boxes random clicks from dropdown list", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    
        // Type 'ind' to bring up the dropdown options
        cy.get('#autocomplete').type('ind');
    
        // Ensure the dropdown options are visible
        cy.get('.ui-menu-item div', { timeout: 10000 }).should('be.visible');
    
        // Get the dropdown options and iterate through them
        cy.get('.ui-menu-item div').then($items => {
            const itemsArray = [...$items]; // Convert jQuery object to array
    
            // Iterate through the array of options
            itemsArray.forEach((_, index) => {
                // Re-query the dropdown options to ensure we have fresh references
                cy.get('.ui-menu-item div').eq(index).then($el => {
                    const optionValue = $el.text(); // Get the text from the element
                    
                    // Log the option value for debugging
                    cy.log(optionValue);
    
                    // Check if the element exists and is visible before clicking
                    cy.wrap($el)
                        .should('exist')
                        .should('be.visible')
                        .click({ force: true }) // Click on the element
                        .then(() => {
                            // Verify the input field has the correct value after clicking
                            cy.get('#autocomplete').should('have.value', optionValue);
                        });
    
                    // Clear the input field and retype 'ind' for the next option (if any)
                    if (index < itemsArray.length - 1) {
                        cy.get('#autocomplete').clear().type('ind');
    
                        // Wait for the dropdown to refresh
                        cy.get('.ui-menu-item div', { timeout: 10000 }).should('be.visible'); // Ensure new options are visible
                    }
                })
            })
        })

    })
        it("To verify hide and show button on the webpage", function(){

            cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

            cy.get('#displayed-text').should('be.visible');
            cy.get('#hide-textbox').click();
            cy.get('#displayed-text').should('not.be.visible');
            cy.get('#show-textbox').click();
            cy.get('#displayed-text').should('be.visible');
         })

        it("To verify User able to clcik on radio buttons", function(){

            cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

            cy.get('.radioButton[value= "radio1"]').should('be.visible');
            cy.get('.radioButton[value= "radio1"]').click();
            cy.get('.radioButton[value= "radio1"]').should('be.checked');
            cy.get('.radioButton[value= "radio2"]').should('not.be.checked');
            cy.get('.radioButton[value= "radio3"]').should('not.be.checked');
            cy.get('.radioButton[value= "radio2"]').click();
            cy.get('.radioButton[value= "radio2"]').should('be.checked');
            cy.get('.radioButton[value= "radio1"]').should('not.be.checked');
            cy.get('.radioButton[value= "radio3"]').should('not.be.checked');
            cy.get('.radioButton[value= "radio3"]').click();
            cy.get('.radioButton[value= "radio3"]').should('be.checked');
            cy.get('.radioButton[value= "radio1"]').should('not.be.checked');
            cy.get('.radioButton[value= "radio2"]').should('not.be.checked');
     })

    it("To verify alert button on web page", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('#alertbtn').click();

        //Assertions to check the text on alert popup

        cy.on('window:alert',(str) =>{

            expect(str).to.eq('Hello , share this practice page and share your knowledge');
        })

    })  
    
    it("To verify Confirmation popup with accept functionality", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#confirmbtn').click();

        //Assertions to check the text on alert popup
        cy.on('window:confirm',(str) =>
             {
                
                expect(str).to.eq('Hello , Are you sure you want to confirm?');
                return true;
             })
    })

    it("To verify Confirmation popup with cancel functionality", function(){

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#confirmbtn').click();

        //Assertions to check the text on alert popup
        cy.on('window:confirm',(message) =>
            {
              return false;
             })
       cy.wait(1000);
       cy.log("I clicked on cancel button");
       cy.break;
    })
})
