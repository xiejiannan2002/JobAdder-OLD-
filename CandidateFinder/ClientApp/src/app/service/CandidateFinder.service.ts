import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';

import { Job } from '../data/Job';
import { Candidate } from '../data/Candidate';

@Injectable({
  providedIn: 'root'
})

export class CandidateFinderService {
  constructor(private http: HttpClient) { }

  public GetAllJobs(): Observable<any> {
    return this.http.get('http://private-76432-jobadder1.apiary-mock.com/jobs');
  }

  public GetAllCandidate(): Observable<any> {
    return this.http.get('http://private-76432-jobadder1.apiary-mock.com/candidates');
  }

  public FindBestCandidate(jobs: Job[], candidates: Candidate[]): Job[] {
    jobs.forEach(job => {
      job.candidate = this.MatchSkills(job, candidates);
      //console.log(job);
    });
    //console.log(jobs);
    return jobs;
  }

  private MatchSkills(job: Job, candidates: Candidate[]): Candidate {
    let best: Candidate;
    let requiredSkills: string[] = job.skills.trim().split(',');
    let matchedSkills: number = 0;

    candidates.forEach(candidate => {
      let haveSkills: string[] = candidate.skillTags.trim().split(',');
      let count: number = requiredSkills.filter(element => haveSkills.includes(element)).length;
      if ((count > matchedSkills) || (count == matchedSkills && best != null && best.skillTags.trim().split(',').length < haveSkills.length)) {
        matchedSkills = count;
        best = candidate;
      }
    });
    //console.log(best);
    return best;
  }

}
