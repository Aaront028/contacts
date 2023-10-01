import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  
  selectedContact: any;

  contacts: Contact[] = [
    new Contact('Alicia Vikander', 'aliciavikander@gmail.com', "02125356789"),
    new Contact('Margot Robbie', 'margotrobbie@gmail.com', "02125025414089"),
    new Contact('Christian Bale', 'christianbale@gmail.com', "05240545444"),
    new Contact('Matt Damon', 'mattdamon@gmail.com', "042125054594"),
    new Contact('Scarlett Johansson', 'scarlettjohansson@gmail.com', "02123054599"),

  ]

  showDetails(contact: Contact) {
    console.log('Selected Contact:', contact);
    this.selectedContact = contact;
  }
}
