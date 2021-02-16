describe("Dashboard screen", () => {
  it("Lands on dashboard after logging in", () => {
    cy.visit("/");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
  it("has all of the elements", () => {
    cy.get("#current-album-container");
    cy.get("#album-cover");
    cy.get("#listen-spotify-button");
    cy.get("#current-album-info");
    cy.get("#write-review-button");
  });
  it("Clicking spotify listen button navigates to a spotify url", () => {
    cy.get("#listen-spotify-button").click();
    cy.url().should("include", "open.spotify.com/album");
  });
});
