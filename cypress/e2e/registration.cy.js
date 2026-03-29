/// <reference types='cypress' />

describe('Student Registration page', () => {
  before(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  const hobbies = [
    'hobbies-checkbox-1',
    'hobbies-checkbox-2',
    'hobbies-checkbox-3'
  ];

  it('should fill the form', () => {
    cy.get('#firstName').type('Name');
    cy.get('#lastName').type('LastName');
    cy.get('#userEmail').type('Name@example.com');
    cy.get('[for="gender-radio-1"]').click();
    cy.get('#userNumber').type('1234567890');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('May');
    cy.get('.react-datepicker__year-select').select('1995');
    cy.get('.react-datepicker__day--015').click();
    cy.get('#subjectsInput').type('Maths{enter}');
    hobbies.forEach((hobby) => {
      cy.get(`[for="${hobby}"]`).click();
    });
    cy.get('#currentAddress').type('Ukraine, Kyiv, Khreshchatyk 1');
    cy.get('#state').click();
    cy.contains('NCR').click();
    cy.get('#city').click();
    cy.get('#submit').click();

    cy.get('.modal-content').should('be.visible');
    cy.get('.table-responsive').within(() => {
      cy.contains('td', 'Student Name')
        .next().should('have.text', 'Name LastName');
      cy.contains('td', 'Student Email')
        .next().should('have.text', 'Name@example.com');
      cy.contains('td', 'Gender').next().should('have.text', 'Male');
      cy.contains('td', 'Mobile').next().should('have.text', '1234567890');
      cy.contains('td', 'Date of Birth')
        .next().should('have.text', '15 May,1995');
      cy.contains('td', 'Subjects').next().should('have.text', 'Maths');
      cy.contains('td', 'Address')
        .next().should('have.text', 'Ukraine, Kyiv, Khreshchatyk 1');
      cy.contains('td', 'State and City')
        .next().should('have.text', 'NCR Delhi');
    });
    cy.get('#closeLargeModal').click();
  });
});
