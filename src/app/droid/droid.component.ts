import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-droid',
  templateUrl: './droid.component.html',
  styleUrls: ['./droid.component.scss']
})
export class DroidComponent {
  title = 'Droids';

  droids: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            droids {
              items {
                name
                id
                friends {id name}
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
      // @ts-ignore
      this.droids = result.data && result.data.droids.items;
      this.loading = result.loading;
      this.error = result.errors;
    });
  }
}
