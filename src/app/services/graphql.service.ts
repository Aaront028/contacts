import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of,Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import gql from 'graphql-tag';


// Define the Contact interface
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  // Example query
  getSomeData(): Observable<{ contacts: Contact[] }> {
    return this.apollo
      .watchQuery<{ contacts: Contact[] }>({
        query: gql`
          query GetContacts {
            contacts {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data || { contacts: [] }));
  }
  addContact(newContact: any): Observable<Contact | undefined> {
    const variables: Record<string, any> = {
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    };
  
    return this.apollo
      .mutate<{ insert_contacts_one: Contact }>({
        mutation: gql`
          mutation AddContact($name: name!, $email: String!, $phone: String!) {
            insert_contacts_one(object: { name: $name, email: $email, phone: $phone }) {
              id
              name
              email
              phone
            }
          }
        `,
        variables,
      })
      .pipe(map((result) => result.data?.insert_contacts_one));
  }
  
  
  

  updateContact(updatedContact: any): Observable<Contact | undefined> {
    return this.apollo
      .mutate<{ updateContact: Contact }>({
        mutation: gql`
          mutation UpdateContact($id: ID!, $name: name!, $email: String!) {
            updateContact(id: $id, name: $name, email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: {
          id: updatedContact.id,
          name: updatedContact.name,
          email: updatedContact.email,
        },
      })
      .pipe(map((result) => result.data?.updateContact));
  }
  deleteContact(contactId: string): Observable<{ id: string } | undefined> {
    console.log('Deleting contact with id:', contactId);
  
    return this.apollo
      .mutate<{ delete_contacts: { affected_rows: number } }>({
        mutation: gql`
          mutation DeleteContact($id: Int) {
            delete_contacts(where: { id: { _eq: $id } }) {
              affected_rows
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id: parseInt(contactId, 10), // Convert to integer if needed
        },
      })
      .pipe(
        map((result) => {
          console.log('Delete result:', result);
  
          if (result.data?.delete_contacts?.affected_rows) {
            console.log('Contact deleted successfully');
            return { id: contactId };
          } else {
            console.error('Error deleting contact');
            return undefined;
          }
        }),
        catchError((error) => {
          console.error('Error in deleteContact:', error);
          return of(undefined);
        })
      );
  }
  
  
}
