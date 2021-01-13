import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Toolbar from "./containers/EditorToolbar";
import { Button, Container, Segment } from 'semantic-ui-react';
import { customStyleFn } from "./containers/EditorToolbar/customStyles";

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

export default function MobileEditor(props) {
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

  const onDoneClick = () => {
    window.webKit.messageHandlers.setEventDetails.postMessage(editorState);
  }

  return (
    <Container style={{ padding: '5em 0em' }}>
      <Segment padded raised>
        <EditorWrapper>
          <Toolbar editorState={editorState} updateEditorState={updateEditorState}/>

          <EditorContainer>
            <Editor placeholder='Describe your event' editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} customStyleFn={customStyleFn}/>
          </EditorContainer>
        </EditorWrapper>
        <Button type='button' onClick={onDoneClick}>Done</Button>
      </Segment>
    </Container>
  );
}
