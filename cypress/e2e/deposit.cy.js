describe('Testing deposit API', () => {
  
  
    it('TC_001_Deposit_Amount_For_valid_UserID', () => {
      cy.fixture('deposit').then(function (userData) {
        this.userData = userData;
      cy.request('POST','/api/deposit',this.userData.userData1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).contains('Deposited');
      });
    });
  });

  it('TC_002_Deposit_Amount_For_Invalid_UserID', () => {
    cy.fixture('deposit').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/deposit',
        body: this.userData.userData2, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).contains('User not found');
    });
  });
});

it('TC_003_Deposit_Zero_Amount_For_valid_User', () => {
    cy.fixture('deposit').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/deposit',
        body: this.userData.userData3, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq('Invalid amount');
    });
  });
});

it('TC_004_Deposit_Amount_In_Decimal_Value', () => {
    cy.fixture('deposit').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/deposit',
        body: this.userData.userData4, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.message).contains('Deposited');
    });
  });
});

it('TC_005_Deposit_Amount_In_Negative_Value', () => {
    cy.fixture('deposit').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/deposit',
        body: this.userData.userData5, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).contains('Invalid amount');
    });
  });
});

//Validating response time of deposit API, adding assertion for response time to be less than 2000ms
it('TC_006_Validate_Deposit_API_Response_Time', () => {
  cy.fixture('deposit').then(function (userData) {
    this.userData = userData;
  cy.request('POST','/api/deposit',this.userData.userData1).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).contains('Deposited');
    expect(response.duration).to.be.lessThan(2000);
  });
});
});

});