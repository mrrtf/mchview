import React, { useRef } from "react";
import CloseButton from "../ui/CloseButton";
import FetchButton from "../ui/FetchButton";
import { connect } from "react-redux";
import { actions as visibilityActions } from "../../ducks/visibility";
import { selectors } from "../../reducers";

const fetchOccupancy = (deid, timestamp = 0, url = "") => {
  const qurl = url + "/occupancymap?deid=" + deid + "&run=" + timestamp;
  console.log("Requested to fetch from url=", qurl);
  return fetch(qurl).then(response => response.json());
};

const CCDBSelector = ({ deid, title, hideModal }) => {
  let timestamp = useRef();
  let url = useRef();

  return (
    <main>
      <header>
        <h1>{title}</h1>
        <CloseButton />
      </header>
      <fieldset>
        <label htmlFor="timestamp">Timestamp (run number for the moment)</label>
        <input
          ref={timestamp}
          id="timestamp"
          pattern="[0-9]{6}"
          required="required"
          size="6"
        />
        <label htmlFor="source_url">Source URL</label>
        <input
          ref={url}
          id="source_url"
          type="text"
          pattern="https?://.+"
          placeholder="https://"
        />
      </fieldset>
      <FetchButton
        fetcher={() => {
          return fetchOccupancy(
            deid,
            timestamp.current.value,
            url.current.value
          );
        }}
        finalizer={hideModal}
      />
    </main>
  );
};

const mapStateToProps = state => {
  return {
    deid: selectors.deid(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(visibilityActions.hideModal())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CCDBSelector);