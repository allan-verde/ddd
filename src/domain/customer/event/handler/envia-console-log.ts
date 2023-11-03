import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent> {
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventDate.customerId}, ${event.eventDate.customerName} alterado para: ${event.eventDate.address}`);
  }
}
