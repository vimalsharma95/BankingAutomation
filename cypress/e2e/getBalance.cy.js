describe('Testing withdraw API', () => {
  
  
    it('TC_001_Check_Balance_For_Valid_User', () => {
      cy.fixture('getBalance').then(function (userData) {
        this.userData = userData;
      cy.request({
        method: 'GET',
        url: '/api/get_balance',
        qs: this.userData.userData1}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        expect(response.body).to.have.property('balance');
      });
    });
  });

  it('TC_002_Check_Balance_For_Invalid_User', () => {
    cy.fixture('getBalance').then(function (userData) {
        this.userData = userData;
      cy.request({
        method: 'GET',
        url: '/api/get_balance',
        qs: this.userData.userData2,
        failOnStatusCode: false,}).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.eq('User not found');
    });
  });
});

it('TC_003_Check_Balance_Without_QueryPaameter', () => {
    cy.fixture('getBalance').then(function (userData) {
        this.userData = userData;
      cy.request({
        method: 'GET',
        url: '/api/get_balance',
        qs: this.userData.userData3,
        failOnStatusCode: false,}).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.eq('User not found');
    });
  });
});

it('TC_004_Validate_Check_Balance_API_Response_Time', () => {
    cy.fixture('getBalance').then(function (userData) {
      this.userData = userData;
    cy.request({
      method: 'GET',
      url: '/api/get_balance',
      qs: this.userData.userData1}).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(2000);
    });
  });
});


});