import React, { useContext } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../App/stores/ActivityStore';

const NavBar = () => {
    const activityStore = useContext(ActivityStore);
    const {openCreateForm} = activityStore;
    return (
         <Menu fixed="top" inverted>
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button onClick={() => openCreateForm()} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
