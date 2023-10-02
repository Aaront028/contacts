import { Component, Input } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  selectedContact: Contact | null = null;
  addBtnClicked: boolean = false;
  isDeleting: boolean = false;

  newContactName = '';
  newContactEmail = '';
  newContactPhone = '';

  contacts: Contact[] = [
    new Contact('Alicia Vikander', 'aliciavikander@gmail.com', "02125356789"),
    new Contact('Margot Robbie', 'margotrobbie@gmail.com', "02125025414089"),
    new Contact('Christian Bale', 'christianbale@gmail.com', "05240545444"),
    new Contact('Matt Damon', 'mattdamon@gmail.com', "042125054594"),
    new Contact('Scarlett Johansson', 'scarlettjohansson@gmail.com', "02123054599"),
  ]

  toggleDetails(contact: Contact): void {
    console.log('Selected Contact:', contact);

    if (this.selectedContact === contact) {
      this.selectedContact = null;
    } else {
      this.selectedContact = contact;
    }
  }

  addContact(): void {
    if (this.newContactName && this.newContactEmail && this.newContactPhone) {
      const newContact = new Contact(this.newContactName, this.newContactEmail, this.newContactPhone);
      this.contacts.push(newContact);

      this.newContactName = '';
      this.newContactEmail = '';
      this.newContactPhone = '';
    }
  }

  addNewContactBtn() {
    this.addBtnClicked = !this.addBtnClicked;
  }

  ifDeleting() {
    this.isDeleting = !this.isDeleting;
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.indexOf(contact);

    if (index !== -1) {
      this.contacts.splice(index, 1);
    }

    if (this.selectedContact === contact) {
      this.selectedContact = null;
    }
  }


}
