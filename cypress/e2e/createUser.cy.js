describe('Testing create_user API', () => {
  
    it('TC_001_Create_User_with_valid_data', () => {
      cy.fixture('createUser').then(function (userData) {
        this.userData = userData;
        cy.request({
          method: 'POST',
          url: '/api/createUser',
          body: this.userData.userData1,  
        }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.success).to.be.true;
        expect(response.body.message).to.equal('User created successfully');
        expect(response.body).to.have.property('id');
      });
    });
  });

  it('TC_002_Create_Second_User_with_valid_data', () => {
    cy.fixture('createUser').then(function (userData) {
      this.userData = userData;
      cy.request({
        method: 'POST',
        url: '/api/createUser',
        body: this.userData.userData2,  
      }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal('User created successfully');
      expect(response.body).to.have.property('id');
    });
  });
});

  it('TC_003_Create_User_with_Missing_Argument', function () {
    cy.fixture('createUser').then(function (userData) {
      this.userData = userData;
    cy.request({
      method: 'POST',
      url: '/api/createUser',
      body: this.userData.userData3, 
      failOnStatusCode: false, 
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).contains("Missing required arguments");
      });
    });
  });

  it('TC_004_Create_User_with_Empty_Payload', function () {
    cy.fixture('createUser').then(function (userData) {
      this.userData = userData;
    cy.request({
      method: 'POST',
      url: '/api/createUser',
      body: this.userData.userData4, 
      failOnStatusCode: false, 
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.be.false;
        expect(response.body.message).to.equal('Phone number must be equal to 10 characters');
      });
    });
  });

  // This is the non functonal test case, in this we are validating the response time of the API
  it('TC_005_Validating_Create_User_API_Response_Time', function () {
    cy.fixture('createUser').then(function (userData) {
      this.userData = userData;
    cy.request({
      method: 'POST',
      url: '/api/createUser',
      body: this.userData.userData5, 
      failOnStatusCode: false, 
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.success).to.be.true;
        expect(response.duration).to.be.lessThan(2000);
      });
    });
  });

    
  });
  