describe("Dashboard screen", () => {
  it("displays login screen if user hasn't entered password", () => {
    cy.visit("/home");
    cy.get(".password-login-container");
    cy.get(".password-login-box");
    cy.get("#login-logo");
    cy.get("#password-login");
    cy.get("#login-button");
    cy.get("#error-msg-text");
  });
  it("Lands on dashboard after logging in", () => {
    cy.visit("/");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/home");
  });
  it("has all of the elements", () => {
    cy.get("nav");
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
