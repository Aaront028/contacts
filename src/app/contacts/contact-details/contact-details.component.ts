import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  ngOnChanges() {
    console.log('Input Contact:', this.contact);
  }
  @Input() contact: Contact = new Contact('', '', '');
}
