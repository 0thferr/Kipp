// tests/e2e/camera.spec.js
describe('Sistema de câmeras', () => {
  beforeEach(() => {
    cy.intercept('**/*.m3u8*', { statusCode: 404, body: '' }).as('playlist')
  })

  it('mostra a grade, solicita o stream e abre os detalhes da câmera', () => {
    cy.visit('/')
    cy.get('.camera-grid').should('be.visible')
    cy.get('.camera-grid video').should('exist')
    cy.wait('@playlist')
    cy.contains('a', 'Abrir câmera').click()
    cy.location('pathname').should('eq', '/camera/1')
    cy.get('.single-camera').contains('Câmera 1').should('be.visible')
    cy.get('.single-camera video').should('exist')
    cy.contains('a', 'Voltar às câmeras').click()
    cy.get('.camera-grid').should('be.visible')
  })

  it('informa quando a câmera não existe', () => {
    cy.visit('/camera/inexistente')
    cy.contains('Câmera não encontrada.').should('be.visible')
    cy.get('video').should('not.exist')
  })
})
