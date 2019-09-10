import React from "react"
import formStyles from "../styles/form.scss"

const Form = (props) => (

  <form className="filter-form">
    <select name="location" onChange={props.filterChange}>
      <option value="all">All Locations</option>
      {Object.keys(props.locations).map(function(keyName, keyIndex) {
        return (props.locations[keyName].show) ? <option key={keyIndex} value={keyName}>{keyName}</option> : <option key={keyIndex} value={keyName} disabled>{keyName}</option>;
      })}
    </select>
    <select name="job-type" onChange={props.filterChange}>
      <option value="all">All Job Types</option>
      {Object.keys(props.jobTypes).map(function(keyName, keyIndex) {
        return (props.jobTypes[keyName].show) ? <option key={keyIndex} value={keyName}>{keyName}</option> : <option key={keyIndex} value={keyName} disabled>{keyName}</option>;
      })}
    </select>
  </form>
)

export default Form;
