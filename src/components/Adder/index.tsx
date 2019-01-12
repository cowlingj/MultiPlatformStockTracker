/** @format */

import { Button, TextInput } from "react-native"
import React from "react"
import Dispatcher from "./Dispatcher"
import DispatcherFactory from "./Dispatcher/DispatcherFactory"
import { AddState } from "./Store"
import { AddItem, Update, Init } from "./Messages"
import { Store } from "../../archetecture/Store"
import Container from "../base/Container";

export interface Props {
  dispatcherFactory: DispatcherFactory
  add: Store<AddItem, AddState>
  update: Store<Update, AddState>
  init: Store<Init, AddState>
}

export default class extends React.Component<Props, AddState> {
  private dispatcher: Dispatcher

  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    const initialState = (state: AddState) => (this.state = state)

    props.dispatcherFactory.subcribeAdd(props.add.apply(setState))
    props.dispatcherFactory.subscribeUpdate(props.update.apply(setState))
    props.dispatcherFactory.subscribeInit(props.init.apply(initialState))

    this.dispatcher = props.dispatcherFactory.create()
  }

  public render() {
    return (
      <Container style={{padding: 20, zIndex: 1}}>
        <TextInput
          autoCapitalize='sentences'
          autoCorrect={true}
          onSubmitEditing={() => this.dispatcher.add(this.state.name)}
          onChangeText={newText => this.dispatcher.update(newText)}
          value={this.state.name}
          style={{
            backgroundColor: "whitesmoke",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 5,
            padding: 1,
            marginBottom: "1%"
          }}
          placeholder="item name"
          placeholderTextColor="grey"
        />
        <Button
          onPress={() => this.dispatcher.add(this.state.name)}
          title='ADD'
        />
      </Container>
    )
  }
}
