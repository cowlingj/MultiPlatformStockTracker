/** @format */

import { View, TextInput, Button, ActivityIndicator } from "react-native"
import Dispatcher from "./dispatcher"
import React from "react"
import Subscribable from "../../archetecture/observer/Subscribable"

interface Props {
  dispatcher: Dispatcher
  stateUpdater: Subscribable<State>
}

export interface State {
  name: string
  quantity: string
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    props.stateUpdater.subscribe({
      onMessage(m) {
        setState(m)
      },
    })
    props.dispatcher.init()
  }

  public render() {
    if (!this.state) {
      return <ActivityIndicator />
    }
    return (
      <View>
        <TextInput
          onChangeText={text => this.props.dispatcher.nameChange(text)}
          value={this.state.name}
        />
        <TextInput
          keyboardType='numeric'
          onChangeText={text => this.props.dispatcher.quantChange(text)}
          value={`${this.state.quantity}`}
        />
        <Button
          onPress={() =>
            this.props.dispatcher.addItem(this.state.name, this.state.quantity)
          }
          title='Confirm'
        />
      </View>
    )
  }
}
