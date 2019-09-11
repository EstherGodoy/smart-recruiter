import React from "react"
import resultsStyles from "./styles/results.scss"

const Results = (props) => (
  <div className="search-results">
    <ul>
    {props.searchResults.map(function(job) {
      return <li key={job.name + Math.random()}><h2>{job.name}</h2> <p>{job.typeOfEmployment.label} - {job.industry.label} -  {job.location.city}</p> <a href={job.ref} target="_blank">Apply Now</a></li>
    })}
    </ul>
  </div>
)

export default Results;
