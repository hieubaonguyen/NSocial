import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import {IActivity} from '../../../App/Models/Activity';
import ActivityList from '../../DashBoard/Activities/ActivityList';

interface IProps{
    activities: IActivity[]
}

const DashBoardActivities: React.FC<IProps> = ({activities}) => {
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList activities={activities}/>
                {/* <List>
                    {activities.map(activity => (
                        <List.Item key={activity.id}>
                            {activity.title}
                        </List.Item>
                    ))}
                </List> */}
            </GridColumn>
        </Grid>
    )
}

export default DashBoardActivities
