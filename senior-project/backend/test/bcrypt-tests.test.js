const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-global');
const { loginController } = require('../controllers/authController'); // Update with the actual file path

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await mongoose.connection.dropDatabase();
});

jest.mock('../models/Student', () => ({
    findOne: jest.fn(),
  }));
  
  jest.mock('../models/Advisor', () => ({
    findOne: jest.fn(),
  }));
  
  describe('loginController', () => {
    // Mock the bcrypt.compare function
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hashedPassword) => {
      // Implement your own logic for comparing passwords, for example:
      return Promise.resolve(password === hashedPassword);
    });
  
    // Mock req, res, and next objects
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

      // Check if bcrypt.compare was called with the correct arguments
    expect(mockCompare).toHaveBeenCalledWith(
        req.body.userPassword, // The provided password
        expect.any(String) // The hashed password from the mock student
      );
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/home.html');
    });
  
    // Similar test for advisor login...
  
    // Add more tests for error scenarios, invalid passwords, etc.
  });