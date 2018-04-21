import React from "react";
import {
  Item,
  Button,
} from 'semantic-ui-react';


const ListView = ({ jobs, viewjob }) => (
  <Item.Group>
    {jobs.map((j,i) =>
      <Item key={i}>
      <Item.Image size='small' src={j.photos} style={{width: 150, height: 150}}/>

        <Item.Content>
          <Item.Header>{j.name}</Item.Header>

          <Item.Meta>
            {j.category}
          </Item.Meta>

          <Item.Meta>
            <span className='status'><Button size='small' onClick={() => viewjob(j.id)}>View Job</Button></span>
          </Item.Meta>

          <Item.Description>{j.description}</Item.Description>
          <br />
        </Item.Content>
      </Item>
   )}
  </Item.Group>
)

export default ListView
