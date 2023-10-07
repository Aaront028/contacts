import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http'; // Import HttpHeaders

const uri = 'https://concise-crane-63.hasura.app/v1/graphql';
const adminSecret = '9W@UgMPTYyIF4Sz1MixhiaR*CvGPboCH!8jMSSW0u1TquACPfWVKq35*muNbzb';

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
