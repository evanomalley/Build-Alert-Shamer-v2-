import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import {connect } from 'react-redux';

@connect((store) => {
	return {
		sounds: store.settings.sounds,
		timer: store.settings.timer
	};
})

class Settings extends React.Component {

	constructor(props) {
		super(props);
	    this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	playAudio (sound) {
		var player = new Audio("/media/"+sound);
		player.play();
	}

	onChangeHandler (event){
		var index = parseInt(event.target.id);
		var sounds = this.props.sounds;
		sounds[index].enabled = event.target.checked;
		this.forceUpdate();
	}

	onSaveClick (){
		
	}

	render() {
		var count = -1,
			me = this;
		const {sounds, timer} = this.props;

		const checkStyle = {
			width: 24
		};
		
		const mappedSounds = sounds.map( sound => 
						<TableRow key={count+=1}>
					      <TableRowColumn>
					      	<Checkbox id={count} inputStyle={checkStyle} checked={sound.enabled} onCheck={me.onChangeHandler}/>
					      </TableRowColumn>
					      <TableRowColumn>{sound.sound}</TableRowColumn>
					      <TableRowColumn><RaisedButton label="Play" primary={true} onClick={me.playAudio.bind(this, sound.sound)}/></TableRowColumn>
					    </TableRow>)

		return (
				 <Card>
				    <CardTitle title="Settings"/>
				    <CardText>
				      <Table>
					    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					      <TableRow>
					        <TableHeaderColumn>Enabled</TableHeaderColumn>
					        <TableHeaderColumn>Sound</TableHeaderColumn>
					        <TableHeaderColumn>Preview</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody displayRowCheckbox={false}>
					    	{mappedSounds}
					    </TableBody>
					  </Table>
				    </CardText>
				    <CardActions>
				      <FlatButton label="Save" onClick={me.onSaveClick}/>
				    </CardActions>
				  </Card>
			);
	}		
}

export default Settings;