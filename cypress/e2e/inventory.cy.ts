describe('Inventario', () => {
  beforeEach(() => {
    cy.visit('/inventario'); 
  });

  it('Carga correctamente los componentes principales', () => {
    cy.contains('Inventario');
    cy.get('input[placeholder="Buscar"]').should('exist');
    cy.contains('+').should('exist');
  });

  it('Abre el popup de Agregar Producto', () => {
    cy.contains('+').click();
    cy.contains('Agregar Producto').should('be.visible');
  });

  it('Permite escribir en los campos del formulario de nuevo producto', () => {
    cy.contains('+').click();

    cy.get('input[placeholder="Nombre del producto"]').type('Manzanas');

    cy.get('select').eq(0).select('Perecederos');
    cy.get('select').eq(1).select('Alta');

    cy.contains('Fecha de llegada');
    cy.contains('Fecha de caducidad');

    cy.get('button').contains('Guardar').should('exist');
  });

  it('Muestra los datos de la tabla', () => {
    cy.get('table').should('exist');
  });
});
