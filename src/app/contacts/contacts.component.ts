import { Component, Input, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { GraphqlService } from '@app/services/graphql.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact | null = null;
  addBtnClicked: boolean = false;
  isDeleting: boolean = false;

  newContactName = '';
  newContactEmail = '';
  newContactPhone = '';
  data$!: Observable<any>;

  contacts: Contact[] = [];

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.data$ = this.graphqlService.getSomeData();
    this.data$.subscribe(data => console.log("hello",data));

    this.graphqlService.contactSubscription().subscribe({
      next: (data) => {
        // Handle the updated data, e.g., update your contacts list
        this.contacts = data;
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });
    
  }

  toggleDetails(contact: Contact): void {
    console.log('Selected Contact:', contact);

    if (this.selectedContact === contact) {
      this.selectedContact = null;
    } else {
      this.selectedContact = contact;
    }
  }

  addContact() {
    this.graphqlService.addContact(
      this.newContactName,
      this.newContactEmail,
      this.newContactPhone
    ).subscribe({
      next: (addedContact) => {
        if (addedContact) {
          console.log('Contact added successfully:', addedContact);
          // Clear the form fields after successful addition
          this.newContactName = '';
          this.newContactEmail = '';
          this.newContactPhone = '';
        } else {
          console.error('Error adding contact');
        }
      },
      error: (error) => {
        console.error('Add contact error:', error);
      },
    });
  }
  

  addNewContactBtn() {
    this.addBtnClicked = !this.addBtnClicked;
  }

  ifDeleting() {
    this.isDeleting = !this.isDeleting;
  }

  deleteContact(contact: Contact): void {
    console.log("This is inside the contacts component with deleteContact()");
  
    if (this.selectedContact) {
      this.graphqlService.deleteContact(this.selectedContact.id)
        .subscribe(result => {
          console.log('Mutation result:', result);
        });
    }
  
    if (this.selectedContact === contact) {
      this.selectedContact = null;
    }
  }
  


}
