import Router from "./routing/Router";
import { Route } from "react-router";
import React from "react";
import StockList from "./routing/pages/StockList";
import PropsInjector from "./util/PropsInjector";
import Adder from "./routing/pages/Adder";
import { StockListStateService } from "./services/StockListStateService";
import { AdderStateService } from "./services/AdderStateService";
import { Platform, View } from "react-native";

const stockListStateService = new StockListStateService({items: [], isHighlightedDefault: Platform.OS == "android" || Platform.OS === "ios"})
const adderStateService = new AdderStateService({name: "", quantity: null})

const App: React.SFC<{}> = () => (
    <View style={{height: "100%", width: "100%"}}><Router>
      <Route
        exact
        path="/"
        component={PropsInjector(StockList, {stockListStateService})} />
      <Route
        path="/add"
        component={PropsInjector(Adder, {
          adderStateService,
          stockListStateService
        })
      } />
    </Router></View>
)

export default App