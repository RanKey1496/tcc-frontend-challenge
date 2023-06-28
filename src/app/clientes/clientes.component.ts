import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { TCCClient } from './tcc.client';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public displayedColumns = ['Tipo', 'Identificacion', 'Nombre', 'Genero', 'Detalle', 'Accion']
  public clients: Observable<any> = this.getClients();

  private types: any = {
    'Cédula Ciudadania': 'CC',
    'NIT': 'NIT',
    'Cédula Extranjeria': 'CE'
  }

  constructor(
    private authenticationService: AuthenticationService,
    private tccClient: TCCClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
  }

  getClients() {
    return this.tccClient.getClients().pipe(map((res) => res.data));
  }

  reloadClients(): void {
    this.clients = this.getClients();
  }

  openDetail(row: any): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadClients();
    });
  }

  deleteClient(row: any): void {
    console.log('asdasd', this.types[row.identificationType])
    this.tccClient.deleteClient(this.types[row.identificationType], row.identification).subscribe(result => {
      this.reloadClients();
    });
  }

  newClient(): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '250px',
      data: { new: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadClients();
    });
  }
}
