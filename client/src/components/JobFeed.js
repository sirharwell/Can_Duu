import React, { Component } from 'react';
import {
  Button,
  Grid,
  Menu,
  Input,
  Icon,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getJobs,
  categoryFilter,
  clearFilters,
  urgencyToggle,
  searchTitleDescription,
  setCurrentJob,
} from '../actions/jobs';
import CardView from './CardView';
import ListView from './ListView';
import { deleteNav } from '../actions/navigate';



const options = [

  { key: 'carpentry', text: 'Carpentry', value: 'carpentry' },
  { key: 'electrical', text: 'Electrical', value: 'electrical' },
  { key: 'lawncare', text: 'Lawn Care', value: 'lawn care' },
  { key: 'mechanic', text: 'Mechanic', value: 'mechanic' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
]

const pageHeader = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '45px',
  fontWeight: '800',
  letterSpacing: '1px',
  lineHeight: 1,
  textShadow: '#EDEDED 3px 2px 0',
};

const filterBox = {
  display: 'flex',
  position: 'fixed',
  width: '21vw',
  marginTop: 180,
  marginLeft: 15,
  borderStyle: 'groove',
  overflowY: 'scroll',
};

const jobContent = {
  maxHeight: '500px',
  scroller: '1vh',
  overflowY: 'auto',
};

class JobFeed extends Component {

  state = {
    num: 0,
    viewMode: false,
    category: '',
    height: 0,
    search: '',
    visible: this.props.jobs,
    urgency: false,
    toggle: false,
  }
  loadJob = (id) => {
    this.props.dispatch(setCurrentJob(id, this.navigate))
  }

  navigate = (id) => {
    this.props.history.push(`/jobs/${id}`)
  }

  handleChange = async (e) => {
    let {value} = e.target;
    await this.setState({search: value})
    this.jobFilter();
  }

  jobFilter = () => {
    this.props.dispatch(searchTitleDescription(this.state.search))
  }

  toggleUrgency = async () => {
    await this.setState( state => {
      return { urgency: !state.urgency }
    })
    this.props.dispatch(urgencyToggle(this.state.urgency))
  }

  clearFilters = () => {
    this.props.dispatch(clearFilters())
    this.setState({ search: '', category: ''})
  }


  componentDidMount = () => {
    const { dispatch, location } = this.props;
    dispatch(getJobs(1))
    dispatch(deleteNav(location.pathname))
  }

  loadMore = () => {
    const { dispatch, jobs: { page }} = this.props;
    dispatch(getJobs(page + 1))
  }

  categoryFilter = (d) => {
    const { dispatch } = this.props
    this.setState({ category: d.value})
    dispatch(categoryFilter(d.value))
  }

  clearFilters = () => {
    this.setState({ category: '', search: '', urgency: '', toggle: ''})
    this.props.dispatch(clearFilters())
  }


  render() {
    const { filteredJobs } = this.props.jobs;
    if (filteredJobs) {
      return (
        <div style={{marginLeft: "15px", marginRight: "10px"}}>
          <Grid>
            <Grid.Row height={1}>
              <Grid.Column width={16} style={{display: "flex", justifyContent: "center"}}>
                <h1 style={pageHeader}>Available Jobs</h1>
              </Grid.Column>

              <Grid.Column width={16} style={{display: "flex", justifyContent: "flex-end", marginRight: 15}} >
                <Icon
                onClick={() => this.setState({viewMode: false })}
                size='big'
                link
                name='grid layout'
                style={{justifyContent: "flex-end"}}
                />
                <Icon onClick={() => this.setState({viewMode: true })}
                size='big' link name='list layout' />
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu fixed="top" style={filterBox} vertical>
                  <Menu.Item>
                   <h3>Job Filter</h3>
                  </Menu.Item>
                  <Menu.Item>
                    <u><b>Job Categories</b></u>
                    {options.map( (o, i) => {
                      return (
                        <div key={i}>
                        <br />
                        <Checkbox
                          onChange={(e,d) => this.categoryFilter(d)}
                          label={o.text}
                          value={o.value}
                          checked={this.state.category === o.value}
                          />
                        </div>
                      )
                    })}
                  </Menu.Item>
                  <Menu.Item>
                    <u><b>Urgent Job</b></u> <p></p><Checkbox slider
                      onChange={this.toggleUrgency}
                      checked={this.state.urgency}
                      toggle={this.state.urgency}
                      />
                  </Menu.Item>
                  <Menu.Item>
                    <Input
                      value={this.state.search}
                      onChange={this.handleChange}
                      icon={{ name: 'search', circular: true }}
                      placeholder="Search jobs..."
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <Button onClick={this.clearFilters}>
                      Clear Filters
                    </Button>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
              <Grid.Column width={12}>
                <Menu position="fixed" style={jobContent}>
                { this.state.viewMode ?
                  <ListView jobs={filteredJobs} viewjob={this.loadJob}/>
                  :
                  <CardView jobs={filteredJobs} viewjob={this.loadJob}/>
                }
                </Menu>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{display: "flex", justifyContent: "center"}}>
              <Button onClick={this.loadMore}>Load More Jobs</Button>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    category: state.category
  }
}

export default withRouter(connect(mapStateToProps)(JobFeed));
