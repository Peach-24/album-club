describe("Login page on load", () => {
  it("has all of the elements", () => {
    cy.visit("http://localhost:3000");
    cy.get(".password-login-container");
    cy.get(".password-login-box");
    cy.get("#login-logo");
    cy.get("#password-login");
    cy.get("#login-button");
    cy.get("#error-msg-text");
  });
  it("Can enter a password", () => {
    cy.visit("http://localhost:3000");
    cy.get("#password-login")
      .type("sheffhampton")
      .should("have.value", "sheffhampton");
  });
  it("Clicking button with incorrect password shows the error message", () => {
    cy.visit("http://localhost:3000");
    cy.get("#password-login").type("wrongpassword");
    cy.get("#login-button").click();
    cy.get("#error-msg-text").contains("wrong password...");
  });
  it("Clicking button with correct password navigates to a new url", () => {
    cy.visit("http://localhost:3000");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
});
