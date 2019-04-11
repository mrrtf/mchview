import React from "react";
import TopBar from "./TopBar";
import MainStage from "./MainStage";
import BottomBar from "./BottomBar";
import "./app.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import Modal from "./Modal";
import CCDBSelector from "../selectors/CCDBSelector";

const App = ({ modal }) => {
  return (
    <div className="app">
      <TopBar />
      <MainStage view="de" />
      <BottomBar />
      {modal ? (
        <Modal>
          <CCDBSelector title="Fetch Occupancy Map" />
        </Modal>
      ) : null}
    </div>
  );
};

App.propTypes = {
  modal: PropTypes.bool
};

const mapStateToProps = state => ({
  modal: selectors.isModalVisible(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
