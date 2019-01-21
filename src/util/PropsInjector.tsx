/** @format */

import React from "react"
import { Omit } from "./types/Omit"

export default function PropsInjector<T, NotT extends T>(
  Wrapped: React.ComponentType<NotT>,
  t: T
): React.ComponentClass<Omit<NotT, keyof T>> {
  return class extends React.Component<Omit<NotT, keyof T>> {
    constructor(props: Omit<NotT, keyof T>) {
      super(props)
    }
    public render() {
      const props = Object.assign({}, this.props, t) as NotT
      return <Wrapped {...props} />
    }
  }
}
