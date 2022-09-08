context("user loggers", () => {
  it("user process", () => {
    cy.register("Ashley", "Ash", "hibana987@gmail.com", "q3t53y35hhw3");

    cy.contains("Welcome to your DashBoard");

    cy.get("[aria-label=logoutButton]").click();

    cy.contains("Welcome! Please Login!");

    cy.login("hibana987@gmail.com", "q3t53y35hhw3");
    cy.location("pathname").should("eq", "/DashBoard");
  });
});
