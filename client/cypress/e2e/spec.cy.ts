describe("Register and Login", () => {
    it("Register", () => {
        cy.visit("http://localhost:3000/auth");

        //TODO: Adicionar atributos especificos para cada input e botão.
        const nameInput = cy.get("[placeholder='Name']");
        const emailInput = cy.get("[placeholder='E-mail']");
        const passwordInput = cy.get("[placeholder='Password']");
        const confirmPasswordInput = cy.get("[placeholder='Confirm Password']");
        const submitButton = cy.get("button");

        // try to access without informing anything
        submitButton.click();
        cy.url().should("contain", "http://localhost:3000/auth");

        cy.contains("Login").click();
    });
});
