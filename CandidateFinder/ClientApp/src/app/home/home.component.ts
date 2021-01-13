import { Component, OnInit } from '@angular/core';

import { Candidate } from '../data/Candidate';
import { Job } from '../data/Job';
import { CandidateFinderService } from '../service/CandidateFinder.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/css/default.css']
})
export class HomeComponent implements OnInit {
  public currentJobs: Job[] = [];
  public matchedJobs: Job[] = null;
  public currentCandidates: Candidate[] = [];
  public currentPage: number = 0;
  public pageCount: number = 6;

  constructor(private CandidateFinderService: CandidateFinderService) { }

  ngOnInit() {
      this.getAllJobsData();
  }

  private getAllJobsData() {
    this.CandidateFinderService.GetAllJobs()
      .subscribe({
        next: data => {
          this.currentJobs = data;
          //console.log(this.currentJobs);
          this.getAllCandidatesData();         
        },
        error: error => {
          console.error(error.message);
        }
      });
  }

  private getAllCandidatesData() {
    this.CandidateFinderService.GetAllCandidate()
      .subscribe({
        next: data => {
          this.currentCandidates = data;
          //console.log(this.currentCandidates);
          this.matchedJobs = this.CandidateFinderService.FindBestCandidate(this.currentJobs, this.currentCandidates);
        },
        error: error => {
          console.error(error.message);
        }
      });
  }

  public startIndex(): number {
    return this.currentPage * this.pageCount;
  }

  public endIndex(): number {
    return (this.currentPage + 1) * this.pageCount;
  }

  public Up() {
    if (this.currentPage >= 1)
      this.currentPage--;
    this.startIndex();
    this.endIndex();
  }

  public Down() {
    if ((this.currentPage + 1) * this.pageCount < this.currentJobs.length)
      this.currentPage++;
    this.startIndex();
    this.endIndex();
  }

}
