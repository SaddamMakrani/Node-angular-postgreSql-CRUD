import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../_services/note.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{

  note: Note = {
    title: '',
    description: '',
    published: false,
    userId: '0'
  };
  submitted = false;

  constructor(private _noteService: NoteService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  saveNote(): void {
    const data = {
      title: this.note.title,
      description: this.note.description,
      userId: this.storageService.getUser().id
    };

    this._noteService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newNote(): void {
    this.submitted = false;
    this.note = {
      title: '',
      description: '',
      published: false
    };
  }
}
