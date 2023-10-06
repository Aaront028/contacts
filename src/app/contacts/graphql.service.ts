
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private apiUrl = environment.apiUrl || ''; // Use the API_URL environment variable
  private hasuraAdminSecret = environment.hasuraAdminSecret || ''; // Use the HASURA_ADMIN_SECRET environment variable

  constructor(private http: HttpClient) {}

  query(query: string): Observable<any> {
    const headers = new HttpHeaders().set('x-hasura-admin-secret', this.hasuraAdminSecret);

    return this.http.post<any>(this.apiUrl, { query }, { headers });
  }
}