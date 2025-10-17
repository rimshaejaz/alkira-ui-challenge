 
describe("Login + MFA + Signup Flow", () => {

    beforeEach(() => {
      cy.visit("/login"); 
    });
  
    // Test case 1: Invalid email & incorrect password
    it("should handle invalid email and incorrect password", () => {
      // Invalid email
      cy.get('#email').type("wrong.email@gmail.com");
      cy.get('#password').type("12345678");
      cy.get('button[type="submit"]').click();
      cy.contains("The email is not in system").should("be.visible");
  
      // Clear inputs before testing incorrect password
      cy.get('#email').clear().type("user.1@gmail.com");
      cy.get('#password').clear().type("wrongpass");
      cy.get('button[type="submit"]').click();
      cy.contains("Incorrect password entered").should("be.visible");
    });
  
    // Test case 2: Successful login → MFA → dashboard
    it("should log in successfully and redirect to MFA then dashboard", () => {
      cy.get('#email').type("user.1@gmail.com");
      cy.get('#password').type("12345678");
      cy.get('button[type="submit"]').click();
  
      // MFA page
      cy.contains("Redirecting to MFA").should("be.visible");
      cy.url().should("include", "/otp");
  
      // Enter OTP
      cy.get('#otp').type("123456");
      cy.get('button[type="submit"]').click();
  
      // Dashboard
      cy.url().should("include", "/dashboard");
      cy.contains("Success! Login was verified for").should("be.visible");
    });
  
    // Test case 3: Incorrect + Correct Signup flow
    it("should navigate to signup page and register a new user", () => {
      cy.get('a[href="/signup"]').click(); 
      cy.url().should("include", "/signup");
  
      cy.get('#email').type("new.user@gmail.com");
      cy.get('#password').type("newpassword123");
      cy.get('#confirm-password').type("newpassword123");
      cy.get('[role="combobox"]').click();
      cy.get('[role="listbox"]').contains('Read').click();        
      cy.get('button[type="submit"]').click();
  
      cy.contains("Please meet all password requirements.").should("be.visible");

      cy.get('#password').clear().type("Happy@101");
      cy.get('#confirm-password').clear().type("Happy@101");
      cy.get('button[type="submit"]').click();
      cy.get('[role="combobox"]').click();
      cy.get('[role="listbox"]').contains('Read').click(); 
      

      // redirect to login 
      cy.contains("Sign up successful! Redirecting to log in.").should("be.visible");
      cy.url().should("include", "/login");

      // login flow
      cy.get('#email').type("new.user@gmail.com");
      cy.get('#password').type("Happy@101");
      cy.get('button[type="submit"]').click();
  
      // MFA page
      cy.contains("Redirecting to MFA").should("be.visible");
      cy.url().should("include", "/otp");
  
      // Enter OTP
      cy.get('#otp').type("123456");
      cy.get('button[type="submit"]').click();
  
      // Dashboard
      cy.url().should("include", "/dashboard");
      cy.contains("Success! Login was verified for").should("be.visible");
    });
  
  });
  
  