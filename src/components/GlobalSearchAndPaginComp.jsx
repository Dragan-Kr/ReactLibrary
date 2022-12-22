import React, { Component } from 'react';
import { Input } from "semantic-ui-react";

 class GlobalSearchAndPaginComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchInput: props.sorted
        };
      }
    
      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };
    
      globalSearch = () => {
        let { searchInput } = this.state;
        let filteredData = this.props.data.filter(value => {
          return (
            value.name.toLowerCase().includes(searchInput.toLowerCase()) 
            //||
            // value.status.toLowerCase().includes(searchInput.toLowerCase()) ||
            // value.visits
            //   .toString()
            //   .toLowerCase()
            //   .includes(searchInput.toLowerCase())
          );
        });
        this.props.handleSetData(filteredData);
        console.log("ovo je filteredData" + JSON.stringify(filteredData))
      };
    
      render() {
        return (
          <>
            <br />
            <Input
              size="large"
              name="searchInput"
              value={this.state.searchInput || ""}
              onChange={this.handleChange}
              label="Search"
            />
            <br />
            <br />
          </>
        );
      }
}
export default GlobalSearchAndPaginComp;
