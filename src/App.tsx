import Router from "./routing/Router";
import { Route } from "react-router";
import React from "react";
import StockList from "./routing/pages/StockList";
import { View } from "react-native";

export default () => (
  <View style={{ flex: 1 }}>
    <Router>
      <Route
        exact
        path="/"
        component={StockList} />
    </Router>
  </View>
)
