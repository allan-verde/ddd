import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreated from "../customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreated> {
  handle(event: CustomerCreated): void {
    console.log(`Sending email to ...`);
  }
}
