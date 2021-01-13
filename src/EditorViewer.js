import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
import Toolbar from "./containers/EditorToolbar";
import { customStyleFn } from "./containers/EditorToolbar/customStyles";
import { Button, Container, Segment } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import firebase from './components/Firebase';

const db = firebase.firestore();

const EditorWrapper = styled.div`
min-width: 350px;
height: fit-content;
margin-top: 2em;
margin-bottom: 1em;
`;

const EditorContainer = styled.div`
min-height: 15em;
border-radius: 0 0 3px 3px;
background-color: #fff;
padding: 10px;
font-size: 17px;
font-weight: 300;
box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

export default function EditorViewer(props) {
  let {uid} = useParams();
  const [eventDetails, setDetails] = React.useState();
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const updateEditorState = (editorState) => {
    setEditorState(editorState);
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const setEditorContent = (data) => {
    var contentState = convertFromRaw(data)
    setEditorState(EditorState.createWithContent(contentState));
  }

  React.useEffect(() => {
    db.collection("Events").doc(uid).get().then((doc) => {
      setEditorContent(doc.data().eventDetails);
    })
  }, [])

  return (
    <Container style={{ padding: '5em 0em' }}>
      <Segment raised padded>
        <EditorWrapper>
          <Toolbar editorState={editorState} updateEditorState={updateEditorState}/>

          <EditorContainer>
            <Editor editorState={editorState} readOnly={true}/>
          </EditorContainer>
        </EditorWrapper>
      </Segment>
    </Container>

  );
}
