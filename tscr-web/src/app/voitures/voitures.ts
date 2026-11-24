// FILE: src/app/voitures/voitures.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VoitureService } from '../voiture';
import { Voiture } from '../voiture-model';

@Component({
  selector: 'app-voitures',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './voitures.html',
  styleUrls: ['./voitures.css']
})
export class VoituresComponent implements OnInit {
  voitures: Voiture[] = [];
  user = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(
    private voitureService: VoitureService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.voitureService.getAllVoitures().subscribe({
      next: (data) => {
        this.voitures = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error fetching cars:', err)
    });
  }
}