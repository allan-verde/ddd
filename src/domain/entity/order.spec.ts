import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("shold throw error id is empty", () => {

    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");

  });

  
  it("shold throw error customerId is empty", () => {

    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");

  });

  it("shold throw error customerId is empty", () => {

    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");

  });

  it("shold calculate total", () => {

    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 1", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);
    
    let total = order.total();
    
    expect(total).toBe(200);
    
    const order2 = new Order("o2", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);

  });

  it("shold throw error if the item qtd is less or equal 0", () => {

    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");

  });

});
