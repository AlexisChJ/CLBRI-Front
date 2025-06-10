describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Carga correctamente la página', () => {
    cy.contains('Dashboard'); 
  });

  it('Muestra sección de Alimento Neto', () => {
    cy.contains('Alimento Neto').should('exist');
  });

  it('Muestra tabla de menor pérdida por usuario', () => {
    cy.contains('Menor Pérdida por Usuario').should('exist');
    cy.get('table').should('have.length.at.least', 1);
  });

  it('Muestra tabla de distribución reciente', () => {
    cy.contains('Distribución Reciente').should('exist');
  });
});
