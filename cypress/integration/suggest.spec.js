describe("Suggest screen", () => {
  it("displays login screen if user hasn't entered password", () => {
    cy.visit("/home");
    cy.get(".password-login-container");
    cy.get(".password-login-box");
    cy.get("#login-logo");
    cy.get("#password-login");
    cy.get("#login-button");
    cy.get("#error-msg-text");
  });
  it("Lands on suggest after logging in from /suggest endpoint", () => {
    cy.visit("/suggest");
    cy.get("#password-login").type("sheffhampton");
    cy.get("#login-button").click();
    cy.url().should("include", "/suggest");
  });
  it("has all of the elements", () => {
    cy.get("nav");
    cy.get("#suggest-container");
    cy.get("#submit-album-form");
    cy.get(".suggest-input");
    cy.get("#suggest-submit-button");
    cy.get("#errorMsg");
  });
  it("can type in the input fields", () => {
    cy.get("#artist-field")
      .type("Kanye West")
      .should("have.value", "Kanye West");
    cy.get("#album-field")
      .type("808s & Heartbreak")
      .should("have.value", "808s & Heartbreak");
    cy.get("#spotify-link-field")
      .type(
        "https://open.spotify.com/album/3WFTGIO6E3Xh4paEOBY9OU?si=67khku-wSNanpyjt55DQUw"
      )
      .should(
        "have.value",
        "https://open.spotify.com/album/3WFTGIO6E3Xh4paEOBY9OU?si=67khku-wSNanpyjt55DQUw"
      );
    cy.get("#author-field").type("Josh").should("have.value", "Josh");
  });
  it("shows an error message if a field is empty + submit is clicked ", () => {
    cy.get("#spotify-link-field").clear();
    cy.get("#suggest-submit-button").click();
    cy.get("#errorMsg").contains("All fields must be filled in.");
  });
  it("shows an success message if all fields are filled in + submit is clicked ", () => {
    cy.get("#spotify-link-field").type(
      "https://open.spotify.com/album/3WFTGIO6E3Xh4paEOBY9OU?si=67khku-wSNanpyjt55DQUw"
    );
    cy.get("#suggest-submit-button").click();
    cy.get("#errorMsg").contains("Success!");
  });
});
