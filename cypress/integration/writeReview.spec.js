describe("Write review screen", () => {
  it("Lands on home screen after logging in", () => {
    cy.visit("/");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
  it("has a button for writing a review, which loads the review component", () => {
    cy.get("button").contains("Write a review").click();
    cy.get("#write-review-container");
    cy.get("textarea");
    cy.get("button").contains("Post review");
  });
});
