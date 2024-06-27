describe('Testing withdraw API', () => {
  
  
    it('TC_001_Validate_Withdraw_For_Valid_Amount', () => {
      cy.fixture('withdraw').then(function (userData) {
        this.userData = userData;
      cy.request('POST','/api/withdraw',this.userData.userData1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.eq('Withdrawn '+this.userData.userData1.amount+" successfully");
      });
    });
  });

  it('TC_002_Validate_Withdraw_For_Decimal_Value', () => {
    cy.fixture('withdraw').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/withdraw',
        body: this.userData.userData2, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.eq('Withdrawn '+this.userData.userData2.amount+" successfully");
    });
  });
});

it('TC_003_Validate_Witdraw_Zero_Amount', () => {
    cy.fixture('withdraw').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/withdraw',
        body: this.userData.userData3, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq('Invalid request');
    });
  });
});

it('TC_004_Validate_Withdraw_For_Negative_Value', () => {
    cy.fixture('withdraw').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/withdraw',
        body: this.userData.userData4, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq('Insufficient balance or invalid amount');
    });
  });
});

it('TC_005_Validating_Empty_Withdraw_Payload', () => {
    cy.fixture('withdraw').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/withdraw',
        body: this.userData.userData5, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).contains('Invalid request');
    });
  });
});

it('TC_006_Validating_Withdraw_API_Response_Time', () => {
  cy.fixture('withdraw').then(function (userData) {
    this.userData = userData;
    cy.request({
      method: 'POST',
      url: '/api/withdraw',
      body: this.userData.userData4, 
      failOnStatusCode: false, 
      }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.duration).to.be.lessThan(2000);
});
});
});

});