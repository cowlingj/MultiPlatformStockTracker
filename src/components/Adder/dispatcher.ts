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

  public addItem(name: string, quantity: number | null) {
    if (name === "" || quantity === null) {
      return
    }
 
    this.history.goBackTo("/")
    this.adderStateServive.itemAdded()
    this.stockListStateService.addItem({name, quantity})
  }

  public quantChange(qauntityString: string): void {
    if (qauntityString === "") {
      this.adderStateServive.clearQuantity().then((data) => {
        this.messenger.notify(data)
      })
      return
    }

    let parsedQuantity: number

    try {
      parsedQuantity = parseInt(qauntityString)
    } catch {
      this.adderStateServive.clearQuantity().then((data) => {
        this.messenger.notify(data)
      })
      return
    }

    this.adderStateServive.quantChanged({quantity: parsedQuantity})
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