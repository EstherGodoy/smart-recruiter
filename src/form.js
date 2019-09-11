import React from "react"
import formStyles from "./styles/form.scss"

const Form = (props) => (
  <div>
    <h1>Careers - Find The Perfect Job For You</h1>
    <form className="filter-form">
      <div class="select-wrap">
        <select id="location-filter" name="location" onChange={props.filterChange}>
          <option value="all">All Locations</option>
          {Object.keys(props.locations).map(function(keyName, keyIndex) {
            return (props.locations[keyName].show) ? <option key={keyIndex} value={keyName}>{keyName}</option> : <option key={keyIndex} value={keyName} disabled>{keyName}</option>;
          })}
        </select>
      </div>
      <div class="select-wrap">
        <select id="job-filter" name="job-type" onChange={props.filterChange}>
          <option value="all">All Job Types</option>
          {Object.keys(props.jobTypes).map(function(keyName, keyIndex) {
            return (props.jobTypes[keyName].show) ? <option key={keyIndex} value={keyName}>{keyName}</option> : <option key={keyIndex} value={keyName} disabled>{keyName}</option>;
          })}
        </select>
      </div>
    </form>
  </div>
)

export default Form;
