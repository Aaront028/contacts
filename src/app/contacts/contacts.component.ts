import { Component, Input, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { GraphqlService } from '@app/services/graphql.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  // template: ` <h1>HELLO!!!!!</h1>
  // <div *ngIf="data$ | async as data">
  //   <h2>Contacts</h2>
  //   <ul>
  //     <li *ngFor="let contact of data.contacts">
  //       <strong>Name:</strong> {{ contact.name }} | <strong>Email:</strong> {{ contact.email }}
  //     </li>
  //   </ul>
  // </div>`,

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

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.data$ = this.graphqlService.getSomeData();
    this.data$.subscribe(data => console.log("hello",data));
  }

  // contacts: Contact[] = [
  //   new Contact('Alicia Vikander', 'aliciavikander@gmail.com', "02125356789"),
  //   new Contact('Margot Robbie', 'margotrobbie@gmail.com', "02125025414089"),
  //   new Contact('Christian Bale', 'christianbale@gmail.com', "05240545444"),
  //   new Contact('Matt Damon', 'mattdamon@gmail.com', "042125054594"),
  //   new Contact('Scarlett Johansson', 'scarlettjohansson@gmail.com', "02123054599"),
  // ]

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
      this.graphqlService.addContact({
        name: this.newContactName,
        email: this.newContactEmail,
        phone: this.newContactPhone,
      }).subscribe({
    
        next: (result) => { console.log("RESULT AND CONTACT NAME",result, this.newContactName)/* handle success */ },
        error: (error) => { console.log(error)/* handle error */ }
      });
      
    }
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
          // Handle the result if needed
          console.log('Mutation result:', result);
        });
    }
  
    if (this.selectedContact === contact) {
      this.selectedContact = null;
    }
  }
  


}
