import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  editing: boolean = false;
  editedName: string = '';
  editedEmail: string = '';
  editedPhone: string = '';
  @Input() isDeleting: boolean = false;

  ngOnChanges() {
    console.log('Input Contact:', this.contact);
  }
  @Input() contact: Contact = new Contact('', '', '');

  startEditing() {
    this.editing = true;
    this.editedName = this.contact.name;
    this.editedEmail = this.contact.email;
    this.editedPhone = this.contact.phone;
  }

  stopEditing(){
    this.editing = false;
    this.contact.name = this.editedName;
    this.contact.email = this.editedEmail;
    this.contact.phone = this.editedPhone;

  }
  
}
