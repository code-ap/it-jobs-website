import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { JobService } from '../job.service';
import { CustomChipsComponent } from './chips/custom-chips.component';
import { CustomAutocompleteComponent } from './autocomplete/custom-autocomplete.component';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})

export class SearchFiltersComponent implements OnInit {
  // JSON Choosable Vars
  languages: string[] = [];
  roles: string[] = [];

  // User Option Vars
  keyword!: string;
  title!: string;
  companyName!: string;
  roleName!: string;
  goodieName!: string[];
  companyType!: string;
  employmentTypeName!: string;
  languageName!: string[];
  professionName!: string;
  certificateName!: string[];
  categoryName!: string;
  technologyName!: string[];
  methodName!: string[];
  salaryMin = 40000;
  salaryMax = 100000;
  workPercentageMin = 10;
  workPercentageMax = 100;
  location!: string;

  selectedValues: { [key: string]: string | string[] } = {};

  @ViewChild('rolesAC', { static: false }) rolesAC!: CustomAutocompleteComponent;
  @ViewChild('languagesChips', { static: false }) languagesChips!: CustomChipsComponent ;

  constructor(private jobService: JobService) { // inject the service here
  }

  ngOnInit() {
    this.fetchLanguages();
    this.fetchRoles();
  }

  fetchLanguages() {
    this.jobService.getLanguages().subscribe({
      next: data => {
        this.languages = data.map(languageObj => languageObj.languageName);
      },
      error: error => console.error('Error fetching languages:', error)
    });
  }

  fetchRoles() {
    this.jobService.getRoles().subscribe({
      next: data => {
        this.roles = data.map(roleObj => roleObj.roleName); // assuming roles have a similar structure
      },
      error: error => console.error('Error fetching roles:', error)
    });
  }

  handleChipSelection(data: { identifier: string, items: string[] }) {
    console.log("Selected items for", data.identifier, ":", data.items);
    this.selectedValues[data.identifier] = data.items;
    (this as any)[data.identifier] = data.items;
  }

  handleDropDownSelection(data: { identifier: string, value: string }) {
    console.log(data); // Log the entire data object
    console.log("Selected value for", data.identifier, ":", data.value);
    (this as any)[data.identifier] = data.value;
  }

  @Output() filtersChanged = new EventEmitter<any>();

  applyFilters() {
    this.filtersChanged.emit({
      keyword: this.keyword,
      location: this.location,
      languageName: this.languageName,
      roleName: this.roleName,
      employmentTypeName: this.employmentTypeName,
      technologyName: this.technologyName,
      methodName: this.methodName,
      professionName: this.professionName,
      certificateName: this.certificateName,
      categoryName: this.categoryName,
      companyName: this.companyName,
      companyType: this.companyType,
      goodieName: this.goodieName,
      salaryMin: this.salaryMin,
      salaryMax: this.salaryMax,
      workPercentageMin: this.workPercentageMin,
      workPercentageMax: this.workPercentageMax
    });
  }

}
