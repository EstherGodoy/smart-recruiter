import React from "react"
import resultsStyles from "./styles/results.scss"

const Results = (props) => (
  <div className="search-results">
    <ul>
    {props.searchResults.map(function(job) {
      return <li key={job.name + Math.random()}>{job.name} {job.location.city} {job.industry.label}</li>
    })}
    </ul>
  </div>
)

export default Results;
