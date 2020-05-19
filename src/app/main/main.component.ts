import { Component, OnInit, Input } from '@angular/core';
import { WorkersService } from '../workers.service';
import { Worker } from '../worker';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() workers: Worker[];

  constructor(private workersService: WorkersService) { }

  currentWorker: Worker;

  ngOnInit(): void {
  }

  openModal() {
    this.workersService.openModal();
  }

  searchWorker(event): void {
    if (event.target.value.trim() !== "") {
      this.workers = this.workersService.searchWorkers(event.target.value.trim());
    } else {
      this.workers = this.workersService.searchWorkers(event.target.value.trim());
    }
  }

}
