import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/interfaces/User.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public dataSource: MatTableDataSource<User>;
  public displayedColumns = [
    'id',
    'firstname',
    'lastname',
    'email',
    'isAdmin',
    'actions'
  ]
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getAllUser().subscribe(
      users => this.dataSource = new MatTableDataSource(users['hydra:member'])
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
