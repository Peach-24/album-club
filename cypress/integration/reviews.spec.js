describe("Reviews screen", () => {
  it("displays login screen if user hasn't entered password", () => {
    cy.visit("/reviews");
    cy.get(".password-login-container");
    cy.get(".password-login-box");
    cy.get("#login-logo");
    cy.get("#password-login");
    cy.get("#login-button");
    cy.get("#error-msg-text");
  });
  it("Lands on reviews after logging in", () => {
    cy.visit("/reviews");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/reviews");
  });
  it("has all of the core elements", () => {
    cy.get("nav");
    cy.get("#reviews-container");
    cy.get("#reviews-box");
    cy.get("#reviews-list");
    cy.get("#reviews-list-item");
    cy.get("#header-text").contains("Previous albums");
  });
  it("navigates to the single review page when an album cover is clicked", () => {
    cy.get("#reviews-list-item").click();
    cy.get("#header-text").contains("Previous albums").should("not.exist");
  });
});

/* 
Has certain number of li in ol
cy.get('.left-nav>.nav').children().should('have.length', 8)
*/
