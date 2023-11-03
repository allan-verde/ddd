import Address from "../../customer/value-object/address";
import { Customer } from "../../customer/entity/customer";
import CustomerAddressUpdatedEvent from "../../customer/event/customer-address-updated.event";
import CustomerCreated from "../../customer/event/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log-2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../customer/event/handler/envia-console-log";
import EventDispatcher from "./event-dispatcher";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log";
import ProductCreatedEvent from "../../product/event/product-created.event";

describe("Domain events tests", () => {

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify an event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify an event customer created", () => {
    const eventDispatcher = new EventDispatcher();
    
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    eventDispatcher.register("CustomerCreated", enviaConsoleLog1Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreated"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreated"][0]).toMatchObject(enviaConsoleLog1Handler);

    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreated", enviaConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreated"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreated"][0]).toMatchObject(enviaConsoleLog2Handler);

    const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle");
    const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle");

    const customerCreated = new CustomerCreated({
      customerId: "123",
      customerName: "Customer 1",
    });
    eventDispatcher.notify(customerCreated);

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();

  });

  it("should notify an event customer updated address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"][0]).toMatchObject(eventHandler);
    
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    
    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      customerId: customer.id,
      customerName: customer.name,
      address: customer.Address
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

  });

});
