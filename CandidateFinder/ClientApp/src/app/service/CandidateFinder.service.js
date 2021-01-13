"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CandidateFinderService = /** @class */ (function () {
    function CandidateFinderService(http) {
        this.http = http;
    }
    CandidateFinderService.prototype.GetAllJobs = function () {
        return this.http.get('http://private-76432-jobadder1.apiary-mock.com/jobs');
    };
    CandidateFinderService.prototype.GetAllCandidate = function () {
        return this.http.get('http://private-76432-jobadder1.apiary-mock.com/candidates');
    };
    CandidateFinderService.prototype.FindBestCandidate = function (jobs, candidates) {
        var _this = this;
        jobs.forEach(function (job) {
            job.candidate = _this.MatchSkills(job, candidates);
            //console.log(job);
        });
        //console.log(jobs);
        return jobs;
    };
    CandidateFinderService.prototype.MatchSkills = function (job, candidates) {
        var best;
        var requiredSkills = job.skills.trim().split(',');
        var matchedSkills = 0;
        candidates.forEach(function (candidate) {
            var haveSkills = candidate.skillTags.trim().split(',');
            var count = requiredSkills.filter(function (element) { return haveSkills.includes(element); }).length;
            if (count > matchedSkills) {
                matchedSkills = count;
                best = candidate;
            }
        });
        //console.log(best);
        return best;
    };
    CandidateFinderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CandidateFinderService);
    return CandidateFinderService;
}());
exports.CandidateFinderService = CandidateFinderService;
//# sourceMappingURL=CandidateFinder.service.js.map