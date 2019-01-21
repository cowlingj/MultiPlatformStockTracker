import Observable from "../../archetecture/observer/Observable";
import HistoryService from "../../services/HistoryService";
import { State } from ".";
import { AdderStateService } from "../../services/AdderStateService";
import { StockListStateService } from "../../services/StockListStateService";

export default class Dispatcher {

  private messenger: Observable<State>;
  private history: HistoryService;
  private adderStateServive: AdderStateService;
  private stockListStateService: StockListStateService;

  private static numberRegex = /^((\+|-)?\d)?\d*$/

  constructor(messenger: Observable<State>,
              adderState: AdderStateService,
              stockListStateService: StockListStateService,
              history: HistoryService) {

    this.messenger = messenger
    this.adderStateServive = adderState
    this.stockListStateService = stockListStateService
    this.history = history
  }

  public init() {
    this.adderStateServive.get().then((data)=>{
      this.messenger.notify(data)
    }).catch()
    
  }

  public addItem(name: string, quantity: string) {
    if (name === "" || quantity === "" || !Dispatcher.numberRegex.test(quantity)) {
      return
    }
 
    this.history.goBackTo("/")
    this.adderStateServive.itemAdded()
    this.stockListStateService.addItem({name, quantity: parseInt(quantity)})
  }

  public quantChange(qauntityString: string): void {

    if (!Dispatcher.numberRegex.test(qauntityString)) {
      return
    }

    if (qauntityString === "") {
      this.adderStateServive.clearQuantity().then((data) => {
        this.messenger.notify(data)
      })
      return
    }

    this.adderStateServive.quantChanged({quantity: parseInt(qauntityString)})
    .then((data) => {
      return this.messenger.notify(data)
    })
  }
  
  public nameChange(name: string): void {
    this.adderStateServive.nameChanged({name})
    .then((data) =>{
      this.messenger.notify(data)
    })
  }
}