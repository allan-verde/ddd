/*
 - conjunto de propriedades que representa algo no sistema
 - depois de criado, não será possível alterar o estado do objeto
*/
export default class Address {

  _street: string;
  _number: number = 0;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zip() {
    return this._zip;
  }

  get city() {
    return this._city;
  }

  validate() {
    if (this._street === "") {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Id is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zip}`;
  }

}