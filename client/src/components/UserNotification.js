import React from 'react';
import {
  Container,
  Icon,
  Divider,
  Button,
  Segment,
  Grid,
  Header,
  Card,
  Form,
 } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addBid} from '../actions/newBid';
import { acceptBidRequest, rejectBidRequest, viewed, bidNotification } from '../actions/userNotification';
import { Link } from 'react-router-dom';




const pageHeader = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '45px',
  fontWeight: '800',
  letterSpacing: '1px',
  lineHeight: 1,
  textShadow: '#EDEDED 3px 2px 0',
};

class UserNotification extends React.Component {
  state = {
    showDetails: false,
    showingIndex: null,
    showingWorkIndex: null,
    price: '',
    start_date: '',
    end_date: '',
    length: '',
    milestones: [],
    comments: '',
    addingMilestone: false,
    bidForm: false,
    title: '',
    bytime: '',
    }

    submitBid = () => {
      const { workNotifications, provider, dispatch } = this.props;
      dispatch(
        addBid( provider.id, ),
        bidNotification(provider.id),
         this.toggleBid())
    }


    milestoneSubmit = () => {
      let milestone = {title: this.state.title, bytime: this.state.bytime}
      this.state.milestones.push(milestone)
      this.setState({title: '', bytime: '', addingMilestone: false})
    }

    toggleMilestone = () => {
      this.setState( state => {
        return { addingMilestone: !state.addingMilestone }
      })
    }

    toggleBid = (p, id) => {
      this.setState( state => {
        return { bidForm: !state.bidForm, showingWorkIndex: p }
      });
      if (id) {
        this.props.dispatch(viewed(id))
      }
    }

    toggleDetails = (i, id) => {
      let { showDetails } = this.state;
      this.setState( state => {
        return { showDetails: !showDetails, showingIndex: i }
      });
      if (id) {
        this.props.dispatch(viewed(id))
      }
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    }

   requestApprove = (job_id, provider_id) => {
     const { dispatch } = this.props;
     dispatch(acceptBidRequest(provider_id, job_id))
   }

   requestReject = (job_id, provider_id) => {
     const { dispatch } = this.props;
     dispatch(rejectBidRequest(provider_id, job_id))
  }

   userOnly = () => {
     const { notifications } = this.props
     const { showDetails, showingIndex } =this.state
     return(
     <Container>
       <h1 style={pageHeader}>My Notifications</h1>
             <div>
             {notifications.map((n,i)=>{
               let read = n.viewed ? "#EDEDED" : "#fff"
               let data = JSON.parse(n.data)
               return(
                 <Segment raised key={i} style={{backgroundColor: read}}>
                     <p>{n.message}</p>
                     {showDetails && showingIndex === i ?
                       <div syle={{paddingLeft: '300px'}}>
                         <p>---Email: {data.email}</p>
                         <p>---Phone: {data.phone_number}</p>
                         <p>
                         {data.insured ? <div>---Insured</div> : <div>---Not Insured</div>}
                         </p>
                         <p>
                         {data.bbb_approved ? <div>---BBB Registered</div> : <div>---Not BBB Registered</div>}
                         </p>
                         <p>---Location: {data.service_area}</p>
                           <Button style={{ cursor: "pointer" }} primary onClick={() => this.requestApprove(data.job_id, n.from)}>Approve Request</Button>
                           <Button style={{ cursor: "pointer" }} onClick={() => this.requestReject(data.job_id, n.from)}>Reject Request</Button>
                           <Divider hidden/>
                         <Icon style={{ cursor: "pointer" }} onClick={()=>this.toggleDetails(i)} className="chevron up" size='small'/>
                       </div>
                       :
                       <div>
                         <Icon style={{ cursor: "pointer" }} onClick={()=>this.toggleDetails(i, n.id)} className="chevron down" size='small'/>
                       </div>
                     }
                 </Segment>
               )
           })}
         </div>
     </Container>
   )}

   workerNotifications = () => {
     const { notifications, workNotifications} = this.props
     const { showDetails, showingIndex, showingWorkIndex, bidForm } =this.state
     return(
     <Segment basic>
       <Segment basic textAlign='center'>
         <Header as='h1' style={styles.header}>Notifications</Header>
       </Segment>
       <Grid>
         <Grid.Column computer={8}>
           <Segment>
             <Header
               as='h1'
               textAlign='center'
               style={styles.header}>
                 Personal Notifications
             </Header>
             <Divider />
               <div>
              {notifications.map((n,i)=>{
                let read = n.viewed ? "#EDEDED" : "#fff"
                let data = JSON.parse(n.data)
                return(
                  <Segment key={i} style={{backgroundColor: read}}>
                      <p>{n.message}</p>
                      {showDetails && showingIndex === i ?
                        <div syle={{paddingLeft: '300px'}}>
                          <p>---Email: {data.email}</p>
                          <p>---Phone: {data.phone_number}</p>
                          <p>
                          {data.insured ? <div>---Insured</div> : <div>---Not Insured</div>}
                          </p>
                          <p>
                          {data.bbb_approved ? <div>---BBB Registered</div> : <div>---Not BBB Registered</div>}
                          </p>
                          <p>---Location: {data.service_area}</p>
                            <Button style={{ cursor: "pointer" }} primary onClick={() => this.requestApprove(data.job_id, n.from)}>Accept Request</Button>
                            <Button style={{ cursor: "pointer" }} onClick={() => this.requestReject(data.job_id, n.from)}>Reject Request</Button>
                            <Divider hidden/>
                          <Icon style={{ cursor: "pointer" }} onClick={()=>this.toggleDetails(i)} className="chevron up" size='small'/>
                        </div>
                        :
                        <div>
                          <Icon style={{ cursor: "pointer" }} onClick={()=>this.toggleDetails(i, n.id)} className="chevron down" size='small'/>
                        </div>
                      }
                  </Segment>
                )
            })}
          </div>
           </Segment>
         </Grid.Column>
         <Grid.Column computer={8}>
           <Segment>
             <Header
               as='h1'
               textAlign='center'
               style={styles.header}>
                 Work Notifications
             </Header>
             <Divider />
               <div>
                 {workNotifications.map((w,p)=>{
                   let read = w.viewed ? "#EDEDED" : "#fff"
                   let accepted = w.message.split(" ").pop() === "accepted"
                 return(
                   <Segment key={p} style={{backgroundColor: read}}>
                       <p>{w.message}</p>
                       {accepted ?
                         <div>
                         { bidForm && showingWorkIndex === p ?
                           <div>{this.newBid()}
                           <Button fluid secondary onClick={() => this.toggleBid(p, w.id)}>Cancel</Button>
                           </div>
                         :
                         <Button onClick={() => this.toggleBid(p)}>Make Bid </Button>
                        }
                      </div>
                       :
                       <p>Sorry</p>
                       }
                   </Segment>
                 )})}
               </div>
           </Segment>
         </Grid.Column>
       </Grid>
     </Segment>
   )}

   newBid = () => {
     const{
             price,
             start_date,
             end_date,
             length,
             comments,
             addingMilestone,
             title,
             bytime,
  } =this.state
       return (
         <Container textAlign="center">
           <br />
           <div>
             <Form onSubmit={this.submitBid}>
               <h1> Bid </h1>
               <Card centered >
                 <Form.Input
                   name="price"
                   value={price}
                   onChange={this.handleChange}
                   label="Your Best Price"
                 />
                 <Form.Input
                   name="start_date"
                   value={start_date}
                   onChange={this.handleChange}
                   label="Start Date"
                 />
                 <Form.Input
                   name="end_date"
                   value={end_date}
                   onChange={this.handleChange}
                   label="Aprox End Date"
                 />
                 <Form.Input
                   name="length"
                   value={length}
                   onChange={this.handleChange}
                   label="Aprox how many hours?"
                 />
                 <Form.Input
                   name="comments"
                   value={comments}
                   onChange={this.handleChange}
                   label="Additional Comments"
                 />
                 {this.state.milestones.length > 0 &&
                   <div textAlign="center">
                     <h5>Milestones</h5>
                     {this.state.milestones.map(m=>
                         <Segment raised compact>
                           <p> Title: {m.title} </p>
                           <p> By When: {m.bytime}</p>
                         </Segment>
                   )}
                   </div>
                   }
                 </Card>
               {addingMilestone ?
                 <Card centered>
                   <Form onSubmit={this.milestoneSubmit} >
                     <Form.Input
                       name="title"
                       value={title}
                       onChange={this.handleChange}
                       label="Milestone"
                       />
                     <Form.Input
                       name="bytime"
                       value={bytime}
                       onChange={this.handleChange}
                       label="By When"
                       />
                   <Button type="submit"> Submit </Button>
                   <Button onClick={this.toggleMilestone}> Cancel </Button>
                   </Form>
                 </Card>
                 :
                 <div><br/>
                 <Button onClick={this.toggleMilestone}> Add milestone</Button>
                 </div>
               }
           <br />
           <Button.Group fluid>
               <Button primary type='submit'>Place Bid</Button>
           </Button.Group>
         </Form>
       </div>
         </Container>
     )
   }



  render() {
    const { notifications, user } = this.props
    const { showDetails, showingIndex, showingWorkIndex, price,
            start_date,
            end_date,
            length,
            comments,
            addingMilestone,
            title,
            bytime,
 } =this.state
        if (user.worker_profile === true) {
          return(
            this.workerNotifications()
      )}
      else {
          return(
            this.userOnly()
      )}
}}
const styles = {
  centered: {
    margin: '0 auto',
  },
  header: {
    color: 'black'
  }
}

const mapStateToProps = (state) => {
  return { bid: state.bids, user: state.user, notifications: state.userNotification, workNotifications: state.providerNotification, provider: state.provider }
}
export default connect(mapStateToProps)(UserNotification);
