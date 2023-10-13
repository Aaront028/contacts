import { Component, Input } from '@angular/core';
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
    console.log('Input Contact:', this.contact);
  }
  constructor(private store: Store) {}
  @Input() contact: Contact = new Contact('', '', '');
  @Select(AppState) appState$: Observable<AppStateModel> | undefined;
  startEditing() {
    this.editing = true;
    this.editedName = this.contact.name;
    this.editedEmail = this.contact.email;
    this.editedPhone = this.contact.phone || ''; // Use an empty string if phone is undefined
  }


  stopEditing(){
    this.editing = false;
    this.contact.name = this.editedName;
    this.contact.email = this.editedEmail;
    this.contact.phone = this.editedPhone;
    this.store.dispatch(new UpdateContact(this.contact));
  }
  
}
