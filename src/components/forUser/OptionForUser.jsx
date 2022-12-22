import React from "react";
import styled from "styled-components";
// import "normalize.css";
// import "./demo-styles.css";
import Select from "react-dropdown-select";
// import  OptionsToSeletForUser  from "./OptionsToSelectForUser";
import PublisherService from "../../services/PublisherService";

//U OPTIONS TO Select FOR USER -POVEZI DA PODATKE PREUZME IZ BAZE
 class OptionForUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        allPubs:[],
    }
    


}

componentDidMount(){
  PublisherService.getPublishers().then((res)=>{
      const allPubs =res.data
      this.setState({ allPubs });
      console.log("Ovo je allPubs iz OptionForUser" + JSON.stringify(this.state.allPubs))
  // const allPubs =res.data
  // this.setState({ allPubs });
});
}


  options = () =>

  this.state.allPubs.map(user => ({
      label: user.name,
      value: user.address
    }));

  customOptionRenderer = ({ item, props, state, methods }) => (
    <StyledOption>
      Search:{" "}
      <a href={`https://www.google.com/search?q=${item.label}`} target="_blank" rel="noreferrer">
        {" "}
        {item.label}
      </a>{" "}
      <span
        onClick={() => methods.removeItem(null, item)}
        title="please don't 🥺"
      >
        &times;
      </span>
    </StyledOption>
  );

  render() {
    return (
      <div>
   
        <h4>Publishers</h4>

        <Select
          placeholder="Select"
          multi
          optionRenderer={this.customOptionRenderer}
          onChange={() => undefined}
          values={[]}
          options={this.options()}
        />
      </div>
    );
  }
}

const StyledOption = styled.span`
  padding: 3px 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  border: 1px solid #555;
  transition: all 1s ease-in;

  span {
    display: none;
    transition: all 1s ease-in;
  }

  a {
    margin: 0 5px;
  }

  :hover {
    background: #f2f2f2;

    span {
      display: inline;
      margin: 0 0 0 5px;
      color: red;
    }
  }
`;

export default OptionForUser