import { Component } from '@angular/core';
import { WorkersService } from './workers.service';
import { Worker } from './worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private workersService: WorkersService) { }

  modal: boolean;
  workers: Worker[];
  current: any;

  worker = {
    avatar: "",
    name: "",
    surname: "",
    birthday: "",
    position: "",
    remote: false,
    city: "",
    street: "",
    house: "",
    flat: null,
    show: true
  }

  ngOnInit(): void {
    this.modal = this.workersService.getModal();
    this.workers = this.workersService.getWorkers();
  }

  clickHandler(event) {
    switch (event.target.className || event.target.closest.className) {
      case "buttons__btn add-btn":
        this.modal = this.workersService.openModal();
        this.worker = {
          avatar: "",
          name: "",
          surname: "",
          birthday: "",
          position: "",
          remote: false,
          city: "",
          street: "",
          house: "",
          flat: null,
          show: true
        }
        break;
      case "buttons__btn edit-btn":
        this.worker = this.current;
        if (this.current) this.modal = this.workersService.editModal(this.current.id);
        break;
      case "buttons__btn remove-btn":
        if (this.current) this.workers = this.workersService.deleteWorker(this.current.id);
        this.current = null;
      case "modal__close":
        this.workersService.closeModal();
        this.modal = this.workersService.getModal();
        break;
      case "btn__finish":
        this.workersService.closeModal();
        this.modal = this.workersService.getModal();
        break;
      case "name__sort":
        this.workersService.sortBy("name");
        this.workers = this.workersService.getWorkers();
        break;
      case "surname__sort":
        this.workersService.sortBy("surname");
        this.workers = this.workersService.getWorkers();
        break;
      case "birthday__sort":
        this.workersService.sortBy("birthday");
        this.workers = this.workersService.getWorkers();
        break;
      case "age__sort":
        this.workersService.sortBy("age");
        this.workers = this.workersService.getWorkers();
        break;
      case "position__sort":
        this.workersService.sortBy("position");
        this.workers = this.workersService.getWorkers();
        break;
      case "remote__sort":
        this.workersService.sortBy("remote");
        this.workers = this.workersService.getWorkers();
        break;
      case "address__sort":
        this.workersService.sortBy("address");
        this.workers = this.workersService.getWorkers();
        break;
      case "worker-id":
        this.current = this.workersService.setCurrent(+event.target.closest("tr").getAttribute("id"));
        break;
      default:
        break;
    }
  }
}
