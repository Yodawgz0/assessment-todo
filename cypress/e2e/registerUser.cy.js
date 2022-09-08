context("user loggers", () => {
  it("user process", () => {
    cy.intercept("POST", "*", { times: 1 }).as("post");

    cy.register("Ashley", "Ash", "hibana987@gmail.com", "q3t53y35hhw3");

    cy.contains("Welcome to your DashBoard").then(() => {
      cy.request({
        url: "https://api-nodejs-todolist.herokuapp.com/user/me",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("sessionkey"),
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });

    cy.get("[aria-label=logoutButton]").click();

    cy.contains("Welcome! Please Login!");

    cy.location("pathname").should("eq", "/LogIn");
  });
});
