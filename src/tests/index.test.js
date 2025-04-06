const functionToTest = require('../functions/index');

describe('Hello World Function Tests', () => {
  
  it('should return status code 200', async () => {
    const context = {
      res: {}
    };
    const req = {};
    
    await functionToTest(context, req);
    
    expect(context.res.status).toBe(200);
  });
  
  it('should return "Hello, World!" message', async () => {
    const context = {
      res: {}
    };
    const req = {};
    
    await functionToTest(context, req);
    
    expect(context.res.body).toBe("Hello, World!");
  });
  
  it('should handle request with name parameter', async () => {
    const context = {
      res: {}
    };
    const req = {
      query: {
        name: "John"
      }
    };
    
    await functionToTest(context, req);

    expect(context.res.body).toBe("Hello, World!");
  });
});
