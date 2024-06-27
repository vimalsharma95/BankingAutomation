describe('Testing Send API', () => {
  
  
    it('TC_001_Validate_Send_For_Valid_User', () => {
      cy.fixture('send').then(function (userData) {
        this.userData = userData;
      cy.request('POST','/api/send',this.userData.userData1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.contains('Sent '+this.userData.userData1.amount);
      });
    });
  });

  it('TC_002_Validate_Send_For_Invalid_Recipient', () => {
    cy.fixture('send').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/send',
        body: this.userData.userData2, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq("Recipient not found");
    });
  });
});

it('TC_003_Validate_Send_For_Invalid_Sender', () => {
    cy.fixture('send').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/send',
        body: this.userData.userData3, 
        failOnStatusCode: false,
        }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq('Sender not found');
    });
  });
});

it('TC_004_Validate_Send_For_Amount_Greater_Than_Balance', () => {
    cy.fixture('send').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/send',
        body: this.userData.userData4, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).to.eq('Insufficient balance or invalid amount');
    });
  });
});

it('TC_005_Validating_Send_For_Negative_Value', () => {
    cy.fixture('send').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/send',
        body: this.userData.userData5, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.success).to.be.false;
      expect(response.body.message).contains('Insufficient balance or invalid amount');
    });
  });
});


it('TC_006_Validating_Send_API_Response_Time', () => {
    cy.fixture('send').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/send',
        body: this.userData.userData5, 
        failOnStatusCode: false, 
        }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.duration).to.be.lessThan(2000);
    });
  });
});

});