describe("Write review screen", () => {
  it("Lands on home screen after logging in", () => {
    cy.visit("/");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
  it("has a button for writing a review, which loads the review component", () => {
    cy.get("#write-review-button").click();
    cy.get("#write-review-container");
    cy.get("textarea");
    cy.get("select");
    cy.get("#write-review-heading");
    cy.get("#review-score");
    cy.get("button").contains("Post review");
  });
  it("Can enter text in the review form", () => {
    cy.get("#your-review-body")
      .type("test review")
      .should("have.value", "test review");
    cy.get("#review-score")
      .type("t")
      .should("have.value", "")
      .type("6")
      .should("have.value", "6");
  });
  it("Can select one of seven options for YOUR NAME dropdown", () => {
    cy.get("select")
      .select("Will")
      .should("have.value", "Will")
      .select("Lewis")
      .should("have.value", "Lewis")
      .select("Kieran")
      .should("have.value", "Kieran");
  });
  it("shows an error message if a name isn't chosen + post review is clicked ", () => {
    cy.get("select").select("Your name");
    cy.get("#post-review-button").click();
    cy.get("#post-message").contains("All fields must be filled in.");
  });
  it("shows an error message if a review body is empty  + post review is clicked ", () => {
    cy.get("select").select("Kieran");
    cy.get("#your-review-body").clear();
    cy.get("#post-review-button").click();
    cy.get("#post-message").contains("All fields must be filled in.");
  });
  it("shows an error message if a review body is empty  + post review is clicked ", () => {
    cy.get("select").select("Lewis");
    cy.get("#your-review-body").clear();
    cy.get("#post-review-button").type("test review");
    cy.get("#review-score").clear();
    cy.get("#post-message").contains("All fields must be filled in.");
  });
});
