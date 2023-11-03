import Address from "../value-object/address";

export class Customer {

  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  validate() {
    if (this._id === "") {
      throw new Error("Id is required");
    }
    if (this._name === "") {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}

/*
 - normalmente se cria baseado em ORM (não é o correto)
 - entidade anemica
 - entidade focade em negocio
 - o ORM cria entidades focada em persistencia (model)
 - representa o estado correto do objeto
 - carrega as regras de negocio 
 - Uma entidade por padrão sempre vai se auto validar
*/

/*
Complexidade de negócio
Domain
- Entity
  - customer.ts (regra de negócio)

Complexidade acidental
Infra - mundo externo
- Entity/Model
  - customer.ts (persistencia - get/set)
*/

/*
Agregados:
 - Customer => Address
 - Order => OrderItem
 - Product
*/