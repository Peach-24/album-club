describe("Navigation bars", () => {
  it("Lands on dashboard after logging in", () => {
    cy.visit("/");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
  it("has all of the elements", () => {
    cy.get("nav");
    cy.get(".navbar");
    cy.get(".nav-item");
  });
});
