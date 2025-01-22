// tests/e2e/camera.spec.js
describe('Camera System', () => {
    it('should load camera grid', () => {
      cy.visit('/')
      cy.get('.camera-grid').should('be.visible')
    })
  })