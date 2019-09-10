import React from 'react';
import Form from "./form/form"
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

  }
  onFilterChange(e){
    const SELECTED_VALUE = e.target.value;
    const SELECTED_TYPE = e.target.name
    const UPDATED_JOB_TYPES = this.state.jobTypes;
    const UPDATED_LOCATIONS = this.state.locations;
    let stateValue = (SELECTED_TYPE == 'location') ? 'locations' : 'jobTypes' ;
    let stateObj = (SELECTED_TYPE == 'location') ?   UPDATED_JOB_TYPES : UPDATED_LOCATIONS;

    Object.keys(stateObj).map(function(value, key) {
      (!stateObj[value].locations.includes(SELECTED_VALUE) && SELECTED_VALUE != 'all') ? stateObj[value].show = false : stateObj[value].show = true;
    })
    //update state
    this.setState({stateValue : stateObj});

    // //check if job type is available at location, otherwise set as disabled
    // if (SELECTED_TYPE == 'location') {
    //
    //   Object.keys(UPDATED_JOB_TYPES).map(function(value, key) {
    //     (!UPDATED_JOB_TYPES[value].locations.includes(SELECTED_VALUE) && SELECTED_VALUE != 'all') ? UPDATED_JOB_TYPES[value].show = false : UPDATED_JOB_TYPES[value].show = true;
    //   })
    //   //update state
    //   this.setState({jobTypes : UPDATED_JOB_TYPES});
    // }
    // //check if location is available within jobtype, otherwise set as disabled
    // else {
    //   Object.keys(UPDATED_LOCATIONS).map(function(value, key) {
    //     (!UPDATED_LOCATIONS[value].locations.includes(SELECTED_VALUE) && SELECTED_VALUE != 'all') ? UPDATED_LOCATIONS[value].show = false : UPDATED_LOCATIONS[value].show = true;
    //   });
    //   //update state
    //   this.setState({locations : UPDATED_LOCATIONS});
    // }
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
        }
    )
  );
  }

  render() {
    return (
      <div className="App container">
        <Form locations={this.state.locations} jobTypes={this.state.jobTypes} filterChange={this.onFilterChange}/>
      </div>
    );
  }
}

export default App;
