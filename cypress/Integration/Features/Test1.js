
describe('Green Cart Test Suit', function(){

    it('1. Place the First Raw order', function()
{
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca');
    cy.get('.product:visible').should('have.length', 4);
    //Parent child chaining to reduce the scope of the filteration 
    cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click().should('have.text','✔ ADDED');
    
    

    //Lets add the Item dynamically rather than adding it by index value
    cy.get('.products').find('.product').each(($el, index,$list) => {

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
})