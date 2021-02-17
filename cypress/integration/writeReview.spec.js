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
    cy.get("#write-review-heading");
    cy.get("#review-score");
    cy.get("button").contains("Post review");
  });
  it("Can enter text in the review form", () => {
    cy.get("#your-review-name")
      .type("test name")
      .should("have.value", "test name");
    cy.get("#your-review-body")
      .type("test review")
      .should("have.value", "test review");
    cy.get("#review-score")
      .type("t")
      .should("have.value", "")
      .type("6")
      .should("have.value", "6");
  });
});
