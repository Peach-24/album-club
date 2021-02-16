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
  it("(Laptop screen) - Has top navbar with links to correct endpoints", () => {
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.get("li").contains("Home").should("have.attr", "href", "/home");
    cy.get("li").contains("Suggest").should("have.attr", "href", "/suggest");
    cy.get("li").contains("Schedule").should("have.attr", "href", "/schedule");
  });
  it("(Laptop screen) - Navigates to appropriate endpoints when clicking on top nav", () => {
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.get("li").contains("Schedule").click();
    cy.url().should("include", "/schedule");
    cy.get("li").contains("Home").click();
    cy.url().should("include", "/home");
    cy.get("li").contains("Suggest").click();
    cy.url().should("include", "/suggest");
  });
  it("(Mobile screen) - Has bottom tab navigator with links to correct endpoints", () => {
    cy.viewport("iphone-6");
    cy.wait(200);
    cy.get("nav").contains("Home").should("have.attr", "href", "/home");
    cy.get("nav").contains("Suggest").should("have.attr", "href", "/suggest");
    cy.get("nav").contains("Schedule").should("have.attr", "href", "/schedule");
  });
  it("(Mobile screen) - tab navigator links take user to correct endpoints", () => {
    cy.viewport("iphone-6");
    cy.wait(200);
    cy.get("a").contains("Home").click();
    cy.url().should("include", "/home");
    cy.get("a").contains("Schedule").click();
    cy.url().should("include", "/schedule");
    cy.get("a").contains("Suggest").click();
    cy.url().should("include", "/suggest");
  });
});
