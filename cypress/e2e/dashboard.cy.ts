describe('SearchBar', () => {
  it('escribe texto en la barra de búsqueda', () => {
    cy.visit('/dashboard'); // Asegúrate de que esta es la ruta correcta

    cy.get('[data-cy="search-bar"]')
      .should('be.visible')
      .type('Ana García')
      .should('have.value', 'Ana García');
  });
});
