import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateContact } from './app.actions';
import { Contact } from '../contacts/contact.model';

export class AppStateModel {
  contacts: Contact[] =[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    contacts: [],
  },
})
export class AppState {
  @Action(UpdateContact)
  updateContact(ctx: StateContext<AppStateModel>, action: UpdateContact) {
    const state = ctx.getState();
    const updatedContact = action.payload;

    // Find the index of the contact to update
    const index = state.contacts.findIndex(c => c.email === updatedContact.email);


    // Update the contact in the array
    const updatedContacts = [...state.contacts];
    updatedContacts[index] = updatedContact;

    // Update the state with the new contacts array
    ctx.patchState({
      contacts: updatedContacts,
    });
  }
}