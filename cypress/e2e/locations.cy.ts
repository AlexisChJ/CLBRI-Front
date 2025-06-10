describe('Locaciones', () => {
  beforeEach(() => {
    cy.visit('/usuariosLocaciones');
  });

  it('should render buttons and modals correctly', () => {
    cy.contains('Agregar Usuario').should('exist');

    cy.contains('Generar Token').should('exist');

    cy.contains('Agregar Usuario').click();

    cy.get('select').should('exist');

    cy.contains('Agregar').should('exist');
    cy.get('body').type('{esc}'); 
  });
});
