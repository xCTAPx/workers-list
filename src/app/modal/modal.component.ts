import { Component, OnInit, Input } from '@angular/core';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() worker;

  constructor(private workersService: WorkersService) { }

  ngOnInit() {
  }

  handleWorker(): void {
    this.workersService.handleWorker(this.worker);
  }

}
