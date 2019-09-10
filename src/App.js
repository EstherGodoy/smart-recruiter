import React from 'react';
import Form from "./form"
import Results from "./results"
import './App.css';

const API = 'https://api.smartrecruiters.com/v1/companies/TheSpringsLiving/postings';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        smartRecruiterResults : [],
        locations :[],
        jobTypes: [],
        searchResults: [],
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);

  }

  onFilterChange(e){
    const SELECTED_VALUE = e.target.value;
    const SELECTED_TYPE = e.target.name
    const UPDATED_JOB_TYPES = this.state.jobTypes;
    const UPDATED_LOCATIONS = this.state.locations;
    let stateValue = (SELECTED_TYPE == 'location') ? 'locations' : 'jobTypes' ;
    let stateObj = (SELECTED_TYPE == 'location') ?   UPDATED_JOB_TYPES : UPDATED_LOCATIONS;

    //check locations up against job types & update drop down selectors to correspond to available job listings
    Object.keys(stateObj).map(function(value, key) {
      (!stateObj[value].locations.includes(SELECTED_VALUE) && SELECTED_VALUE != 'all') ? stateObj[value].show = false : stateObj[value].show = true;
    })

    //update state
    this.setState({stateValue : stateObj});

    this.updateSearchResults(SELECTED_VALUE, SELECTED_TYPE);
  }

  updateSearchResults(filterType, filterValue){
    const ORIGINAL_DATA = this.state.smartRecruiterResults;

    let enabledLocations = [];
    let enabledJobTypes = [];
    let locationFilterVal = document.getElementById('location-filter').value;
    let jobFilterVal = document.getElementById('job-filter').value;
    let currentLocations = this.state.locations;
    let currentJobTypes = this.state.jobTypes;

    if (locationFilterVal == 'all') {
      Object.keys(currentLocations).map(function(value, key) {
        if (currentLocations[value].show) {
          enabledLocations.push(value);
        }
      })
    }
    else {
      enabledLocations.push(locationFilterVal);
    }

    if (jobFilterVal == 'all') {
      Object.keys(currentJobTypes).map(function(value, key) {
        if (currentJobTypes[value].show) {
          enabledJobTypes.push(value);
        }
      })
    }
    else {
      enabledJobTypes.push(jobFilterVal);
    }

    let searchResults = [];
    console.log(enabledLocations);
    console.log(enabledJobTypes);
    ORIGINAL_DATA.map(function(job) {
      if (enabledJobTypes.includes(job.industry.label) && enabledLocations.includes(job.location.city)) {
        searchResults.push(job);
      }
    })

    this.setState({searchResults : searchResults});


    // else {
    //   enabledJobTypes.push(filterValue);
    //
    //   Object.keys(currentLocations).map(function(value, key) {
    //     if (currentLocations[value].show && ) {
    //       enabledLocations.push(value);
    //     }
    //   })
    // }
    //
    // console.log(enabledLocations);
    // console.log(enabledJobTypes);

    //loop through initial api call and select only the jobs with the selected values

  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(
      data => this.setState(
        {smartRecruiterResults: data.content},
        () => {
          const results = this.state.smartRecruiterResults;

          /* Retrieve All Locations & Assign Job List to Corresponding Location */
          const locations = {};
          results.map((job, index) => (locations[job.location.city] = {}))

          results.map((job, index) => (
            locations[job.location.city] = {locations : [], show: true}
          ))

          results.map((job, index) => {
            if (!locations[job.location.city].locations.includes(job.industry.label)) {
              locations[job.location.city].locations.push(job.industry.label)
            }
          })

          this.setState({locations : locations});

          /* Retrieve All Job Types & Assign to Location */
          const jobTypes = {};

          results.map((job, index) => (
            jobTypes[job.industry.label] = {locations : [], show: true}
          ))

          results.map((job, index) => {
            if (!jobTypes[job.industry.label].locations.includes(job.location.city)) {
                jobTypes[job.industry.label].locations.push(job.location.city)
            }
          })

          this.setState({jobTypes : jobTypes});
          this.setState({searchResults : this.state.smartRecruiterResults}, () => console.log(this.state.searchResults));
        }
    )
  );
  }

  render() {
    return (
      <div className="App container">
        <Form locations={this.state.locations} jobTypes={this.state.jobTypes} filterChange={this.onFilterChange}/>
        <Results searchResults={this.state.searchResults} testYO="wtf"/>
      </div>
    );
  }
}

export default App;
