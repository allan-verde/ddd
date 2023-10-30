import Address from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {

  it("shold throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("shold throw error name id is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });
  
  it("shold change name", () => {
    // Arrange
    const customer = new Customer("123", "John");
    
    // Act
    customer.changeName("Jane");
    
    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("shold activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-123", "City 1");
    customer.Address = address;
    
    customer.activate();
    
    expect(customer.isActive()).toBe(true);
  });

  it("shold throw error when address is undefined when you activate a customer", () => {
    
    expect(() => {
      const customer = new Customer("1", "Customer 1");    
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  
  });

  it("shold deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    
    customer.deactivate();
    
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

});
