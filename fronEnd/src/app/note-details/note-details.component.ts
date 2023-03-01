import { Component, Input } from '@angular/core';
import { Note } from '../models/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../_services/note.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent {
  @Input() viewMode = false;

  @Input() currentNote: Note = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private _noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getnote(this.route.snapshot.params["id"]);
    }
  }

  getnote(id: string): void {
    this._noteService.get(id, this.storageService.getUser().id)
      .subscribe({
        next: (data) => {
          this.currentNote = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentNote.title,
      description: this.currentNote.description,
      published: status,
      userId : this.storageService.getUser().id
    };

    this.message = '';

    this._noteService.update(this.currentNote.id, data)
      .subscribe({
        next: (res) => {
          this.currentNote.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateNote(): void {
    this.message = '';

    this._noteService.update(this.currentNote.id, this.currentNote)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'This note was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteNote(): void {
    this._noteService.delete(this.currentNote.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/notes']);
        },
        error: (e) => console.error(e)
      });
  }

}
