const { describe } = require("node:test");
const bcrypt = require('bcrypt');
const app = require('../server');
const request = require('supertest');

describe('User Login', () => {

    it('should log in successfully with valid credentials', async () => {
        
    
        // Make a POST request to the login endpoint
        const response = await request(app).post('/api/login').send({
            email: 'abc@example.com',
            password: 'abc'
        });
    
        // Verify response status and message
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success');
    
        // Check for 'jwt' cookie
        expect(response.headers['set-cookie'][0]).toContain('jwt=');
        expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
        expect(response.headers['set-cookie'][0]).toContain('Max-Age');
    });


    it('should not log in with incorrect credentials', async () => {
    
    
        // Make a POST request with incorrect credentials
        const response = await request(app).post('/api/login').send({
            email: 'abc@example.com',
            password: 'wrongpassword'
        });
    
        // Verify response status and message
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email or Password incorrect');
    
        // Check no 'jwt' cookie is set
        expect(response.headers['set-cookie']).toBeUndefined();
    });
    
    

})