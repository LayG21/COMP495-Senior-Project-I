const bcrypt = require('bcrypt');
const { loginController } = require('../controllers/authController');

jest.mock('../models/Student', () => ({
  findOne: jest.fn(),
}));

jest.mock('../models/Advisor', () => ({
  findOne: jest.fn(),
}));

describe('loginController', () => {
  const req = {
    body: {
      userType: 'STUDENT', // or 'advisor'
      userEmail: 'lwade@aggies.ncat.edu',
      userPassword: 'password',
    },
    session: {},
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    redirect: jest.fn(),
  };

  it('should handle student login', async () => {
    // Implement your own logic to mock the Student model's behavior
    const Student = require('../models/Student');
    Student.findOne.mockResolvedValue({
      studentID: 950505789,
      studentFirstName: 'Lisa',
      studentLastName: 'Wade',
      studentPassword: await bcrypt.hash('password', 10), // Hash the password
    });

    await loginController(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/home.html');
  });

  // Similar test for advisor login...

  // Add more tests for error scenarios, invalid passwords, etc.
});
