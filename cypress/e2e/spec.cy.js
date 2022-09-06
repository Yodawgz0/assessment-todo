describe("user loggers", () => {
  it("user process", () => {
    cy.visit("http://localhost:3000/LogIn");
    cy.login("hibana987@gmail.com", "q3t53y35hhw3");
    cy.location("pathname").should("eq", "/DashBoard");
  });
});
