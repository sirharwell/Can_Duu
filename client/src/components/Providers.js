import React from 'react';
import {
  Item,
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class Providers extends React.Component {
  state = {
    selected: false
  }

  addToProviders = () => {
    this.props.addToProviders(this.props.user_id)
    this.setState({ selected: true })
  }

  render() {
    return (
      <Item style={{marginTop: '5px', marginBottom: '5px'}}>
        <Item.Image size="small" src={this.props.logo} />

        <Item.Content>
          <Item.Header as='a'>{this.props.name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{this.props.phone_number}</span>
          </Item.Meta>
          <Item.Description>{this.props.bio}</Item.Description>
          <Item.Extra>
            <Button
              primary
              floated='right'
              style={{marginRight: '10px'}}
              onClick={this.addToProviders}
              disabled={this.state.selected}
            >
              Add Provider
              <Icon name='right chevron' />
            </Button>
            <Label>Insured: {this.props.insurace ? 'Yes' : 'No'}</Label>
            <Label>BBB Approved: {this.props.bbb_approved ? 'Yes' : 'No'}</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
      )
    }
  }

  export default connect()(Providers);
