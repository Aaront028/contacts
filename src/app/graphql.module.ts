import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { environment } from 'environment/environment';

const uri = environment.apiUrl;
const adminSecret = environment.hasuraAdminSecret;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create HttpHeaders
  const headers = new HttpHeaders().set('x-hasura-admin-secret', adminSecret);

  return {
    link: httpLink.create({
      uri,
      headers,
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
