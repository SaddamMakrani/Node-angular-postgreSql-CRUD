import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../_services/note.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes?: Note[];
  currentNote: Note = {};
  currentIndex = -1;
  title = '';

  constructor(private _noteService: NoteService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.retrieveNotes();
  }

  retrieveNotes(): void {
    this._noteService.getAll(this.storageService.getUser().id)
      .subscribe({
        next: (data) => {
          this.notes = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveNotes();
    this.currentNote = {};
    this.currentIndex = -1;
  }

  setActiveNote(note: Note, index: number): void {
    this.currentNote = note;
    this.currentIndex = index;
  }

  removeAllNotes(): void {
    this._noteService.deleteAll(this.storageService.getUser().id)
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentNote = {};
    this.currentIndex = -1;

    this._noteService.findByTitle(this.title, this.storageService.getUser().id)
      .subscribe({
        next: (data) => {
          this.notes = data;
        },
        error: (e) => console.error(e)
      });
  }

}
