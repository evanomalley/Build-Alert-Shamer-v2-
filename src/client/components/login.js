/**
 * Created by evan on 7/8/2017.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {

    render() {
        return (
            <Card>
                <CardTitle title="Build Alert Login"/>
                <CardText>
                    <TextField
                        hintText="Email"
                    /><br />
                    <br />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                    /><br />
                </CardText>
                <CardActions>
                    <FlatButton label="Login" />
                    <FlatButton label="Logout" />
                </CardActions>
            </Card>
        );
    }
}

export default Login;