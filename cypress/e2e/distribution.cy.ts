describe("Distribución", () => {
  beforeEach(() => {
    cy.visit("/distribucionUsuarios");
  });

  it("debe mostrar el título 'Distribución'", () => {
    cy.contains("Distribución").should("be.visible");
  });

  it("debe abrir y cerrar el popup de distribución manual", () => {
    cy.contains("Manual").click();

    cy.contains("¿Estás seguro de que deseas confirmar la distribución manual?")
      .should("be.visible");

    cy.contains("Cancelar").click();

    cy.contains("¿Estás seguro de que deseas confirmar la distribución manual?")
      .should("not.exist");
  });
});
