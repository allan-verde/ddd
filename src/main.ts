import Address from "./domain/customer/value-object/address";
import { Customer } from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/repository/order_item";

// Customer Aggregate
let customer = new Customer("123", "Allan Verde");
const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();

// Order Aggregate
const item1 = new OrderItem("1", "Item 1", 10, "1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "2", 3);
const order = new Order("1", customer.id, [item1, item2]);

console.log(customer);
console.log(order);