import React from "react";
import styles from "./datasourceselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

let DataSourceSelector = ({ url, timestamp, data }) => {
  return (
    <ul className={styles.datasourcecard}>
      <li>{url}</li>
      <li>{timestamp}</li>
      <li>{isEmpty(data) ? "NODATA" : "SOMEDATA"}</li>
    </ul>
  );
};

DataSourceSelector.propTypes = {
  url: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  data: PropTypes.object
};

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

const mapStateToProps = state => ({
  url: "https://wonderful.com",
  timestamp: 42,
  data: {}
});

const mapDispatchToProps = dispatch => ({});

DataSourceSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourceSelector);

export default DataSourceSelector;
