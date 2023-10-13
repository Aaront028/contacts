import { Contact } from '../contacts/contact.model';

export class AddContact {
  static readonly type = '[App] Add Contact';
  constructor(public payload: Contact) {}
}

export class EditContact {
  static readonly type = '[App] Edit Contact';
  constructor(public payload: Contact) {}
}

export class UpdateContact {
  static readonly type = '[Contact] Update';
  constructor(public payload: Contact) {}
}
