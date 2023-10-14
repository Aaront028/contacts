import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Contact } from '../contact.model';
import { AppState, AppStateModel } from '../../state/app.state';
import { UpdateContact } from '../../state/app.actions';


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
  @Input() isEditing: boolean = false;
  

  ngOnChanges() {

    if (this.contact) {
      console.log('Input Contact:', this.contact);
    }
  }

  
  constructor(private store: Store) {}
  @Input() contact: Contact = new Contact('', '', '');
  @Select(AppState) appState$: Observable<AppStateModel> | undefined;
  @Output() contactUpdated = new EventEmitter<Contact>();

  startEditing() {
    this.editing = true;
    this.editedName = this.contact.name;
    this.editedEmail = this.contact.email;
    this.editedPhone = this.contact.phone || ''; 
  }


  stopEditing() {
    console.log('stopEditing function called');
    console.log('Original Contact:', this.contact);
    
    // Construct the updated contact object based on your logic
    const updatedContact: Contact = {
      id: this.contact.id,
      name: this.editedName,
      email: this.editedEmail,
      phone: this.editedPhone,
    };
  
    console.log('Edited Contact:', updatedContact);
  
    // Add a log for debugging
    console.log('Before conditional check:', {
      'contact.name': this.contact.name,
      'editedName': this.editedName,
      'contact.email': this.contact.email,
      'editedEmail': this.editedEmail,
      'contact.phone': this.contact.phone,
      'editedPhone': this.editedPhone,
    });
  
    if (
      this.contact.name !== this.editedName ||
      this.contact.email !== this.editedEmail ||
      this.contact.phone !== this.editedPhone
    ) {
      console.log('Condition is true');
      // Dispatch the UpdateContact action with the updatedContact
      console.log('Before dispatch:', updatedContact);
  
      try {
        this.store.dispatch(new UpdateContact(updatedContact));
        console.log('Dispatch successful');
      } catch (error) {
        console.error('Dispatch error:', error);
      }
  
      console.log('After dispatch');
      // Emit the updated contact
      this.contactUpdated.emit(updatedContact);
    } else {
      console.log('Condition is false');
    }
  
    console.log('After conditional check');
    console.log('End of stopEditing function');
  }
  
  
}
