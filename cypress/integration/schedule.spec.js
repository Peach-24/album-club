describe("Schedule screen", () => {
  it("displays login screen if user hasn't entered password", () => {
    cy.visit("/schedule");
    cy.get(".password-login-container");
    cy.get(".password-login-box");
    cy.get("#login-logo");
    cy.get("#password-login");
    cy.get("#login-button");
    cy.get("#error-msg-text");
  });
  it("Lands on schedule after logging in", () => {
    cy.visit("/schedule");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/schedule");
  });
  it("has all of the elements", () => {
    cy.get("nav");
    cy.get("#schedule-container");
    cy.get("#schedule-box");
    cy.get("#schedule-list");
    cy.get("#schedule-list-item");
  });
});
