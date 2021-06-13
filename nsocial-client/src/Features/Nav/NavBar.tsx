import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';


const NavBar = () => {
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
                    <Button positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
