
describe('New Window Functionalities', function () {

    it('1. Visit the New Doamin Website', function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#opentab").invoke('removeAttr', 'target').click();

        cy.origin("https://www.qaclickacademy.com/", () => {
            cy.get('#navbarSupportedContent a[href="about.html"]').click();
            cy.get('.mt-50 h2').should('have.text', 'Welcome to QAClick Academy ');
        })

    })

    it('', function(){

    })


    it('', function(){
        
    })

    it('', function(){
        
    })




})
