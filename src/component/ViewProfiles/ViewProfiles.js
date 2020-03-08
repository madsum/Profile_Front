import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurdApi from '../Utility/CurdApi';
import { Table, TableCell } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export class ViewProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilesState: "Loading...",
        }
    }

    async componentDidMount() {
        try {
            let profiles = await CurdApi.getAllProfiles();
            this.setState({ profilesState: profiles });
        } catch (error) {
            console.log(error);
        }
    }

    showUrl(url){
        if(url){
            return <a href= {url} 
            target="_blank" rel="noopener noreferrer" >Profile Photo</a>;
        }else{
            return "No photo"     
        }

    }

    render() { 

        return (
            <div>
                {
                    Array.isArray(this.state.profilesState) ?
                        <Table style={{ width: "auto", tableLayout: "auto" }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{ Width: '50px' }}>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Display Name</Table.HeaderCell>
                                    <Table.HeaderCell>Birth Date</Table.HeaderCell>
                                    <Table.HeaderCell>Gender</Table.HeaderCell>
                                    <Table.HeaderCell>Ethnicity</Table.HeaderCell>
                                    <Table.HeaderCell>Religion</Table.HeaderCell>
                                    <Table.HeaderCell>Height</Table.HeaderCell>
                                    <Table.HeaderCell>About Me</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Photo</Table.HeaderCell>
                                    <Table.HeaderCell>Edit profile</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.profilesState.map((profile) => {
                                    return (
                                        <Table.Row key={profile.id}>
                                            <Table.Cell>{profile.id}</Table.Cell>
                                            <Table.Cell>{profile.display_name}</Table.Cell>
                                            <Table.Cell>{profile.birth_date}</Table.Cell>
                                            <Table.Cell>{profile.gender}</Table.Cell>
                                            <Table.Cell>{profile.ethnicity}</Table.Cell>
                                            <Table.Cell>{profile.religion}</Table.Cell>
                                            <Table.Cell>{profile.height}</Table.Cell>
                                            <Table.Cell>{profile.about_me}</Table.Cell>
                                            <Table.Cell>{profile.city_location}</Table.Cell>
                                            <TableCell>
                                                {this.showUrl(profile.fileDownloadUri)}
                                            </TableCell>
                                            
                                            <Table.Cell><Link to={{
                                                pathname: "/EditProfile",
                                                state: {
                                                    title: "Edit Profile",
                                                    profile: profile
                                                }
                                            }} >Edit Profile</Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                                }
                            </Table.Body>
                        </Table>
                        : <h1>{this.state.profilesState}</h1>
                }
            </div>
        )
    }
}
export default ViewProfiles
