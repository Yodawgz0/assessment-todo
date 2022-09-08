Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/Login");
  cy.get("[aria-label=LoginButton]").should("have.text", "Log In");
  cy.get("[name=Email]").type(email);
  cy.get("[name=Password]").type(password);
  cy.get("[aria-label=LoginButton]")
    .click()
    .should(() => {
      expect(localStorage.getItem("sessionkey")).to.exist;
    });
});

Cypress.Commands.add("register", (Name, username, email, password) => {
  cy.visit("http://localhost:3000/Registration");
  cy.get("[name=Email]").type(email);
  cy.get("[name=Name]").type(Name);
  cy.get("[name=Username]").type(username);
  cy.get("[name=Password]").type(password);
  cy.get("[aria-label=RegisterButton]").contains("Register").click();
});
