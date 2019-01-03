/** @format */

import { View, Text } from "react-native"
import * as React from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import Hoverable from "../../Hoverable"

export interface Props {
  id: number
  name: string
  quantity: number
  inc: (id: number, quant: number) => void
  dec: (id: number, quant: number) => void
  del: (id: number) => void
  highlight: (id: number) => void
  unHighlight: (id: number) => void
  view: () => void
  isHighlighted: boolean
}

export default (props: Props): React.ReactElement<Props> => {
  return (
    <Hoverable
      onMouseEnter={() => props.highlight(props.id)}
      onMouseLeave={() => props.unHighlight(props.id)}>
      <View
        style={{
          backgroundColor: "ghostwhite",
          borderRadius: 5,
          borderColor: "grey",
          borderWidth: 1,
          padding: 20,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
        }}>
        <View
          style={{
            display: "flex",
            alignSelf: "stretch",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}>
          <Text style={{ textAlign: "left", flex: 3 }}>{props.name}</Text>
          <Text style={{ textAlign: "right", flex: 1 }}>{props.quantity}</Text>
        </View>
        {(() => {
          if (!props.isHighlighted) {
            return null
          } else {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}>
                <Icon
                  name='external-link'
                  size={20}
                  style={{ marginLeft: "2%" }}
                  onPress={props.view}
                />
                <Icon
                  name='trash'
                  size={20}
                  style={{ marginLeft: "2%" }}
                  onPress={() => props.del(props.id)}
                />
                <Icon
                  name='chevron-up'
                  size={20}
                  style={{ marginLeft: "2%" }}
                  onPress={() => props.inc(props.id, props.quantity)}
                />
                <Icon
                  name='chevron-down'
                  size={20}
                  style={{ marginLeft: "2%" }}
                  onPress={() => props.dec(props.id, props.quantity)}
                />
                <View style={{ width: "20%", flexShrink: 10 }} />
              </View>
            )
          }
        })()}
      </View>
    </Hoverable>
  )
}
