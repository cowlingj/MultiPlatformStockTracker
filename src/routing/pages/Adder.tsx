import { RouteComponentProps, withRouter } from "react-router";
import Adder from "../../components/Adder";
import Dispatcher from "../../components/Adder/dispatcher";
import HistoryService from "../../services/HistoryService";
import Observable from "../../archetecture/observer/Observable";
import React from "react";
import { AdderStateService } from "../../services/AdderStateService";
import { StockListStateService } from "../../services/StockListStateService";

interface State {
  name: string
  quantity: number
}

interface Props extends RouteComponentProps {
  adderStateService: AdderStateService
  stockListStateService: StockListStateService
}

const AdderRenderer: React.SFC<Props> = (props: Props) => {
    const state = new Observable<State>()
    return (
  <Adder {...{
    dispatcher: new Dispatcher(state,
                               props.adderStateService,
                               props.stockListStateService,
                               new HistoryService(props.history)
                ),
    stateUpdater: state
  }} />
)}

export default withRouter(AdderRenderer)