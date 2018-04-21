import React from "react";
import {
  Card,
  Segment,
  Button,
  Image,
} from 'semantic-ui-react';

const descriptionStyle = {
  display: 'block',
  height: '60px',
  textAlign: 'left',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const nameStyle = {
  display: 'block',
  height: '55px',
  textAlign: 'center',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const CardView = ({ jobs, viewjob }) => (
  <Card.Group itemsPerRow={4}>
    {jobs.map( (j, i) =>
      <Card key={i}>
        <Segment basic textAlign='center' >
          <span style={nameStyle}><b>{j.name}</b></span>
          <Image src={j.photos} centered size='large' style={{width: 214, height: 214}}/>
          <br/>
          <span style={descriptionStyle}>{j.description}</span>
          <br/>
          <Button onClick={() => viewjob(j.id)}>View Job</Button>
        </Segment>
      </Card>
    )}
  </Card.Group>
)

export default CardView
