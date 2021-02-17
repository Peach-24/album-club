describe("singleAlbum screen", () => {
  it("Lands on reviews screen after logging in", () => {
    cy.visit("/reviews");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/reviews");
  });
  it("navigates to the single review page when an album cover is clicked", () => {
    cy.get("#reviews-list-item").click();
    cy.get("#header-text").contains("Previous albums").should("not.exist");
  });
  it("has all of the elements", () => {
    cy.get("nav");
    cy.get("#album-average-score");
    cy.get("#album-reviews-container");
    cy.get("#album-reviews-box");
    cy.get("#album-reviews-list");
    cy.get("#album-reviews-list-item");
    cy.get("#album-review-body");
    cy.get("#album-review-author");
    cy.get("#album-review-score");
  });
});
