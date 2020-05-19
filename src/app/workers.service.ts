import { Injectable } from '@angular/core';
import { Worker } from './worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  workers: Worker[] = [];
  modal: boolean = false;
  current: Worker;
  id: number = 0;
  constructor() { }

  getWorkers(): Worker[] {
    this.workers = JSON.parse(localStorage.getItem("workers"));
    for (let worker of this.workers) {
      worker.current = false;
    }
    return this.workers;
  }

  getModal(): boolean {
    return this.modal;
  }

  openModal(): boolean {
    return this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }

  flagEdit = false;

  handleWorker(worker: any): any {
    const newWorker = {
      id: this.id++,
      avatar: worker.avatar,
      name: worker.name,
      surname: worker.surname,
      birthday: worker.birthday,
      get age() {
        return Math.floor((new Date().getTime() - new Date(this.birthday).getTime()) / 31556926000)
      },
      position: worker.position,
      remote: worker.remote,
      city: worker.city,
      street: worker.street,
      house: worker.house,
      flat: worker.flat,
      address: worker.city + " " + worker.street + " " + worker.house + " " + worker.flat,
      current: worker.current,
      show: true
    }

    if (newWorker.name && newWorker.surname && newWorker.birthday && +newWorker.age + 1 &&
      newWorker.position && newWorker.address.trim()) {
      if (this.flagEdit) {
        let index: number;
        for (let i = 0; i < this.workers.length; i++) {
          if (worker.id === this.workers[i].id) index = i;
        }
        newWorker.address = this.workers[index].city + " " + this.workers[index].street + " " + this.workers[index].house + " " + this.workers[index].flat;
        worker.id = newWorker.id;
        this.workers[index] = newWorker;
        this.flagEdit = false;
        let LSData: string = JSON.stringify(this.workers);
        localStorage.setItem("workers", LSData);
        return;
      } else {
        this.workers.push(newWorker);
        let LSData: string = JSON.stringify(this.workers);
        localStorage.setItem("workers", LSData);
        return;
      }
    } else {
      alert("Были заполнены не все обязательные поля!");
      return;
    }
  }

  flags = {
    name: false,
    surname: false,
    birthday: false,
    age: false,
    position: false,
    remote: false,
    address: false
  }

  sortBy(field: string): void {
    this.workers.sort((a, b) => a[field] > b[field] ? 1 : -1);
    if (this.flags[field]) {
      this.workers.reverse();
    }

    this.flags[field] = !this.flags[field];
    let LSData: string = JSON.stringify(this.workers);
    localStorage.setItem("workers", LSData);
  }

  setCurrent(index: number): Worker {
    if (this.workers[index].current) {
      this.workers[index].current = !this.workers[index].current;
      return;
    }
    for (let worker of this.workers) {
      worker.current = false;
    }
    this.workers[index].current = !this.workers[index].current;
    this.current = this.workers[index];
    return this.current;
  }

  deleteWorker(id: number): Worker[] {
    for (let i = 0, len = this.workers.length; i < len; i++) {
      if (id === this.workers[i].id)
        id = i;
    }
    this.workers.splice(id, 1);
    let LSData: string = JSON.stringify(this.workers);
    localStorage.setItem("workers", LSData);
    return this.workers;
  }

  editModal(id: number) {
    this.flagEdit = true;
    return this.modal = true;
  }

  searchWorkers(val: string): Worker[] {
    for (let worker of this.workers) {
      worker.show = true;
    }
    for (let worker of this.workers) {
      if (!(worker.name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) + 1) &&
        !(worker.surname.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) + 1)) {
        worker.show = false;
      }
    }

    return this.workers;
  }
}
