describe("Search", () => {
    it("when page is just opened", () => {
        cy.visit('/');
        cy.get('main nav + div').should('contain.text', '10 movies found');
        cy.get('form input').type('71');
        cy.get('button').contains('Search').click();
        cy.url().should('match', /\/search\/71$/m);

        cy.get('main article h1').contains("'71").click();
        cy.get('header p').should('contain.text', "A young British soldier must find");

    });
});