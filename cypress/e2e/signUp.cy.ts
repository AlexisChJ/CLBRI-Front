describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit("/signUp");
  });

  it("debe mostrar error si hay campos vacíos", () => {
    cy.contains("Registrarse").click();

    cy.contains("Credenciales incorrectas").should("exist");
  });

  it("debe mostrar error si hay valores inválidos", () => {
    cy.get('input[placeholder="Correo"]').type("correo-invalido");
    cy.get('input[placeholder="Contraseña"]').type("123");
    cy.get('input[placeholder="Confirmar contraseña"]').type("123");
    cy.get('input[placeholder="Nombre"]').type("###");
    cy.get('input[placeholder="Apellidos"]').type("$$$");
    cy.get('input[placeholder="Dirección"]').type("??!!");
    cy.get('input[placeholder="Ciudad"]').type("123");
    cy.get('input[placeholder="Estado"]').type("###");
    cy.get('input[placeholder="Código Postal"]').type("ABCDE");
    cy.get('input[placeholder="Teléfono"]').type("abcdefghij");
    cy.get('input[placeholder="Workplace"]').type("!!!");

    cy.contains("Registrarse").click();

    cy.contains("Credenciales incorrectas").should("exist");
  });

  it("debe redirigir al login si los campos son válidos", () => {
    cy.get('input[placeholder="Correo"]').type("test@example.com");
    cy.get('input[placeholder="Contraseña"]').type("Test1234!");
    cy.get('input[placeholder="Confirmar contraseña"]').type("Test1234!");
    cy.get('input[placeholder="Nombre"]').type("Juan");
    cy.get('input[placeholder="Apellidos"]').type("Pérez");
    cy.get('input[placeholder="Dirección"]').type("Calle Falsa 123");
    cy.get('input[placeholder="Ciudad"]').type("Ciudad");
    cy.get('input[placeholder="Estado"]').type("Estado");
    cy.get('input[placeholder="Código Postal"]').type("12345");

    cy.contains("País").click();
    cy.get('[role="option"]').contains("Mexico").click();

    cy.get('input[placeholder="Teléfono"]').type("1234567890");
    cy.get('input[placeholder="Workplace"]').type("Tec de Monterrey");
    cy.get('[data-testid="admin-switch"]').click();

    cy.contains("Registrarse").click();

    cy.url().should("include", "/login");
  });
});
